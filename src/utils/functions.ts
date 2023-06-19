import Curve from "../Curve";
import { CurveTypes } from "./enums";
import { curveColors, curvePoints, windowSize } from "./types";

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

export function clearScreen(context: CanvasRenderingContext2D | null, windowSize: windowSize, curves: Array<Curve>) {
  curves.length = 0;
  context?.clearRect(0, 0, windowSize.width, windowSize.height);
}

export function changeCurves(curveSelectedType: CurveTypes, throughOptions?: boolean): CurveTypes {
  if (!throughOptions) {
    switch (curveSelectedType) {
      case CurveTypes.Linear:
        return CurveTypes.Quadratic;
      case CurveTypes.Quadratic:
        return CurveTypes.Cubic;
      case CurveTypes.Cubic:
        return CurveTypes.Linear;
      default:
        return CurveTypes.Linear;
    }
  }
  if (curveSelectedType > 3) {
    return 1;
  } else if (curveSelectedType < 1) {
    return 3;
  }
  return curveSelectedType;
}