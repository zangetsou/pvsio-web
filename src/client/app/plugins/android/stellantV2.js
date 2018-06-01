

//FileSystem no PVS (pvsio/src/client/app/filesystem)
const fs  = require('fs');
const handle = require('handlebars');

const inFile ='teste.java';
const outFile='MainActivity.java';



var buttons = [];
var displays = [];
var images = [];
//var device = {buttons, displays, images};
var device = {buttons,displays,images};
var buttons_nr = 1;
var images_nr = 1;
var tmp_nr = 1;
var tmp = [];

function createButton(name, x, y, sx, sy, functionName, display) {
    // var button = new Button(name,x,y,sx,sy,functionName);
    //buttons[name] = button;
    var button = {};
    button.name = name;
    button.xpos = x;
    button.ypos = y;
    button.xsize = sx;
    button.ysize = sy;
    if(functionName != null)
    button.functionName = functionName;
    button.nr = buttons_nr;
    buttons_nr = buttons_nr +1;
    if(display == true){
        button.images = tmp;
        tmp = [];
        tmp_nr = 1;
    }
    buttons.push(button);
}
function createDisplay(name, x, y, sx, sy, start_text,textsize,color,font,visible) {
    //var display = new Display(name,x,y,sx,sy,start_text,textsize,color,visible);
    //displays[name] = display;
    var display = {};
    display.name = name;
    display.xpos = x;
    display.ypos = y;
    display.xsize = sx;
    display.ysize = sy;
    display.start_text = start_text;
    display.textsize = textsize;
    display.color = color;
    if(font != null)
    display.font = font;
    display.visible = visible;
    displays.push(display);
}
function createImage(name,x,y,visible,layer){
    //var image = new Image(name,x,y,visible,layer);
    //images[name] = image;
    var image ={};
    image.name = name;
    image.xpos = x;
    image.ypos = y;
    image.visible = visible;
    image.layer = layer;
    image.number = images_nr;
    images_nr = images_nr +1;
    images.push(image);
}

function addImage(name,x,y,visible,layer){
    //var image = new Image(name,x,y,visible,layer);
    //images[name] = image;
    var image ={};
    image.name = name;
    image.xpos = x;
    image.ypos = y;
    image.visible = visible;
    image.layer = layer;
    image.number = tmp_nr;
    tmp_nr = tmp_nr +1;
    tmp.push(image);
}



createButton("inc_saline", 174, 674, 26, 26, "press_inc_saline",false);
createButton("dec_saline", 174, 709, 26, 26, "press_dec_saline",false);
createButton("inc_contrast", 260, 674, 26, 26, "press_inc_contrast",false);
createButton("dec_contrast", 260, 709, 26, 26, "press_dec_contrast",false);
createButton("btn_auto", 215, 690, 35, 37, "click_btn_auto",false);
createButton("btn_manual", 215, 856, 35, 35, "click_btn_manual",false);
createButton("btn_fup_saline", 115, 742, 65, 95, "press_btn_fUP_saline",false);
createButton("btn_sup_saline", 115, 837, 65, 70, "press_btn_sUP_saline",false);
createButton("btn_sdown_saline", 115, 907, 65, 65, "press_btn_sDOWN_saline",false);
createButton("btn_fdown_saline", 115, 972, 65, 75, "press_btn_fDOWN_saline",false);
createButton("btn_fup_contrast", 275, 742, 65, 95, "press_btn_fUP_contrast",false);
createButton("btn_sup_contrast", 275, 837, 65, 70, "press_btn_sUP_contrast",false);
createButton("btn_sdown_contrast", 275, 907, 65, 65, "press_btn_sDOWN_contrast",false);
createButton("btn_fdown_contrast", 275, 972, 65, 75, "press_btn_fDOWN_contrast",false);
createButton("btn_fill_saline", 110, 687, 60, 34, "click_btn_fill_saline",false);
createButton("btn_fill_contrast", 295, 687, 60, 34, "click_btn_fill_contrast",false);
createButton("btn_prime", 215, 778, 35, 35, "click_btn_prime",false);
createButton("btn_confirm", 215, 925, 35, 35, "click_btn_confirm",false);
createButton("btn_engage", 215, 1020, 35, 35, "click_btn_console_engage",false);
createButton("btn_stop", 120, 1080, 93, 46, null,false);
createButton("btn_start", 242, 1080, 93, 46, "click_btn_start",false);
addImage("all", 0, 0, true, 0);
addImage("buttons_10", 0, 0, true, 0);
addImage("console_led_on", 0, 0, true, 0);
addImage("console_warning", 0, 0, true, 0);
createButton("btn_on", 690, 1060, 25, 25, "press_btn_ACC",true);
addImage("all", 0, 0, true, 0);
addImage("buttons_8", 0, 0, true, 0);
addImage("console_led_on", 0, 0, true, 0);
addImage("console_normal", 0, 0, true, 0);
createButton("confirm_security_btn", 655, 875, 130, 35, "click_btn_confirm_security",true);
createButton("rotate_injector", 635, 250, 217, 35, "rotate_injector",false);
createButton("plug_syringe_saline", 635, 315, 100, 35, "plug_syringe_saline",false);
createButton("plug_syringe_contrast", 755, 315, 100, 35, "plug_syringe_contrast",false);
createButton("spike_saline_bag", 635, 365, 100, 27, "plug_bag_saline",false);
createButton("spike_contrast_bag", 755, 365, 100, 27, "plug_bag_contrast");
createButton("connect_infusion_set", 638, 406, 217, 35, "connect_infusion_set",false);//
createDisplay("tv1", 120, 624, 100, 50, "---", 25, "#2DFF1B", "fonts/abc.ttf",false);
createDisplay("tv2", 280, 624, 100, 50, "---", 25, "#0000ff", "fonts/abc.ttf",false);
createImage("all", 0, 0, true, 0);
createImage("buttons_10", 0, 0, true, 0);
createImage("console_led_off", 0, 0, true, 0);
createImage("empty_console", 0, 0, true, 0);


buttons = Object.assign({}, buttons);
displays = Object.assign({}, displays);
images = Object.assign({},images);

console.log(device);


const context = buttons;

const source = fs.readFileSync(inFile,'utf8');

const template = handle.compile(source,{strict: true});
const result = template(device);

fs.writeFileSync(outFile,result);



