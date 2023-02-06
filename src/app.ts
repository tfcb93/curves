import Curve from "./Curve";
import { CurveTypes } from "./utils/enums";

function main() {
  const canvas = <HTMLCanvasElement>document.getElementById("app");
  const ctx: CanvasRenderingContext2D | null = canvas?.getContext("2d");
  let showInstructions = true;
  const windowSize = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  canvas.width = windowSize.width;
  canvas.height = windowSize.height;

  let curves: Array<Curve> = [];
  let isMultipleLines: boolean = false;
  let curveSelectedType: CurveTypes = CurveTypes.Linear;
  let animId;

  const drawingCurve = () => {
    curves.forEach((curve) => {
      curve.drawCurve(ctx);
    });
    animId = requestAnimationFrame(drawingCurve);
  };

  drawingCurve();

  document.addEventListener("click", (e: MouseEvent) => {
    // Don't start if you click on the links
    const targetElement = e.target as HTMLElement;
    if (targetElement.tagName === "A") {
      return;
    }
    // cap it to 1000
    if (showInstructions) {
      const instructions = document.getElementById("instruction-card");
      instructions?.parentNode?.removeChild(instructions);
    }
    if (curves.length >= 1000) {
      return;
    }
    if (isMultipleLines) {
      for (let i = 0; i < 100; i++) {
        curves.push(new Curve(e.clientX, e.clientY, curveSelectedType));
      }
    } else {
      curves.push(new Curve(e.clientX, e.clientY, curveSelectedType));
    }
  });

  document.addEventListener("keypress", (e: KeyboardEvent) => {
    // clear
    if (e.key === "c") {
      curves = [];
      ctx?.clearRect(0, 0, windowSize.width, windowSize.height);
    }

    // multiple
    if (e.key === "m") {
      isMultipleLines = !isMultipleLines;
    }

    if (e.key === "z") {
      switch (curveSelectedType) {
        case CurveTypes.Linear:
          curveSelectedType = CurveTypes.Quadratic;
          break;
        case CurveTypes.Quadratic:
          curveSelectedType = CurveTypes.Cubic;
          break;
        case CurveTypes.Cubic:
          curveSelectedType = CurveTypes.Linear;
          break;
        default:
          null;
      }
    }
  });
}

main();
