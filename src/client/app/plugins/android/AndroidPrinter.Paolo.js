

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
	setAPPName : function(name){
		appName =  name;
	},

	setCanvasScale: function (scale){
   		canvasScale =  scale;
	},

	setOrientation: function (ori){
		if (ori == "PORTRAIT") orientation = 1;
		else orientation = 0; 
	},
	createGVariable: function (name, type, value) {
		if((Object.keys(gALLvariables).length) == 0){
			gALLvariables.gvariables=[];
			gALLvariables.gstringvariables = [];
		}

    	if(type == "String"){
    		var gvari = {};
    		gvari.name = name;
    		gvari.type = type;
    		if(value==null)
    			gvari.initialValue = "null";
   			else
    			gvari.initialValue = value;
    		gALLvariables.gstringvariables.push(gvari);

    	}
    	else{
   	 		var gVar = {};
    		gVar.name = name;
    		gVar.type = type;

    		if(value!=null)
    			gVar.initialValue = value;
    		else
    			gVar.initialValue = "null";
    		gALLvariables.gvariables.push(gVar);
    	}

	},

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

	createImage: function (name,coords,other){
    	var image ={};
    	image.name = name;
    	image.xpos = coords.left;
    	image.ypos = coords.top;
    	image.visible = other.visible;
    	image.number = (Object.keys(images).length)+1;;
    	images.push(image);
	},

	createFunction: function (name,type){
    	var func = {};
    	func.name = name;
    	func.type = type;
    	functions.push(func);
	},

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
        





        

        










