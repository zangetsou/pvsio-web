
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
     * @function createGVariable
     * @public 
     * @description createGVariable method allows a defdeclaration of a global variable to be used for the device.
     * @param name {String} the variable name.type of the variablebutton horizontral translation.
     * @param value {undifined} the initial value of the variable
     * @memberof module:StellantV2
     * @instance
     */

function createGVariable(name, type, value) {
    if(type == "String"){
    var gVar = {};
    gVar.name = name;
    gVar.type = type;
    gVar.initialValue = value;
    gstringvariables.push(gVar);
    }
    else{
    var gVar = {};
    gVar.name = name;
    gVar.type = type;
    gVar.initialValue = value;
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
    button.number = buttons_nr;
    buttons_nr = buttons_nr +1;
    if(other.display == true){
        button.images = tmp;
        tmp = [];
        tmp_nr = 1;
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
    display.number = displays_nr;
    displays_nr = displays_nr + 1;
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
    image.number = images_nr;
    images_nr = images_nr +1;
    images.push(image);
}

/**
     * @function addImage
     * @public 
     * @description addImage method allows a definitiion of a image or set of images that will be part of the user "int"erface,
     * after a pressing in some defined button. In the Android app images will be bisposed in layers
     * and at the bottom layer will be the fist image defined and at the top layer will be the last.
     * @param name {String} the image name.
     * @param name {String} the image name.
     * @param measures {var} variable that contains information about certain measures like
     * top and left margins.
     * @param other {var} variable that contains either optional or required information like 
     * information about visibility of the image.
     * @memberof module:StellantV2
     * @instance
     */
function addImage(name,measures,other){
    var image ={};
    image.name = name;
    image.xpos = measures.left;
    image.ypos = measures.top;
    image.visible = other.visible;
    image.number = tmp_nr;
    tmp_nr = tmp_nr +1;
    tmp.push(image);
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

    const source = fs.readFileSync(inFile,'utf8');

    const template = handle.compile(source,{strict: true});
    const result = template(device);

    fs.writeFileSync(outFile,result);

}








//FileSystem no PVS (pvsio/src/client/app/filesystem)
const fs  = require('fs');
const handle = require('handlebars');

const inFile ='teste.java';
const outFile='MainActivity.java';



var buttons = [];
var displays = [];
var images = [];
var gvariables = [];
var gstringvariables = [];

var device = {gvariables, gstringvariables,buttons,displays,images};
var buttons_nr = 1;
var images_nr = 1;
var displays_nr = 1;
var tmp_nr = 1;
var tmp = [];



createGVariable("MAX_VOLUME","int",230);
createGVariable("VOL_BUFFER","int",10);
createGVariable("MAX_RATE","int",200);
createGVariable("PlungerLevel","int",0);
createGVariable("FAST","int",10);
createGVariable("SLOW","int",1);
createGVariable("DEFAULT_VOLUME_SALINE","int",224);
createGVariable("DEFAULT_VOLUME_CONTRAST","int",224);
createGVariable("AUTOLOAD_STEP","int",6);
createGVariable("PRIME_VOLUME_SALINE","int",3);
createGVariable("PRIME_VOLUME_CONTRAST","int",1);
createGVariable("tick_step","float",250);
createGVariable("BTN_ACC_TIMEOUT","float",750);
createGVariable("BTN_MANUAL_TIMEOUT","float",3000);
createGVariable("BTN_AUTO_TIMEOUT","float",8000);
createGVariable("state","State",null);
createGVariable("step","int",5);


createButton("inc_saline",{ left:174, top:674, width:26, height:26}, {function:"press_inc_saline",display:false});
createButton("dec_saline",{ left:174, top:709, width:26, height:26}, {function:"press_dec_saline",display:false});
createButton("inc_contrast",{ left:260, top:674, width:26, height:26}, {function:"press_inc_contrast",display:false});
createButton("dec_contrast",{ left:260, top:709, width:26, height:26}, {function:"press_dec_contrast",display:false});
createButton("btn_auto",{ left:215, top:690, width:35, height:37}, {function:"click_btn_auto",display:false});
createButton("btn_manual",{ left:215, top:856, width:35, height:35}, {function:"click_btn_manual",display:false});
createButton("btn_fup_saline",{ left:115, top:742, width:65, height:95}, {function:"press_btn_fUP_saline",display:false});
createButton("btn_sup_saline",{ left:115, top:837, width:65, height:70}, {function:"press_btn_sUP_saline",display:false});
createButton("btn_sdown_saline",{ left:115, top:907, width:65, height:65}, {function:"press_btn_sDOWN_saline",display:false});
createButton("btn_fdown_saline",{ left:115, top:972, width:65, height:75}, {function:"press_btn_fDOWN_saline",display:false});
createButton("btn_fup_contrast",{ left:275, top:742, width:65, height:95}, {function:"press_btn_fUP_contrast",display:false});
createButton("btn_sup_contrast",{ left:275, top:837, width:65, height:70}, {function:"press_btn_sUP_contrast",display:false});
createButton("btn_sdown_contrast",{ left:275, top:907, width:65, height:65}, {function:"press_btn_sDOWN_contrast",display:false});
createButton("btn_fdown_contrast",{ left:275, top:972, width:65, height:75}, {function:"press_btn_fDOWN_contrast",display:false});
createButton("btn_fill_saline",{ left:110, top:687, width:60, height:34}, {function:"click_btn_fill_saline",display:false});
createButton("btn_fill_contrast",{ left:295, top:687, width:60, height:34}, {function:"click_btn_fill_contrast",display:false});
createButton("btn_prime",{ left:215, top:778, width:35, height:35}, {function:"click_btn_prime",display:false});
createButton("btn_confirm",{ left:215, top:925, width:35, height:35}, {function:"click_btn_confirm",display:false});
createButton("btn_engage",{ left:215, top:1020, width:35, height:35}, {function:"click_btn_console_engage",display:false});
createButton("btn_stop",{ left:120, top:1080, width:93, height:46}, {function:null,display:false});
createButton("btn_start",{ left:242, top:1080, width:93, height:46}, {function:"click_btn_start",display:false});
addImage("all", {left:0, top:0}, {display:true});
addImage("buttons_10", {left:0, top:0}, {display:true});
addImage("console_led_on", {left:0, top:0}, {display:true});
addImage("console_warning", {left:0, top:0}, {display:true});
createButton("btn_on",{ left:690, top:1060, width:25, height:25}, {function:"press_btn_ACC",display:true});
addImage("all", {left:0, top:0}, {display:true});
addImage("buttons_8", {left:0, top:0}, {display:true});
addImage("console_led_on", {left:0, top:0}, {display:true});
addImage("console_normal", {left:0, top:0}, {display:true});
createButton("confirm_security_btn",{ left:655, top:875, width:130, height:35}, {function:"click_btn_confirm_security",display:true});
createButton("rotate_injector",{ left:635, top:250, width:217, height:35}, {function:"rotate_injector",display:false});
createButton("plug_syringe_saline",{ left:635, top:315, width:100, height:35}, {function:"plug_syringe_saline",display:false});
createButton("plug_syringe_contrast",{ left:755, top:315, width:100, height:35}, {function:"plug_syringe_contrast",display:false});
createButton("spike_saline_bag",{ left:635, top:365, width:100, height:27}, {function:"plug_bag_saline",display:false});
createButton("spike_contrast_bag",{ left:755, top:365, width:100, height:27}, {function:"displayplug_bag_contrast",display:false});
createButton("connect_infusion_set",{ left:638, top:406, width:217, height:35}, {function:"connect_infusion_set",display:false});//
createDisplay("tv1", {left:120, top:624, width:100, height:50}, {startText:"---", textsize:25, color:"#2DFF1B", font:"fonts/abc.ttf",visible:false});
createDisplay("tv2", {left:280, top:624, width:100, height:50}, {startText:"---", textsize:25, color:"#0000ff", font:"fonts/abc.ttf",visible:false});
createImage("all", {left:0, top:0}, {visible:true});
createImage("buttons_10", {left:0, top:0}, {visible:true});
createImage("console_led_off", {left:0, top:0}, {visible:true});
createImage("empty_console", {left:0, top:0}, {visible:true});


buttons = Object.assign({}, buttons);
displays = Object.assign({}, displays);
images = Object.assign({},images);

console.log(device);

createJava();








