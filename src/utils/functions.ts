import { curveColors, curvePoints } from "./types";

export function initializePoints(): curvePoints {
  return {
    start: {
      x: 0,
      y: 0,
    },
    end: {
      x: 0,
      y: 0,
    },
    controlPoints: {
      one: {
        x: 0,
        y: 0,
      },
      two: {
        x: 0,
        y: 0,
      },
    },
    prev: {
      x: 0,
      y: 0,
    },
    next: {
      x: 0,
      y: 0,
    },
  };
}

export function initializeColorControl(): curveColors {
  return {
    colorArray: [],
    actualColor: "",
  };
}
