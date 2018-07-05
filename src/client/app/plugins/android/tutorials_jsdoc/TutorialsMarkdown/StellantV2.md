Guide step-by-step to use StellantV2 javascript framework.


###### createGVariable


```

// initialize global variables
var buttons = [];
var displays = [];
var images = [];
var gvariables = [];
var gstringvariables = [];


//create a global variable
createGVariable("MAX_VOLUME",int,230);


```

###### createButton

> How to use createButton function


```
// initialize global variables
var buttons = [];
var displays = [];
var images = [];

var device = {buttons,displays,images};


//create a button
createButton("inc_saline",{ left:174, top:674, left:26, height:26}, {function:"press_inc_saline",display:false});

```


###### createDisplay

> How to use createDisplay function


```
// initialize global variables
var buttons = [];
var displays = [];
var images = [];

var device = {buttons,displays,images};


//create a display
createDisplay("tv1", {left:120, top:624, width:100, height:50}, {startText:"---", textsize:25, color:"#2DFF1B", font:"fonts/abc.ttf",visible:false});


```


###### createImage

> How to use createImage function


```
// initialize global variables
var buttons = [];
var displays = [];
var images = [];

var device = {buttons,displays,images};


//create a image
createImage("empty_console", {left:0, top:0}, {display:true});


```





###### addImage

> How to use addImage function


```
// initialize global variables
var buttons = [];
var displays = [];
var images = [];
var tmp = [];

var device = {buttons,displays,images};


//add images to tmp variable
addImage("console_led_on", {left:0, top:0}, {display:true});
addImage("console_warning", {left:0, top:0}, {display:true});


//create button with dislpay argument as TRUE to use images on tmp variable
//tmp variable will be reseted
createButton("btn_on",{ left:690, top:1060, left:25, height:25}, {function:"press_btn_ACC",display:true});




```



###### createJava

> How to use createJava function


```
// initialize global variables
var buttons = [];
var displays = [];
var images = [];
var tmp = [];

var device = {buttons,displays,images};


//create all buttons, displays or images that you want
createButton("inc_saline",{ left:174, top:674, left:26, height:26}, {function:"press_inc_saline",display:false});
createButton("dec_saline",{ left:174, top:709, left:26, height:26}, {function:"press_dec_saline",display:false});
addImage("console_warning", {left:0, top:0}, {display:true});
createButton("btn_on",{ left:690, top:1060, left:25, height:25}, {function:"press_btn_ACC",display:true});
createDisplay("tv2", {left:280, top:624, width:100, height:50}, {startText:"---", textsize:25, color:"#0000ff", font:"fonts/abc.ttf",visible:false});
createImage("all", {left:0, top:0}, {display:true});
createImage("buttons_10", {left:0, top:0}, {display:true});

//at the end create JAVA and XML files
createJava();

```



