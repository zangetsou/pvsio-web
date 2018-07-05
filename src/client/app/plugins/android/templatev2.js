//loading module with static functions
var module = require('./module');

//definition of variables needed for the device
var buttons = [];
var displays = [];
var images = [];
var gvariables = [];
var functions = [];

var appName =  module.setAPPName("Radical7");

var orientation = module.setOrientation("PORTRAIT");
var canvasScale = module.setCanvasScale(2.7);
//var orientation = module.setOrientation("LANDSCAPE");

gvariables = module.createGVariable("gvar","String", "aa",gvariables);

displays = module.createDisplay(
	"disp1",
	{top:100, left:50, width:30, height:30},
	{startText:"ola",textsize:30,visible:"true"},
	displays);

images = module.createImage(
	"img1",
	{top:100, left:50},
	{visible:"true"},
	images);

functions = module.createFunction ("func1", "void", functions);

buttons = module.createButton (
	"btn_on",
	{top:100, left:50, width:30, height:30},
	{function:"btn_on"},
	buttons);

var device = {appName, canvasScale, orientation, gvariables, functions, buttons, displays, images};

console.log(device);

module.createJava(device);








