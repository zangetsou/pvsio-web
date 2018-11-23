Guide step-by-step to use this JavaScript framework.

###### setAPPName

> How to use setAPPName function

```
//import framework library
var module = require('./module');

//set Android application name
module.setAPPName("StellantV2");
```
###### setCanvasScale

> How to use setCanvasScale function

```
//import framework library
var module = require('./module');

//set canvasScale value
module.setCanvasScale(2.8);
```
###### setOrientation

> How to use setOrientation function

```
//import framework library
var module = require('./module');

//set Android application orientation
module.setOrientation("PORTRAIT");
```


###### createGVariable

> How to use createGVariable function

```
//import framework library
var module = require('./module');

//create a global variable
module.createGVariable("MAX_VOLUME",int,230);
```

###### createButton

> How to use createButton function

```
//import framework library
var module = require('./module');

//create a button
module.createButton("inc_saline",
	{ left:174, top:674, left:26, height:26}, 
	{function:"press_inc_saline",display:false});
```


###### createDisplay

> How to use createDisplay function

```
//import framework library
var module = require('./module');

//create a display
module.createDisplay("tv1", 
	{left:120, top:624, width:100, height:50}, 
	{startText:"---", textsize:25, color:"#2DFF1B", font:"fonts/abc.ttf",visible:false});
```
###### createFunction

> How to use createFunction function


```
//import framework library
var module = require('./module');

//create a function
module.createFunction("btn_on", "State");
```

###### createImage

> How to use createImage function


```
//import framework library
var module = require('./module');

//create a image
module.createImage("empty_console", {left:0, top:0}, {display:true});
```


###### createJava

> How to use createJava function


```
//import framework library
var module = require('./module');

//set Android application
module.setAPPName("StellantV2");
module.setCanvasScale(2.8);
module.setOrientation("PORTRAIT");

//create all buttons, displays, images or functions needed
module.createButton("inc_saline",
	{ left:174, top:674, left:26, height:26}, 
	{function:"press_inc_saline",display:false});
module.createButton("dec_saline",
	{ left:174, top:709, left:26, height:26}, 
	{function:"press_dec_saline",display:false});
module.createButton("btn_on",
	{ left:690, top:1060, left:25, height:25}, 
	{function:"press_btn_ACC",display:true});
module.createDisplay("tv2", 
	{left:280, top:624, width:100, height:50}, 
	{startText:"---", textsize:25, color:"#0000ff", font:"fonts/abc.ttf",visible:false});
module.createImage("all", {left:0, top:0}, {display:true});
module.createImage("buttons_10", {left:0, top:0}, {display:true});
module.createFunction("btn_on", "State");

//at the end create Android Studio project
module.createJava("~/Desktop");

```



