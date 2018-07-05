
/**
 * @module StellantV2
 * @version 1.0.0
 * @author  André P"int"o
 * @desc This module provides a javascript framework to easly constroy
 * a Android application for a medical device
 *
 * @date Jun 04, 2018
 *
 */
/*jsl"int" lets: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*jsh"int" esnext:true */

/*global define*/




/**
    * @function setAPPName
    * @public
    * @description setAPPName method allows te user to define the application name.
    * @param name {String} the aplication name.
    * @memberof module:StellantV2
    * @instance
*/
function setAPPName(name){
     appname = name;
}

function setCanvasScale(scale){
    canvasScale = scale;
}

function setOrientation(ori){
    orientation = ori;
}

/**
     * @function createGVariable
     * @public 
     * @description createGVariable method allows a defdeclaration of a global variable to be used for the device.
     * @param name {String} the variable name.
     * @param type {String} of the variablebutton horizontral translation.
     * @param value {undefined} the initial value of the variable
     * @memberof module:StellantV2
     * @instance
     */

function createGVariable(name, type, value) {
    if(type == "String"){
    var gVar = {};
    gVar.name = name;
    gVar.type = type;
    if(value==null)
    gVar.initialValue = "null";
    else
    gVar.initialValue = value;
    gstringvariables.push(gVar);
    }
    else{
    var gVar = {};
    gVar.name = name;
    gVar.type = type;

    if(value!=null){
    gVar.initialValue = value;}
    else{
    gVar.initialValue = "null";}
    gvariables.push(gVar);
    }
}
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
     * @memberof module:StellantV2
     * @instance
     */

function createButton(name, measures, other) {
  
    var button = {};
    button.name = name;
    button.xpos = measures.left;
    button.ypos = measures.top;
    button.xsize = measures.width;
    button.ysize = measures.height;
    if(other.function != null)
    button.functionName = other.function;
    button.number = (Object.keys(buttons).length)+1;
    }
    buttons.push(button);
}

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
     * @memberof module:StellantV2
     * @instance
     */
function createDisplay(name, measures, other) {
   
    var display = {};
    display.name = name;
    display.xpos = measures.left;
    display.ypos = measures.top;
    display.xsize = measures.width;
    display.ysize = measures.height;
    display.start_text = other.startText;
    display.textsize = other.textsize;
    display.color = other.color;
    if(other.font != null)
    display.font = other.font;
    display.visible = other.visible;
    display.number = (Object.keys(displays).length)+1;
    displays.push(display);
}

/**
     * @function createImage
     * @public 
     * @description createImage method allows a definitiion of a image or set of images that will be
     * part of the user "int"erface. In the Android app images will be bisposed in layers
     * and at the bottom layer will be the fist image defined and at the top layer will be the last.
     * @param name {String} the image name.
     * @param measures {var} variable that contains information about certain measures like
     * top and left margins.
     * @param other {var} variable that contains either optional or required information like 
     * information about visibility of the image.
     * @memberof module:StellantV2
     * @instance
     */
function createImage(name,measures,other){
    var image ={};
    image.name = name;
    image.xpos = measures.left;
    image.ypos = measures.top;
    image.visible = other.visible;
    image.number = (Object.keys(images).length)+1;
    images.push(image);
}



function createFunction(name,type){
    var func = {};
    func.name = name;
    func.type = type;
    functions.push(func);
}

/**
     * @function createJava
     * @public 
     * @description createJava method allows the creation of JAVA and XML files, 
     * that will be used to code thw Android app. This files can be oppened as an 
     * Android Studio project to be modified as pleased by the user.
     * @memberof module:StellantV2
     * @instance
     */
function createJava(){

    const source = fs.readFileSync(mainActivityInFile,'utf8');

    const template = handle.compile(source,{strict: true});
    const result = template(device);

    fs.writeFileSync(mainActivityOutFile,result);

    const source1 = fs.readFileSync(stateInFile,'utf8');
    const template1 = handle.compile(source1,{strict: true});
    const result1 = template1(device);
    fs.writeFileSync(stateOutFile, result1);

    const source2 = fs.readFileSync(xmlInFile,'utf8');
    const template2 = handle.compile(source2,{strict: true});
    const result2 = template2(device);
    fs.writeFileSync(xmlOutFile, result2);

    const source3 = fs.readFileSync(stringsInFile,'utf8');
    const template3 = handle.compile(source3,{strict: true});
    const result3 = template3(device);
    fs.writeFileSync(stringsOutFile, result3);

}








//FileSystem no PVS (pvsio/src/client/app/filesystem)
const fs  = require('fs');
const handle = require('handlebars');

const mainActivityInFile = 'MainActivityTemplate.java';
const mainActivityOutFile = 'Template/app/src/main/java/at/lukle/clickableareas/MainActivity.java';
//const mainActivityOutFile = 'MainActivity.java';
const stateInFile = 'StateTemplate.java';
const stateOutFile = 'Template/app/src/main/java/at/lukle/clickableareas/State.java';
//const stateOutFile = 'State.java';
const xmlOutFile = 'Template/app/src/main/res/layout/activity_main.xml';
//const xmlOutFile = 'activity_main.xml';
const xmlInFile = 'activity_mainTemplate.xml';
const stringsInFile = 'stringsTemplate.xml';
const stringsOutFile = 'Template/app/src/main/res/values/strings.xml';
//const stringsOutFile = 'strings.xml';

var appname = "AppTemplate";
var canvasScale=2.7;
var orientation=1;
var buttons = [];
var displays = [];
var images = [];
var gvariables = [];
var gstringvariables = [];
var functions = [];


var device = {appname, canvasScale, orientation, gvariables, gstringvariables, functions, buttons, displays, images};

var tmp = [];











