/**
 * @module PIMWidget
 * @desc Widget within the PIM prototype editor
 * @author Nathanile Watson
 */
define(function (require, exports, module) {
    "use strict";
    var Widget = require("widgets/Widget"),
        property = require("util/property");

    var PIMWidget = function (id, coords, opt) {
        opt = opt || {};
        opt.evts = ["click"];
        coords = coords || {};
        this.imageMap = property.call(this);

        Widget.call(this, id, "pim-button");

        this.y = coords.top || 0;
        this.x = coords.left || 0;
        this.width = coords.width || 32;
        this.height = coords.height || 32;

        this.name = property.call(this, opt.name || "New widget");
        this.targetScreen = property.call(this, opt.targetScreen);

        return this;
    };


    PIMWidget.prototype = Object.create(Widget.prototype);
    PIMWidget.prototype.constructor = PIMWidget;
    PIMWidget.prototype.parentClass = Widget.prototype;

    /**
     * Returns a JSON object representation of this Widget.
     * @returns {object}
     * @memberof PIMWidget
    */
    PIMWidget.prototype.toJSON = function () {
        return {
            id: this.id(),
            type: this.type()
        };
    };

    /**
     * Removes the widget's image map from the DOM (but does not remove the widget's reference to it)
     */
    PIMWidget.prototype.removeImageMap = function () {
        if (this.imageMap()) {
            this.imageMap().remove();
        }
    };



    /**
     * Returns an object containing the x, y, width and height properties of the widget.
     * @returns {object}
     * @memberof PIMWidget
    */
    PIMWidget.prototype.getCoords = function () {
        return {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        };
    };

    /**
     * @override
     * @function createImageMap
     * @description Creates an image map area for this widget, which is used by the simulator mode
     * @param {function} opt.onCLick Callback to call when the widget is clicked in the simulator
     * @returns {d3.selection} The image map area created for the widget
     * @memberof PIMWidget
     */
    PIMWidget.prototype.createImageMap = function (opt) {
        opt = opt || {};

        var area = opt.area || PIMWidget.prototype.parentClass.createImageMap.apply(this, arguments);
        var _this = this;

        area.on("mousedown", function (e) {
            opt.onClick(_this, e);
        });

        this.imageMap(area);
        return area;
    };

    PIMWidget.prototype.updateLocationAndSize = function (pos) {
        this.x = pos.x;
        this.y = pos.y;
        this.width = pos.width;
        this.height = pos.height;

        PIMWidget.prototype.parentClass.updateLocationAndSize.apply(this, arguments);
    };

    module.exports = PIMWidget;
});
