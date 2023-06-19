export type curvePoints = {
  start: {
    x: number;
    y: number;
  };
  end: {
    x: number;
    y: number;
  };
  controlPoints: {
    one: {
      x: number;
      y: number;
    };
    two: {
      x: number;
      y: number;
    };
  };
  prev: {
    x: number;
    y: number;
  };
  next: {
    x: number;
    y: number;
  };
};

export type curveColors = {
  colorArray: Array<string>;
  actualColor: string;
};

export type windowSize = {
  width: number;
  height: number
}