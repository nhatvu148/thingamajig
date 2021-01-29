"use strict";
exports.__esModule = true;
exports.Thingamajig = exports.ThingamajigColor = void 0;
var ThingamajigColor;
(function (ThingamajigColor) {
    ThingamajigColor["Red"] = "RED";
    ThingamajigColor["Blue"] = "BLUE";
    ThingamajigColor["White"] = "WHITE";
})(ThingamajigColor = exports.ThingamajigColor || (exports.ThingamajigColor = {}));
var Thingamajig = (function () {
    function Thingamajig(dimension, name, label, giveMeAtTimestamp, giveMeAt, c) {
        var _this = this;
        this.dimensions = dimension;
        this.name = name;
        this.label = label;
        this.giveMeAtTimestamp = giveMeAtTimestamp;
        this.giveMeAt = giveMeAt;
        var cancel = setInterval(function () {
            if (new Date().valueOf() > _this.giveMeAtTimestamp && _this.giveMeAt) {
                _this.giveMeAt(_this.giveMeAtTimestamp);
                _this.giveMeAt = null;
                clearInterval(cancel);
            }
        }, 1000);
        this.color = c;
    }
    Thingamajig.prototype.validDimensions = function () {
        if (this.dimensions.width < 100) {
            return true;
        }
        else if (this.dimensions.depth < 100) {
            return true;
        }
        else if (this.dimensions.height < 100) {
            return true;
        }
        return false;
    };
    Thingamajig.prototype.updateDim = function (ds) {
        this.dimensions = ds;
        if (!this.validDimensions()) {
            throw new Error("Invalid Thingamajig dimensions!");
        }
    };
    Thingamajig.prototype.updateCol = function (co) {
        if (co === ThingamajigColor.Blue ||
            co === ThingamajigColor.Red ||
            co === ThingamajigColor.White) {
            this.color = co;
            return null;
        }
        else {
            throw new Error("Invalid Thingamajig color: " + co + "!");
        }
    };
    Thingamajig.prototype.handle = function (h) {
        if (typeof this.label === "number") {
            h.numberHandler(this);
        }
        else if (typeof this.label === "object") {
            h.objectHandler(this);
        }
        else if (typeof this.label === "string") {
            h.stringHandler(this);
        }
        else {
            throw new Error("Unexpected label type!");
        }
    };
    return Thingamajig;
}());
exports.Thingamajig = Thingamajig;
