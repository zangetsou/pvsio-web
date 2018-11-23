//loading module with static functions
var AndroidPrinter = require('./AndroidPrinter.Paolo');

AndroidPrinter.setAPPName("Radical7");


AndroidPrinter.setCanvasScale(2.7);
AndroidPrinter.setOrientation("LANDSCAPE");

AndroidPrinter.createGVariable("id","String", "Radical7");
AndroidPrinter.createGVariable("spo2","float", "99");
AndroidPrinter.createGVariable("spo2_max","float", "0");
AndroidPrinter.createGVariable("spo2_min","float", "88");
AndroidPrinter.createGVariable("spo2_label","String", "SpO2");
AndroidPrinter.createGVariable("spo2_alarm","Alarm", "off");
AndroidPrinter.createGVariable("spo2_fail","boolean", "false");
AndroidPrinter.createGVariable("rra","float", "99");
AndroidPrinter.createGVariable("rra_max","float", "0");
AndroidPrinter.createGVariable("rra_min","float", "88");
AndroidPrinter.createGVariable("rra_label","String", "RRa");
AndroidPrinter.createGVariable("rra_alarm","Alarm", "off");
AndroidPrinter.createGVariable("rra_fail","boolean", "false");
AndroidPrinter.createGVariable("isOn","boolean", "true");

AndroidPrinter.createDisplay(
	"disp1",
	{top:220, left:820, width:100, height:50},
	{startText:"99",textsize:25,visible:"false",color:"#ffffff"});

AndroidPrinter.createDisplay(
	"disp2",
	{top:340, left:820, width:100, height:50},
	{startText:"99",textsize:25,visible:"false",color:"#ffffff"});

AndroidPrinter.createImage(
	"radical_7",
	{top:0, left:0},
	{visible:"true"});

AndroidPrinter.createFunction ("per_on", "boolean");
AndroidPrinter.createFunction ("on", "State");
AndroidPrinter.createFunction ("click_btn_on", "State");
AndroidPrinter.createFunction ("click_btn_mute", "State");
AndroidPrinter.createFunction ("check_spo2", "State");
AndroidPrinter.createFunction ("check_rra", "State");
AndroidPrinter.createFunction ("check_vitals", "State");
AndroidPrinter.createFunction ("tick", "State");
AndroidPrinter.createFunction ("spo2_sensor_data", "State");
AndroidPrinter.createFunction ("rra_sensor_data", "State");
AndroidPrinter.createFunction ("init", "State");



AndroidPrinter.createButton (
	"btn_on",
	{top:330, left:1040, width:50, height:50},
	{function:"btn_on"});

console.log(AndroidPrinter.dev);
AndroidPrinter.createJava("/Users/andrepinto/Desktop/radical");








