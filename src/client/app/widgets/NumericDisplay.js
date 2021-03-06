/**
 * @module NumericDisplay
 * @version 2.0
 * @description Renders a basic digital display for rendering numbers. Uses different font size for integer and fractional parts. A cursor can be used to highlight specific digits.
 *              This module provide APIs for changing the look and feel of
 *              the rendered text, including: cursors, background color, font, size, alignment.
 * @author Paolo Masci, Patrick Oladimeji
 * @date Apr 1, 2015
 *
 * @example <caption>Example use of the widget.</caption>
 // Example pvsio-web demo that uses NumericDisplay
 // The following configuration assumes the pvsio-web demo is stored in a folder within pvsio-web/examples/demo/
 require.config({
     baseUrl: "../../client/app",
     paths: {
         d3: "../lib/d3",
         lib: "../lib"
     }
 });
 require(["widgets/NumericDisplay"], function (NumericDisplay) {
      "use strict";
      var device = {};
      device.dispNumeric = new NumericDisplay("dispNumeric", {
        top: 150, left: 120, height: 24, width: 120
      }, {
        displayKey: "disp",
        cursorName: "cur",
        align: "right"
      });
      device.dispNumeric.render({ disp: "B 10.5", cur: -1 }); // the display value is "B 10.5" and the cursor highlights the first fractional digit of the number
 });
 *
 */
/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global define */

define(function (require, exports, module) {
    "use strict";

    var d3 = require("d3/d3");
    var Widget = require("widgets/Widget"),
        StateParser = require("util/PVSioStateParser"),
        Speaker  = require("widgets/TextSpeaker"),
        property = require("util/property");

    /**
     * @function <a name="NumericDisplay">NumericDisplay</a>
     * @description Constructor.
     * @param id {String} The ID of the display.
     * @param coords {Object} The four coordinates (top, left, width, height) of the display, specifying
     *        the left, top corner, and the width and height of the (rectangular) display.
     *        Default is { top: 0, left: 0, width: 200, height: 80 }.
     * @param opt {Object} Options:
     *          <li>align (String): text alignment (available options are "left", "right", anc "center". Default is "center")</li>
     *          <li>backgroundColor (String): background display color (default is black, "#000")</li>
     *          <li>borderWidth (Number): border width (default is 0, i.e., no border, unless option borderColor has been specified -- in this case, the border is 2px)</li>
     *          <li>borderStyle (String): border style, must be a valid HTML5 border style, e.g., "solid" (default is "none")</li>
     *          <li>borderColor (String): border color, must be a valid HTML5 color (default color used in the widget is "black")</li>
     *          <li>cursorName (string): the name of the state attribute defining the cursor position. This information will be used by the render method. If this options is not specified, the cursor will not be displayed.
     *          <li>displayKey (string): the name of the state attribute defining the display content. This information will be used by the render method. Default is the ID of the display.
     *          <li>fontsize (Number): font size (default is 0.8 * coords.height)</li>
     *          <li>fontfamily (String): font family, must be a valid HTML5 font name (default is "sans-serif")</li>
     *          <li>fontColor (String): font color, must be a valid HTML5 color (default is "white", i.e., "#fff")</li>
     *          <li>inverted (Bool): if true, the text has inverted colors,
     *              i.e., fontColor becomes backgroundColor, and backgroundColor becomes fontColor (default is false)</li>
     *          <li>letterSpacing (Number): spacing between characters, in pixels (default is 0)</li>
     *          <li>parent (String): the HTML element where the display will be appended (default is "body")</li>
     *          <li>visibleWhen (string): boolean expression indicating when the display is visible. The expression can use only simple comparison operators (=, !=) and boolean constants (true, false). Default is true (i.e., always visible).
     * @memberof module:NumericDisplay
     * @instance
     */
    function NumericDisplay(id, coords, opt) {
        opt = opt || {};
        coords = coords || {};
        opt.displayKey = opt.displayKey || id;
        opt.cursorName = opt.cursorName || "";
        opt.auditoryFeedback = (opt.auditoryFeedback) ?
            ((opt.auditoryFeedback.toString() === "enabled" || opt.auditoryFeedback.toString() === "true") ? "enabled" : "disabled") : "disabled";
        opt.visibleWhen = opt.visibleWhen || "true";
        this.id = property.call(this, id);
        this.parent = (opt.parent) ? ("#" + opt.parent) : "body";
        this.top = coords.top || 0;
        this.left = coords.left || 0;
        this.width = coords.width || 200;
        this.height = coords.height || 80;
        this.fontsize = opt.fontsize || (this.height * 0.9);
        this.fontfamily = opt.fontfamily || "sans-serif";
        this.font = [this.fontsize, "px ", this.fontfamily];
        this.smallFont = [(this.fontsize * 0.7), "px ", this.fontfamily];
        this.align = opt.align || "center";
        this.backgroundColor = opt.backgroundColor || "black";
        this.fontColor = opt.fontColor || "#fff"; //white
        this.borderColor = opt.borderColor || "inherit";
        this.borderWidth = (opt.borderColor) ? ((opt.borderWidth) ? parseFloat(opt.borderWidth) : 2) : 0;
        this.borderStyle = (opt.borderColor) ? ((opt.borderStyle) ? opt.borderStyle : "solid") : "none";
        this.cursor = opt.cursor || "default";
        if (opt.inverted) {
            var tmp = this.backgroundColor;
            this.backgroundColor = this.fontColor;
            this.fontColor = tmp;
        }
        this.blinking = opt.blinking || false;
        this.textBaseline = "middle";
        var elemClass = id + " displayWidget" + " noselect ";
        if (this.blinking) { elemClass += " blink"; }
        opt.position = opt.position || "absolute";
        opt.borderRadius = opt.borderRadius || "2px";
        this.div = d3.select(this.parent)
                        .append("div").style("position", opt.position)
                        .style("top", this.top + "px").style("left", this.left + "px")
                        .style("width", (this.width + this.borderWidth) + "px").style("height", (this.height + this.borderWidth) + "px")
                        .style("margin", 0).style("padding", 0).style("border-radius", opt.borderRadius)
                        .style("background-color", this.backgroundColor)
                        .style("border-width", this.borderWidth + "px")
                        .style("border-style", this.borderStyle)
                        .style("border-color", this.borderColor)
                        .style("display", "none").attr("id", id).attr("class", elemClass);
        this.div.append("span").attr("id", id + "_span").attr("class", id + "_span")
                        .attr("width", this.width).attr("height", this.height)
                        .style("margin", 0).style("padding", 0)
                        .style("vertical-align", "top").style("border-radius", "2px");
        this.div.append("canvas").attr("id", id + "_canvas").attr("class", id + "_canvas")
                        .attr("width", (this.width - this.borderWidth)).attr("height", (this.height - this.borderWidth))
                        .style("margin", 0).style("padding", 0).style("border-radius", "2px")
                        .style("vertical-align", "top");
        var x2 = this.left + this.width;
        var x3 = this.top + this.height;
        this.div.attr("coords", this.left + "," + this.top + "," + x2 + "," + x3)
                .style("cursor", this.cursor);
        this.txt = ""; // txt is used to store the current text rendered on the display
        this.displayKey = property.call(this, opt.displayKey);
        this.cursorName = property.call(this, opt.cursorName);
        this.auditoryFeedback = property.call(this, opt.auditoryFeedback);
        this.visibleWhen = property.call(this, opt.visibleWhen);
        this.example = opt.example || "0"; // example is used in the prototype builder to demonstrate the font style of the display
        Widget.call(this, id, "numericdisplay");
        return this;
    }
    NumericDisplay.prototype = Object.create(Widget.prototype);
    NumericDisplay.prototype.constructor = NumericDisplay;
    NumericDisplay.prototype.parentClass = Widget.prototype;


    /**
     * @function <a name="render">render</a>
     * @description Renders the widget (i.e., sets the content according to the parameters and makes the widget visible)
     * @param data {Object} JSON object representing the touchscreen display to be rendered.
     *                      The display value is specified in the attributes <displayKey> and <cursorName>
     *                      (the actual values of <displayKey> and <cursorName> are instantiated when creating the widget, see constructor's options)
     * @param opt {Object} Override options for the display style, useful to dynamically change the display style during simulations. Available options include:
     *              <li> fontsize (string): the font size of the display
     *              <li> fontColor (string): the font color of the display
     *              <li> backgroundColor (string): the background color of the display
     *              <li> blinking (Bool): true means the text is blinking
     * @memberof module:NumericDisplay
     * @instance
     */
    NumericDisplay.prototype.render = function (txt, opt) { // TODO: refactor parameter name: txt --> data
        var _this = this;
        function renderNumber(data, opt) {
            function drawCircle(context, x, y, r, fillStyle) {
                context.save();
                context.fillStyle = fillStyle;
                context.beginPath();
                context.arc(x, y, r, 0, Math.PI * 2, true);
                context.closePath();
                context.stroke();
                context.fill();
                context.restore();
            }
            function fontheight(font) {
                var r = font.match(/\d+/g)[0];
                return parseFloat(r);
            }
            function decRadius() {
                return _this.smallFont[0] / 8;
            }
            opt = opt || {};
            data.context.clearRect(0, 0, data.width, data.height);
            data.context.fillStyle = opt.backgroundColor || _this.backgroundColor;
            if (data.context.fillStyle !== "transparent") {
                data.context.fillRect(0, 0, data.width, data.height);
            }
            data.context.fillStyle = opt.fontColor || _this.fontColor;
            var th = 28,
                x,
                y,
                pad = 2;
            var centerx = data.width / 2,
                centery = data.height / 2,
                txtmeasure;
            data.num = (typeof data.num === "string") ? data.num : parseFloat(data.num).toString();
            var nakedPoint = false;
            if (data.num.indexOf(".") === (data.num.length - 1)) {
                nakedPoint = true;
            }
            var frac = data.num.split(".")[1],
                whole = data.num.split(".")[0];
            //pad the string if necessary
            if (data.align === "left") {
                data.context.textAlign = "start";
                centerx = (whole && whole.length) ?
                            _this.fontsize * whole.length / 1.5 - (_this.borderWidth * 1.5)
                            : (_this.borderWidth * 1.5);
            } else if (data.align === "right") {
                data.context.textAlign = "end";
                centerx = (frac && frac.length) ?
                            data.width - (_this.fontsize * frac.length / 1.8) - (_this.borderWidth * 1.5)
                            : data.width - (_this.borderWidth * 1.5);
            } else {
                data.context.textAlign = "center";
            }
            var i;
            if (data.cursorPos >= whole.length - 1) {
                for (i = data.cursorPos - (whole.length - 1); i > 0; i--) {
                    whole = "0".concat(whole);
                }
            } else if (data.cursorPos < 0) {
                frac = frac || "";
                for (i = Math.abs(data.cursorPos) - frac.length; i > 0; i--) {
                    frac = frac.concat("0");
                }
            }
            if (nakedPoint || (frac !== undefined && frac.length > 0)) {
                drawCircle(context, centerx, centery, decRadius(), _this.fontColor);
            }
            if (frac !== undefined && frac.length > 0) {
                x = centerx + pad + decRadius();
                context.textAlign = "left";
                context.fillStyle = _this.fontColor;
                context.font = _this.smallFont.join("");
                th = fontheight(context.font);
                y = centery + (th * 0.5);
                //draw the fraction bit
                frac.split("").forEach(function (d, index) {
                    if (data.cursorPos === (index + 1) * -1) {
                        context.save();
                        //draw a cursor and then the number
                        txtmeasure = context.measureText(d);
                        context.fillRect(x, y - th, txtmeasure.width, th);
                        context.fillStyle = (_this.backgroundColor !== "") ? _this.backgroundColor : "#000";
                        context.fillText(d, x, centery);
                        x += txtmeasure.width + pad;
                        context.restore();
                    } else {
                        txtmeasure = context.measureText(d);
                        context.fillText(d, x, centery);
                        x += txtmeasure.width + pad;
                    }
                });
            }
            context.font = _this.font.join("");
            context.textAlign = "right";
            context.fillStyle = _this.fontColor;
            x = centerx - decRadius() - pad;
            th = fontheight(context.font);
            y = centery + (th * 0.5);
            //draw the whole bit in reverse aligning to the right
            whole.split("").reverse().forEach(function (d, index) {
                if (d === "_" && index < whole.length - data.cursorPos) { d = "0"; }
                if (data.cursorPos === index) {
                    context.save();
                    //draw a cursor and then the number
                    txtmeasure = context.measureText(d);
                    context.fillRect(x - txtmeasure.width, y - th, txtmeasure.width, th);
                    context.fillStyle = (_this.backgroundColor !== "") ? _this.backgroundColor : "#000";
                    context.fillText(d, x, centery);
                    x -= (txtmeasure.width + pad);
                    context.restore();
                } else {
                    txtmeasure = context.measureText(d);
                    context.fillText(d, x, centery);
                    x -= (txtmeasure.width + pad);
                }
            });
        }

        opt = opt || {};
        opt.auditoryFeedback = opt.auditoryFeedback || this.auditoryFeedback();
        var isEnabled = false;
        var visibleWhen = opt.visibleWhen || this.visibleWhen();
        var expr = StateParser.simpleExpressionParser(visibleWhen);
        if (expr && expr.res) {
            if (expr.res.type === "constexpr" && expr.res.constant === "true") {
                isEnabled = true;
            } else if (expr.res.type === "boolexpr" && expr.res.binop) {
                var str = StateParser.resolve(txt, expr.res.attr);
                if (str) {
                    str = StateParser.evaluate(str);
                    if ((expr.res.binop === "=" && str === expr.res.constant) ||
                         (expr.res.binop === "!=" && str !== expr.res.constant)) {
                             isEnabled = true;
                    }
                }
            }
        }

        if (isEnabled) {
            opt.borderWidth = opt.borderWidth || this.borderWidth;
            opt.borderStyle = opt.borderStyle || this.borderStyle;
            opt.borderColor = opt.borderColor || this.borderColor;
            this.div.style("border-width", opt.borderWidth + "px")
                    .style("border-style", opt.borderStyle)
                    .style("border-color", opt.borderColor);

            txt = txt || "";
            var dispVal = txt, cursorPos = 0;
            if (typeof txt === "object") {
                // txt in this case is a PVS state that needs to be parsed
                dispVal = StateParser.resolve(txt, this.displayKey());
                if (dispVal) {
                    dispVal = StateParser.evaluate(dispVal).toString().replace(new RegExp("\"", "g"), "");
                }
                cursorPos = parseInt(StateParser.evaluate(StateParser.resolve(txt, this.cursorName())));
            }
            //read out the display value if audio is enabled for this display widget
            if (opt.auditoryFeedback === "enabled") {
                Speaker.speak(dispVal);
            }
            this.example = dispVal;
            this.txt = txt;
            // set blinking
            var elemClass = this.div.node().getAttribute("class");
            elemClass = (opt.blinking || this.blinking) ?
                            ((elemClass.indexOf("blink") < 0) ? (elemClass + " blink") : elemClass)
                            : elemClass.replace(" blink", "");
            this.div.node().setAttribute("class", elemClass);
            // render content
            var context = this.div.select("#" + this.id() + "_canvas").node().getContext("2d");
            context.textBaseline = this.textBaseline;
            var align = opt.align || this.align;
            context.font = this.font.join("");
            renderNumber({
                num: dispVal,
                cursorPos: cursorPos,
                context: context,
                align: align,
                height: this.height,
                width: this.width - 2 * this.borderWidth
            }, opt);
            d3.select("#" + this.id() + "_canvas").style("display", "block");
            d3.select("#" + this.id() + "_span").style("display", "none");
            return this.reveal();
        }
        return this.hide();
    };
    NumericDisplay.prototype.renderSample = function (opt) {
        opt = opt || {};
        var txt = opt.txt || this.example;
        return this.render(txt, { visibleWhen: "true" });
    };

    /**
     * @function <a name="setColors">setColors</a>
     * @description Sets the font color and background color.
     * @param colors {Object} Font color and background color. Attributed of the object are fontColor: (string) and backgroundColor (string).
     * @param opt {Object} Override options for the display style, useful to dynamically change the display style during a simulation. Available options include:
     *              <li> fontsize (string): the font size of the display
     *              <li> fontColor (string): the font color of the display
     *              <li> backgroundColor (string): the background color of the display
     *              <li> blinking (Bool): true means the text is blinking
     * @memberof module:NumericDisplay
     * @instance
     */
    NumericDisplay.prototype.setColors = function (colors, opt) {
        colors = colors || {};
        opt = opt || {};
        opt.auditoryFeedback = opt.auditoryFeedback || "disabled";
        this.fontColor = colors.fontColor || this.fontColor;
        this.backgroundColor = colors.backgroundColor || this.backgroundColor;
        return this.render(this.txt, opt);
    };
    /**
     * @function <a name="invertColors">invertColors</a>
     * @description Inverts the colors of the display (as in a negative).
     * @memberof module:NumericDisplay
     * @instance
     */
    NumericDisplay.prototype.invertColors = function () {
        var tmp = this.backgroundColor;
        this.backgroundColor = this.fontColor;
        this.fontColor = tmp;
        var elemIsBlinking = this.div.node().getAttribute("class").indexOf("blink") >= 0;
        return this.render(this.txt, { blinking: elemIsBlinking });
    };

    /**
     * @function <a name="hide">hide</a>
     * @description Hides the widget
     * @memberof module:NumericDisplay
     * @instance
     */
    NumericDisplay.prototype.hide = function () {
        this.div.style("display", "none");
        return this;
    };

    /**
     * @function <a name="reveal">reveal</a>
     * @description Makes the widget visible
     * @memberof module:NumericDisplay
     * @instance
     */
    NumericDisplay.prototype.reveal = function () {
        this.div.style("display", "block");
        return this;
    };

    /**
     * @function <a name="move">move</a>
     * @description Changes the position of the widget according to the coordinates given as parameter.
     * @param data {Object} Coordinates indicating the new position of the widget. The coordinates are given in the form { top: (number), left: (number) }
     * @memberof module:NumericDisplay
     * @instance
     */
    NumericDisplay.prototype.move = function (data) {
        data = data || {};
        if (data.top) {
            this.top = data.top;
            this.div.style("top", this.top + "px");
        }
        if (data.left) {
            this.left = data.left;
            this.div.style("left", this.left + "px");
        }
        return this;
    };


    /**
     * @function <a name="toJSON">toJSON</a>
     * @description Returns a serialised version of the widget in JSON format.
     *              This is useful for saving/loading a specific instance of the widget.
     *              In the current implementation, the following attributes are included in the JSON object:
     *              <li> type (string): widget type, i.e., "numericdisplay" in this case
     *              <li> id (string): the unique identifier of the widget instance
     *              <li> fontsize (string): the font size of the display
     *              <li> fontColor (string): the font color of the display
     *              <li> backgroundColor (string): the background color of the display
     *              <li> displayKey (string): the name of the state attribute defining the display content.
     *              <li> cursorName (string): the name of the state attribute defining the cursor position.
     *              <li> visibleWhen (string): a booloan expression defining when the condition under which the widget is visible
     *              <li> auditoryFeedback (string): whether display readback is enabled
     * @returns JSON object
     * @memberof module:NumericDisplay
     * @instance
     */
    NumericDisplay.prototype.toJSON = function () {
        return {
            type: this.type(),
            id: this.id(),
            displayKey: this.displayKey(),
            cursorName: this.cursorName(),
            auditoryFeedback: this.auditoryFeedback(),
            visibleWhen: this.visibleWhen(),
            fontsize: this.fontsize,
            fontColor: this.fontColor,
            backgroundColor: this.backgroundColor
        };
    };
    /**
    * Updates the location and size of the widget according to the given position and size
     */
    NumericDisplay.prototype.updateLocationAndSize = function (pos, opt) {
        opt = opt || {};
        if (opt.imageMap) {
            NumericDisplay.prototype.parentClass.updateLocationAndSize.apply(this, arguments);
        }
        this.top = pos.y || 0;
        this.left = pos.x || 0;
        this.width = pos.width || 200;
        this.height = pos.height || 80;
        // this.fontsize = this.height * 0.9;
        // this.font = [this.fontsize, "px ", this.fontfamily];
        // this.smallFont = [(this.fontsize * 0.7), "px ", this.fontfamily];
        d3.select("div." + this.id()).style("left", this.left + "px").style("top", this.top + "px")
            .style("width", this.width + "px").style("height", this.height + "px").style("font-size", this.fontsize + "px");
        d3.select("div." + this.id()).select("span").attr("width", this.width + "px").attr("height", this.height + "px"); // used for glyphicon
        d3.select("div." + this.id()).select("canvas").attr("width", this.width + "px").attr("height", this.height + "px"); // used for standard text and numbers
        return this.render(this.example, opt);
    };
    NumericDisplay.prototype.updateStyle = function (data) {
        data = data || {};
        this.fontsize = data.fontsize || this.fontsize;
        this.font = [this.fontsize, "px ", this.fontfamily];
        this.smallFont = [(this.fontsize * 0.7), "px ", this.fontfamily];
        this.fontColor = data.fontColor || this.fontColor;
        this.backgroundColor = data.backgroundColor || this.backgroundColor;
        return this;
    };
    /**
     * @function <a name="remove">remove</a>
     * @description Removes the div elements of the widget from the html page -- useful to programmaticaly remove widgets from a page.
     * @memberof module:NumericDisplay
     * @instance
     */
    NumericDisplay.prototype.remove = function () {
        NumericDisplay.prototype.parentClass.remove.apply(this);
        d3.select("div." + this.id()).remove();
    };

    module.exports = NumericDisplay;
});
