
/**
 * @module EasyAdapt
 * @version 2.0.0
 * @author  André Pinto
 * @desc This module provides a JavaScript framework to easly migrate
 * an existing prototype of a medical device to an Android application
 *
 * @date Oct 24, 2018
 *
 */
/*jsl"int" lets: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*jsh"int" esnext:true */

/*global define*/

//FileSystem no PVS (pvsio/src/client/app/filesystem)
const fs  = require('fs');
const path = require('path');
const handle = require('handlebars');

const mainActivityInFile = 'src/MainActivityTemplate.java';
const mainActivityOutFile = 'Template/app/src/main/java/at/lukle/clickableareas/MainActivity.java';
//const mainActivityOutFile = 'MainActivity.java';

const stateInFile = 'src/StateTemplate.java';
const stateOutFile = 'Template/app/src/main/java/at/lukle/clickableareas/State.java';
//const stateOutFile = 'State.java';

const xmlOutFile = 'Template/app/src/main/res/layout/activity_main.xml';
//const xmlOutFile = 'activity_main.xml';
const xmlInFile = 'src/activity_mainTemplate.xml';

const stringsInFile = 'src/stringsTemplate.xml';
const stringsOutFile = 'Template/app/src/main/res/values/strings.xml';
//const stringsOutFile = 'strings.xml';
const sourceTemplate = "/Users/andrepinto/GitHub/pvsio-web 2/src/client/app/plugins/android/Template";

var buttons = [];
var displays = [];
var images = [];
var gALLvariables = [];
var functions = [];

var appName =  "Template";

var orientation = 1;
var canvasScale = 2.7;


var device = {appName,orientation,canvasScale,gALLvariables,buttons,displays,images,functions};

 function copyFileSync ( source, target ) {

        var targetFile = target;

        //if target is a directory a new file with the same name will be created
        if ( fs.existsSync( target ) ) {
            if ( fs.lstatSync( target ).isDirectory() ) {
                targetFile = path.join( target, path.basename( source ) );
            }
        }

        fs.writeFileSync(targetFile, fs.readFileSync(source));
    }

function copyFolderRecursiveSync ( source, target ) {
        var files = [];

        //check if folder needs to be created or integrated
        var targetFolder = path.join( target, path.basename( source ) );
        if ( !fs.existsSync( targetFolder ) ) {
            fs.mkdirSync( targetFolder );
        }

        //copy
        if ( fs.lstatSync( source ).isDirectory() ) {
            files = fs.readdirSync( source );
            files.forEach( function ( file ) {
                var curSource = path.join( source, file );
                if ( fs.lstatSync( curSource ).isDirectory() ) {
                    copyFolderRecursiveSync( curSource, targetFolder );
                } else {
                    copyFileSync( curSource, targetFolder );
                }
            } );
        }
    }
module.exports={
    dev:device,
    /**
     * @function setAPPName
     * @public 
     * @description setAPPName method allows definition of Android application name.
     * @param name {String} Android application name
     * @memberof module:EasyAdapt
     * @instance
     */
	setAPPName : function(name){
		appName =  name;
	},
    /**
     * @function setCanvasScale
     * @public 
     * @description setCanvasScale method allows definition of canvasScale variable value.
     * @param scale {double} canvasScale value
     * @memberof module:EasyAdapt
     * @instance
     */
	setCanvasScale: function (scale){
   		canvasScale =  scale;
	},
    /**
     * @function setOrientation
     * @public 
     * @description setOrientation method allows definition of Android application orientation.
     * @param ori {String} Android application orientation
     * @memberof module:EasyAdapt
     * @instance
     */
	setOrientation: function (ori){
		if (ori == "PORTRAIT") orientation = 1;
		else orientation = 0; 
	},
    /**
     * @function createGVariable
     * @public 
     * @description createGVariable method allows a declaration of a global variable to be used
     * by the background code of the simulation.
     * @param name {String} the variable name.
     * @param type {String} the variable type.
     * @param value {undifined} the initial value of the variable
     * @memberof module:EasyAdapt
     * @instance
     */
	createGVariable: function (name, type, value) {
		if((Object.keys(gALLvariables).length) == 0){
			gvariables.gvariables=[];
			gvariables.gstringvariables = [];
		}

    	if(type == "String"){
    		var gvari = {};
    		gvari.name = name;
    		gvari.type = type;
    		if(value==null)
    			gvari.initialValue = "null";
   			else
    			gvari.initialValue = value;
    		gvariables.gstringvariables.push(gvari);

    	}
    	else{
   	 		var gVar = {};
    		gVar.name = name;
    		gVar.type = type;

    		if(value!=null)
    			gVar.initialValue = value;
    		else
    			gVar.initialValue = "null";
    		gvariables.gvariables.push(gVar);
    	}

	},
    /**
     * @function createButton
     * @public 
     * @description createButton method allows a definitiion of a device button,
     * as well as his associated function that should be executed at the button pressing.
     * @param name {String} the button name.
     * @param measures {var} variable that contains information about certain measures like
     * width, height and left and top margins.
     * @param other {var} variable that contains optional and required informaation like 
     * name of associated function and and information about ui changes after button pressiong.
     * @memberof module:EasyAdapt
     * @instance
     */
	createButton: function (name, coords, other) {
    	var button = {};
    	button.name = name;
    	button.xpos = coords.left;
    	button.ypos = coords.top;
    	button.xsize = coords.width;
    	button.ysize = coords.height;
    	if(other.function != null)
    		button.functionName = other.function;
    	button.number = (Object.keys(buttons).length)+1;
    	buttons.push(button);
	},
    /**
     * @function createDisplay
     * @public 
     * @description createDisplay method allows a definitiion of a device display where
     * can be represented any kind of text.
     * @param name {String} the display name.
     * @param measures {var} variable that contains information about certain measures like
     * width, height and left and top margins.
     * @param other {var} variable that contains either optional or required information like starting text of the display
     * color and font of the displayed text and visibility of the display.
     * @memberof module:EasyAdapt
     * @instance
     */
	createDisplay: function (name, coords, other) {
    	var display = {};
    	display.name = name;
    	display.xpos = coords.left;
    	display.ypos = coords.top;
    	display.xsize = coords.width;
    	display.ysize = coords.height;
    	display.start_text = other.startText;
    	display.textsize = other.textsize;
    	display.color = other.color;
    	if(other.font != undefined)
    		display.font = other.font;
    	display.visible = other.visible;
    	display.number = (Object.keys(displays).length)+1;
    	displays.push(display);
	},
    /**
     * @function createImage
     * @public 
     * @description createImage method allows a definitiion of a image or set of images that will be
     * part of the user interface. In the Android app images will be disposed in layers
     * and at the bottom layer will be the fist image defined and at the top layer will be the last.
     * @param name {String} the image name.
     * @param measures {var} variable that contains information about certain measures like
     * top and left margins.
     * @param other {var} variable that contains either optional or required information like 
     * information about visibility of the image.
     * @memberof module:EasyAdapt
     * @instance
     */
	createImage: function (name,coords,other){
    	var image ={};
    	image.name = name;
    	image.xpos = coords.left;
    	image.ypos = coords.top;
    	image.visible = other.visible;
    	image.number = (Object.keys(images).length)+1;;
    	images.push(image);
	},
    /**
     * @function createFunction
     * @public 
     * @description createFunction method allows a definitiion of background code
     * methods signature.
     * @param name {String} method name.
     * @param type {String} method return type.
     * @memberof module:EasyAdapt
     * @instance
     */
	createFunction: function (name,type){
    	var func = {};
    	func.name = name;
    	func.type = type;
    	functions.push(func);
	},
    /**
     * @function createJava
     * @public 
     * @description createJava method allows the creation of JAVA and XML files, 
     * that will be used to code the Android app. Also build an Android Studio 
     * project with the new files created and any images that the user may want to 
     * set as part of the device interface.
     * @param path {String} directory location where the new Android Studio should
     * be created.
     * @memberof module:EasyAdapt
     * @instance
     */
	createJava: function (path){




        copyFolderRecursiveSync(sourceTemplate,path);


        const source = fs.readFileSync(mainActivityInFile,'utf8');
        const template = handle.compile(source,{strict: true});
        const result = template(device);
        fs.writeFileSync(path + "/" + mainActivityOutFile,result);

        
        const source1 = fs.readFileSync(stateInFile,'utf8');
        const template1 = handle.compile(source1,{strict: true});
        const result1 = template1(device);
        fs.writeFileSync(path + "/" + stateOutFile, result1);

        const source2 = fs.readFileSync(xmlInFile,'utf8');
        const template2 = handle.compile(source2,{strict: true});
        const result2 = template2(device);
        fs.writeFileSync(path + "/" + xmlOutFile, result2);

        const source3 = fs.readFileSync(stringsInFile,'utf8');
        const template3 = handle.compile(source3,{strict: true});
        const result3 = template3(device);
        fs.writeFileSync(path + "/" + stringsOutFile, result3);

        
        images.forEach(function(element) {


            fs.exists(element.name+".png",(exists) => {
                if (exists)
                    copyFileSync(element.name + ".png",path+"/Template/app/src/main/res/drawable");
                else fs.exists(element.name+".jpg",(exists) => {
                    if (exists) copyFileSync(element.name + ".jpg",path+"/Template/app/src/main/res/drawable");
                });  
            });
        }); 

        }


    };
        





        

        










