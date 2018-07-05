

//FileSystem no PVS (pvsio/src/client/app/filesystem)
const fs  = require('fs');
const handle = require('handlebars');

const mainActivityInFile = 'MainActivityTemplate.java';
//const mainActivityOutFile = 'Template/app/src/main/java/at/lukle/clickableareas/MainActivity.java';
const mainActivityOutFile = 'MainActivity.java';

const stateInFile = 'StateTemplate.java';
//const stateOutFile = 'Template/app/src/main/java/at/lukle/clickableareas/State.java';
const stateOutFile = 'State.java';

//const xmlOutFile = 'Template/app/src/main/res/layout/activity_main.xml';
const xmlOutFile = 'activity_main.xml';
const xmlInFile = 'activity_mainTemplate.xml';

const stringsInFile = 'stringsTemplate.xml';
//const stringsOutFile = 'Template/app/src/main/res/values/strings.xml';
const stringsOutFile = 'strings.xml';



module.exports={
	setAPPName : function(name){
		return name;
	},

	setCanvasScale: function (scale){
   		return scale;
	},

	setOrientation: function (ori){
		if (ori == "PORTRAIT") return 1;
		else return 0; 
	},
	createGVariable: function (name, type, value, gvar) {
		if((Object.keys(gvar).length) == 0){
			gvar.gvariables=[];
			gvar.gstringvariables = [];
		}

    	if(type == "String"){
    		var temp = gvar.gstringvariables;
    		var gvari = {};
    		gvari.name = name;
    		gvari.type = type;
    		if(value==null)
    			gvari.initialValue = "null";
   			else
    			gvari.initialValue = value;
    		gvar.gstringvariables.push(gvari);

    	}
    	else{
   	 		var gVar = {};
    		gVar.name = name;
    		gVar.type = type;

    		if(value!=null)
    			gVar.initialValue = value;
    		else
    			gVar.initialValue = "null";
    		gvar.gvariables.push(gVar);
    	}
    	return gvar	;
	},

	createButton: function (name, coords, other, buttons) {
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
    	return buttons;
	},

	createDisplay: function (name, coords, other,displays) {
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
    	return displays;
	},

	createImage: function (name,coords,other,images){
    	var image ={};
    	image.name = name;
    	image.xpos = coords.left;
    	image.ypos = coords.top;
    	image.visible = other.visible;
    	image.number = (Object.keys(images).length)+1;;
    	images.push(image);
    	return images;
	},

	createFunction: function (name,type,functions){
    	var func = {};
    	func.name = name;
    	func.type = type;
    	functions.push(func);
    	return functions;
	},

	createJava: function (dev){

    	const source = fs.readFileSync(mainActivityInFile,'utf8');
    	const template = handle.compile(source,{strict: true});
    	const result = template(dev);
    	fs.writeFileSync(mainActivityOutFile,result);

    	const source1 = fs.readFileSync(stateInFile,'utf8');
    	const template1 = handle.compile(source1,{strict: true});
    	const result1 = template1(dev);
    	fs.writeFileSync(stateOutFile, result1);

    	const source2 = fs.readFileSync(xmlInFile,'utf8');
    	const template2 = handle.compile(source2,{strict: true});
    	const result2 = template2(dev);
    	fs.writeFileSync(xmlOutFile, result2);

    	const source3 = fs.readFileSync(stringsInFile,'utf8');
    	const template3 = handle.compile(source3,{strict: true});
    	const result3 = template3(dev);
    	fs.writeFileSync(stringsOutFile, result3);

	}
}










