var AndroidPrinter = require('./AndroidPrinter.Paolo');




AndroidPrinter.setAPPName("StellantV2");
AndroidPrinter.setCanvasScale(2.8);
AndroidPrinter.setOrientation("PORTRAIT");

AndroidPrinter.createGVariable("MAX_VOLUME","int",230);
AndroidPrinter.createGVariable("VOL_BUFFER","int",10);
AndroidPrinter.createGVariable("MAX_RATE","int",200);
AndroidPrinter.createGVariable("PlungerLevel","int",0);
AndroidPrinter.createGVariable("FAST","int",10);
AndroidPrinter.createGVariable("SLOW","int",1);
AndroidPrinter.createGVariable("DEFAULT_VOLUME_SALINE","int",224);
AndroidPrinter.createGVariable("DEFAULT_VOLUME_CONTRAST","int",224);
AndroidPrinter.createGVariable("AUTOLOAD_STEP","int",6);
AndroidPrinter.createGVariable("PRIME_VOLUME_SALINE","int",3);
AndroidPrinter.createGVariable("PRIME_VOLUME_CONTRAST","int",1);
AndroidPrinter.createGVariable("tick_step","float",250);
AndroidPrinter.createGVariable("BTN_ACC_TIMEOUT","float",750);
AndroidPrinter.createGVariable("BTN_MANUAL_TIMEOUT","float",3000);
AndroidPrinter.createGVariable("BTN_AUTO_TIMEOUT","float",8000);
AndroidPrinter.createGVariable("step","int",5);


AndroidPrinter.createButton("inc_saline",{ left:174, top:607, width:23, height:23}, {function:"press_inc_saline",display:false});
AndroidPrinter.createButton("dec_saline",{ left:174, top:642, width:23, height:23}, {function:"press_dec_saline",display:false});
AndroidPrinter.creatAndroidPrintereButton("inc_contrast",{ left:260, top:607, width:23, height:23}, {function:"press_inc_contrast",display:false});
AndroidPrinter.createButton("dec_contrast",{ left:260, top:642, width:23, height:23}, {function:"press_dec_contrast",display:false});
AndroidPrinter.createButton("btn_auto",{ left:214, top:625, width:33, height:33}, {function:"click_btn_auto",display:false});
AndroidPrinter.createButton("btn_manual",{ left:214, top:765, width:33, height:33}, {function:"click_btn_manual",display:false});
AndroidPrinter.createButton("btn_fup_saline",{ left:115, top:680, width:65, height:80}, {function:"press_btn_fUP_saline",display:false});
AndroidPrinter.createButton("btn_sup_saline",{ left:115, top:760, width:65, height:58}, {function:"press_btn_sUP_saline",display:false});
AndroidPrinter.createButton("btn_sdown_saline",{ left:115, top:818, width:65, height:58}, {function:"press_btn_sDOWN_saline",display:false});
AndroidPrinter.createButton("btn_fdown_saline",{ left:115, top:876, width:65, height:65}, {function:"press_btn_fDOWN_saline",display:false});
AndroidPrinter.createButton("btn_fup_contrast",{ left:275, top:680, width:65, height:80}, {function:"press_btn_fUP_contrast",display:false});
AndroidPrinter.createButton("btn_sup_contrast",{ left:275, top:760, width:65, height:58}, {function:"press_btn_sUP_contrast",display:false});
AndroidPrinter.createButton("btn_sdown_contrast",{ left:275, top:818, width:65, height:58}, {function:"press_btn_sDOWN_contrast",display:false});
AndroidPrinter.createButton("btn_fdown_contrast",{ left:275, top:876, width:65, height:65}, {function:"press_btn_fDOWN_contrast",display:false});
AndroidPrinter.createButton("btn_fill_saline",{ left:110, top:620, width:60, height:34}, {function:"click_btn_fill_saline",display:false});
AndroidPrinter.createButton("btn_fill_contrast",{ left:295, top:620, width:60, height:34}, {function:"click_btn_fill_contrast",display:false});
AndroidPrinter.createButton("btn_prime",{ left:215, top:697, width:33, height:3}, {function:"click_btn_prime",display:false});
AndroidPrinter.createButton("btn_confirm",{ left:215, top:836, width:33, height:33}, {function:"click_btn_confirm",display:false});
AndroidPrinter.createButton("btn_engage",{ left:215, top:913, width:33, height:33}, {function:"click_btn_console_engage",display:false});
AndroidPrinter.createButton("btn_stop",{ left:120, top:970, width:93, height:46}, {function:null,display:false});
AndroidPrinter.createButton("btn_start",{ left:242, top:970, width:93, height:46}, {function:"click_btn_start",display:false});
AndroidPrinter.createButton("btn_on",{ left:690, top:962, width:23, height:23}, {function:"press_btn_ACC",display:true});
AndroidPrinter.createButton("confirm_security_btn",{ left:655, top:778, width:130, height:35}, {function:"click_btn_confirm_security",display:true});
AndroidPrinter.createButton("rotate_injector",{ left:620, top:235, width:210, height:28}, {function:"rotate_injector",display:false});
AndroidPrinter.createButton("plug_syringe_saline",{ left:620, top:290, width:100, height:28}, {function:"plug_syringe_saline",display:false});
AndroidPrinter.createButton("plug_syringe_contrast",{ left:738, top:290, width:100, height:28}, {function:"plug_syringe_contrast",display:false});
AndroidPrinter.createButton("spike_saline_bag",{ left:620, top:330, width:100, height:27}, {function:"plug_bag_saline",display:false});
AndroidPrinter.createButton("spike_contrast_bag",{ left:738, top:365, width:100, height:27}, {function:"displayplug_bag_contrast",display:false});
AndroidPrinter.createButton("connect_infusion_set",{ left:620, top:370, width:217, height:28}, {function:"connect_infusion_set",display:false});//


AndroidPrinter.createDisplay("tv1", {left:120, top:624, width:100, height:50}, {startText:"---", textsize:25, color:"#2DFF1B", font:"fonts/abc.ttf",visible:false});
AndroidPrinter.createDisplay("tv2", {left:280, top:624, width:100, height:50}, {startText:"---", textsize:25, color:"#0000ff", font:"fonts/abc.ttf",visible:false});


AndroidPrinter.createImage("all", {left:0, top:0}, {visible:true});
AndroidPrinter.createImage("buttons_10", {left:0, top:0}, {visible:true});
AndroidPrinter.createImage("console_led_off", {left:0, top:0}, {visible:true});
AndroidPrinter.createImage("empty_console", {left:0, top:0}, {visible:true});

AndroidPrinter.createFunction("inc_saline", "State");
AndroidPrinter.createFunction("dec_saline", "State");
AndroidPrinter.createFunction("inc_contrast", "State");
AndroidPrinter.createFunction("dec_contrast", "State");
AndroidPrinter.createFunction("btn_auto", "State");
AndroidPrinter.createFunction("btn_fup_saline", "State");
AndroidPrinter.createFunction("btn_sup_saline", "State");
AndroidPrinter.createFunction("btn_sdown_saline", "State");
AndroidPrinter.createFunction("btn_fdown_saline", "State");
AndroidPrinter.createFunction("btn_fup_contrast", "State");
AndroidPrinter.createFunction("btn_sup_contrast", "State");
AndroidPrinter.createFunction("btn_sdown_contrast", "State");
AndroidPrinter.createFunction("btn_fdown_contrast", "State");
AndroidPrinter.createFunction("btn_fill_saline", "State");
AndroidPrinter.createFunction("btn_fill_contrast", "State");
AndroidPrinter.createFunction("btn_prime", "State");
AndroidPrinter.createFunction("btn_confirm", "State");
AndroidPrinter.createFunction("btn_engage", "State");
AndroidPrinter.createFunction("btn_stop", "State");
AndroidPrinter.createFunction("btn_start", "State");
AndroidPrinter.createFunction("btn_on", "State");
AndroidPrinter.createFunction("confirm_security_btn", "State");
AndroidPrinter.createFunction("rotate_injector", "State");
AndroidPrinter.createFunction("plug_syringe_saline", "State");
AndroidPrinter.createFunction("plug_syringe_contrast", "State");
AndroidPrinter.createFunction("spike_saline_bag", "State");
AndroidPrinter.createFunction("spike_contrast_bag", "State");
AndroidPrinter.createFunction("connect_infusion_set", "State");

console.log(AndroidPrinter.dev);

AndroidPrinter.createJava("/Users/andrepinto/Desktop/StellantV2");







