export type Dimensions = {
  width: number;
  depth: number;
  height: number;
};
export interface IThingamajigHandler {
  numberHandler: (t: Thingamajig) => void;
  stringHandler: (t: Thingamajig) => void;
  objectHandler: (t: Thingamajig) => void;
}
export enum ThingamajigColor {
  Red = "RED",
  Blue = "BLUE",
  White = "WHITE",
}
export class Thingamajig {
  name: string;
  protected dimensions: Dimensions;
  private label: any;
  // at a given timestamp calls the function with the Thingamajig
  private giveMeAtTimestamp: number;
  private giveMeAt: ((t: number) => void) | null;
  color: ThingamajigColor;
  constructor(
    dimension: Dimensions,
    name: string,
    label: number | string | object,
    giveMeAtTimestamp: number,
    giveMeAt: (t: number) => void,
    c: ThingamajigColor
  ) {
    this.dimensions = dimension;
    this.name = name;
    this.label = label;
    this.giveMeAtTimestamp = giveMeAtTimestamp;
    this.giveMeAt = giveMeAt;
    const cancel = setInterval(() => {
      if (new Date().valueOf() > this.giveMeAtTimestamp && this.giveMeAt) {
        this.giveMeAt(this.giveMeAtTimestamp);
        this.giveMeAt = null;
        clearInterval(cancel);
      }
    }, 1000);
    this.color = c;
  }
  // a Thingamajig is valid if any of its dimensions is less than 100
  validDimensions(): boolean {
    if (this.dimensions.width < 100) {
      return true;
    } else if (this.dimensions.depth < 100) {
      return true;
    } else if (this.dimensions.height < 100) {
      return true;
    }
    return false;
  }
  // Should accept new dimensions and validate
  updateDim(ds: Dimensions): void | never {
    this.dimensions = ds;
    if (!this.validDimensions()) {
      throw new Error("Invalid Thingamajig dimensions!");
    }
  }
  // Color comes from an external API and can be a string, validate it is a valid color
  // and then update
  updateCol(co: string): null | never {
    if (
      co === ThingamajigColor.Blue ||
      co === ThingamajigColor.Red ||
      co === ThingamajigColor.White
    ) {
      this.color = co;
      return null;
    } else {
      throw new Error(`Invalid Thingamajig color: ${co}!`);
    }
  }
  // There are several services which handle Thingamigs based on their label
  handle(h: IThingamajigHandler): void {
    if (typeof this.label === "number") {
      h.numberHandler(this);
    } else if (typeof this.label === "object") {
      h.objectHandler(this);
    } else if (typeof this.label === "string") {
      h.stringHandler(this);
    } else {
      throw new Error("Unexpected label type!");
    }
  }
}
