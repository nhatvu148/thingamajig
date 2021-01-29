import {
  Thingamajig,
  ThingamajigColor,
  IThingamajigHandler,
  Dimensions,
} from "./Thingamajig";

const giveMeAt = (t: number) => {
  console.log(`giveMeAt: ${t}`);
};

const handlers: IThingamajigHandler = {
  numberHandler: (t: Thingamajig) => {
    console.log("numberHandler called");
  },
  stringHandler: (t: Thingamajig) => {
    console.log("stringHandler called");
  },
  objectHandler: (t: Thingamajig) => {
    console.log("objectHandler called");
  },
};

const fstDim: Dimensions = {
  width: 10,
  depth: 12,
  height: 14,
};
const secDim: Dimensions = {
  width: 120,
  depth: 15,
  height: 120,
};
let thingamajig: Thingamajig = new Thingamajig(
  fstDim,
  "Hello",
  { hello: 12 },
  1234,
  giveMeAt,
  ThingamajigColor.Blue
);

console.log(thingamajig.validDimensions());
thingamajig.updateDim(secDim);
thingamajig.updateCol(ThingamajigColor.Blue);
thingamajig.handle(handlers);
