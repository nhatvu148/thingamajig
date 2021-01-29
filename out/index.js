"use strict";
exports.__esModule = true;
var Thingamajig_1 = require("./Thingamajig");
var giveMeAt = function (t) {
    console.log("giveMeAt: " + t);
};
var handlers = {
    numberHandler: function (t) {
        console.log("numberHandler called");
    },
    stringHandler: function (t) {
        console.log("stringHandler called");
    },
    objectHandler: function (t) {
        console.log("objectHandler called");
    }
};
var fstDim = {
    width: 10,
    depth: 12,
    height: 14
};
var secDim = {
    width: 120,
    depth: 15,
    height: 120
};
var thingamajig = new Thingamajig_1.Thingamajig(fstDim, "Hello", { hello: 12 }, 1234, giveMeAt, Thingamajig_1.ThingamajigColor.Blue);
console.log(thingamajig.validDimensions());
thingamajig.updateDim(secDim);
thingamajig.updateCol(Thingamajig_1.ThingamajigColor.Blue);
thingamajig.handle(handlers);
