import Curve from "./Curve";
import { CurveTypes } from "./utils/enums";
import { windowSize } from "./utils/types";
import events from "./utils/events";

function main() {
  const canvas = <HTMLCanvasElement>document.getElementById("app");
  const ctx: CanvasRenderingContext2D | null = canvas?.getContext("2d");

  const windowSize: windowSize = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  canvas.width = windowSize.width;
  canvas.height = windowSize.height;

  let curves: Array<Curve> = [];
  let isMultipleLines: boolean = false;
  let curveSelectedType: CurveTypes = CurveTypes.Linear;
  let animId;

  // Initialization for menus and events
  events({ctx, windowSize, curveSelectedType, curves, isMultipleLines});

// Drawing loop
  const drawingCurve = () => {
    curves.forEach((curve) => {
      curve.drawCurve(ctx);
    });
    animId = requestAnimationFrame(drawingCurve);
  };

  drawingCurve();
}

main();
