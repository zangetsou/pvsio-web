/**
 * Binds user interface elements to events
 * @author Patrick Oladimeji
 * @date 11/15/13 16:29:55 PM
 */
/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global define, d3, require, $, brackets, window, document */
define(function (require, exports, module) {
	"use strict";
	var WSManager = require("websockets/pvs/WSManager"),
		Logger	= require("util/Logger"),
        Recorder = require("util/ActionRecorder"),
        ScriptItemView = require("pvsioweb/forms/ScriptItemView"),
        WidgetManager = require("pvsioweb/WidgetManager").getWidgetManager(),
        SaveProjectChanges = require("project/forms/SaveProjectChanges"),
        Prompt  = require("pvsioweb/forms/displayPrompt");
	
	/**
	 * Switches the prototoyping layer to the builder layer
     * @private
	 */
    function switchToBuilderView() {
        d3.select(".image-map-layer").style("opacity", 1).style("z-index", 190);
        d3.selectAll("#controlsContainer button, div.display").classed("selected", false);
        d3.select("#btnBuilderView").classed('selected', true);
        d3.selectAll("div.display,#controlsContainer button").classed("builder", true);
        d3.selectAll("div.display,#controlsContainer button").classed("simulator", false);
        d3.selectAll("#record").style("display", "none");
    }
	/** Switches the prototyping layer to the simulator/testing layer 
        @private
    */
    function switchToSimulatorView() {
        d3.select(".image-map-layer").style("opacity", 0.1).style("z-index", -2);
        d3.selectAll("#controlsContainer button, div.display").classed("selected", false);
        d3.select("#btnSimulatorView").classed('selected', true);
        d3.selectAll("div.display,#controlsContainer button").classed("simulator", true);
        d3.selectAll("div.display,#controlsContainer button").classed("builder", false);
        d3.selectAll("#record").style("display", "block");
    }
    
    function pvsProcessReady(err, e) {
        var pvsioStatus = d3.select("#lblPVSioStatus");
        pvsioStatus.select("span").remove();
        if (!err) {
            var msg = ("pvsio process ready");
            Logger.log(msg);
            pvsioStatus.append("span").attr("class", "glyphicon glyphicon-ok");
        } else {
            console.log(err);
            pvsioStatus.append("span").attr("class", "glyphicon glyphicon-warning-sign");
        }
    }

	function bindListeners(projectManager) {
        var actions, recStartState, recStartTime, scriptName;
        
		d3.select("#header #txtProjectName").property("value", "");
	
		/**
		 * Add event listener for toggling the prototyping layer and the interaction layer
		 */
		d3.select("#btnBuilderView").classed("selected", true).on("click", function () {
			switchToBuilderView();
		});
	
		d3.select("#btnSimulatorView").on("click", function () {
			switchToSimulatorView();
		});
	
        d3.select("#record").on("click", function () {
            var label = d3.select(this).html().trim(), script;
            if (label === "Record") {
                d3.select(this).html(" Stop Recording").classed("recording", true);
                Recorder.startRecording();
                recStartState = WSManager.getWebSocket().lastState();
                recStartTime = new Date().getTime();
                scriptName = "Script_" + recStartTime;
            } else {
                d3.select(this).html(" Record").classed("recording", false);
                actions = Recorder.stopRecording();
                //do something with actions
                console.log(actions);
                //ask user to give name to script
                Prompt.create({header: "Would you like to save this script?",
                               message: "Please enter a name for your script",
                               buttons: ["Delete", "Save"]})
                    .on("save", function (e, view) {
                        scriptName = e.data.prompt.trim() || scriptName;
                        view.remove();
                        script = {name: scriptName, actions: actions, startState: recStartState};
                        //add the script to the project
                        projectManager.project().addScript(script);
                    }).on("delete", function (e, view) {
                        view.remove();
                    });
            }
        });
        
		d3.select("#saveProject").on("click", function () {
			projectManager.saveProject();
		});
	
		d3.select("#openProject").on("click", function () {
            var pvsioStatus = d3.select("#lblPVSioStatus");
            pvsioStatus.select("span").remove();
            
            function _doOpenProject() {
                projectManager.openProject(function (project) {
                    var ws = WSManager.getWebSocket();
                    ws.lastState("init(0)");
                    if (project.mainPVSFile()) {
                        ws.startPVSProcess({fileName: project.mainPVSFile().name(),
                                            projectName: project.name()}, pvsProcessReady);
                    } else {
                        //close pvsio process for previous project
                        ws.closePVSProcess(function (err, res) {
                            pvsioStatus.append("span").attr("class", "glyphicon glyphicon-warning-sign");
                        });
                    }
                    switchToBuilderView();
                });
            }
            
            var currentProject = projectManager.project();
            if (currentProject && currentProject._dirty()) {
                //show save project dialog for the current project
                SaveProjectChanges.create(currentProject)
                    .on("yes", function (e, view) {
                        view.remove();
                        projectManager.saveProject(currentProject, _doOpenProject);
                    }).on("no", function (e, view) {
                        view.remove();
                        _doOpenProject();
                    });
            } else {
                _doOpenProject();
            }
		});
	
		d3.select("#newProject").on("click", function () {
			projectManager.newProject();
		});
		//handle typecheck event
		//this function should be edited to only act on the selected file when multiple files are in use
		d3.select("#btnTypeCheck").on("click", function () {
			var pvsFile = projectManager.getSelectedFile(), project = projectManager.project();
			if (pvsFile) {
				var btn = d3.select(this).html("Typechecking ...").attr("disabled", true);
				var ws = WSManager.getWebSocket();
				ws.send({type: "typeCheck", filePath: project.path() + "/" + pvsFile.name()}, function (err, res) {
					btn.html("Typecheck").attr("disabled", null);
					if (err) {
						alert(JSON.stringify(err));
					} else {
						console.log(res);
						///TODO: show nicer alert and visualisation for type checking info
						alert(res.stdout);
					}
				});
			}
		});
	
		d3.select("#btnSetMainFile").on("click", function () {
			var pvsFile = projectManager.getSelectedFile(), project = projectManager.project();
			if (pvsFile) {
				var ws = WSManager.getWebSocket();
				ws.send({type: "setMainFile", projectName: project.name(), fileName: pvsFile.path()}, function (err, res) {
					//if there was no error update the main file else alert user
                    if (!err) {
                        project.mainPVSFile(pvsFile);
                    } else {
                        console.log(err);
                    }
				});
			}
		});
	
		d3.select("#btnSaveFile").on("click", function () {
			var pvsFile = projectManager.getSelectedFile(), project = projectManager.project();
			if (pvsFile) {
				project.saveFile(pvsFile, function (err, res) {
					if (!err) {
						pvsFile.dirty(false);
						projectManager.updateSourceCodeToolbarButtons(pvsFile, project);
						projectManager.updateListView();
					} else {
						console.log(err);
					}
				});
			}
		});
	
		d3.select("#btnRestartPVSioWeb").on("click", function () {
			//try to start process on server
			var project = projectManager.project(), ws = WSManager.getWebSocket();
			if (project && project.mainPVSFile()) {
				ws.lastState("init(0)");
				ws.startPVSProcess({fileName: project.mainPVSFile().name(), projectName: project.name()},
							  pvsProcessReady);
			}
		});
	}
	
	function createHtmlElements() {
		var content = require("text!pvsioweb/forms/maincontent.handlebars");
		$("body").append(content);
	}
	
	module.exports = {
		init: createHtmlElements,
		bindListeners: function (projectManager) {
			bindListeners(projectManager);
		}
	};
});