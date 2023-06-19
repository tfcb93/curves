import Curve from "./Curve";
import startTray, { closeMenu } from "./utils/tray";
import { CurveTypes } from "./utils/enums";
import { windowSize } from "./utils/types";
import { changeCurves, clearScreen } from "./utils/functions";

function main() {
  const canvas = <HTMLCanvasElement>document.getElementById("app");
  const ctx: CanvasRenderingContext2D | null = canvas?.getContext("2d");

  const optionsBtn: HTMLElement | null = document.getElementById("menu-icon");
  const optionsTray: HTMLElement | null = document.getElementById("menu-tray");
  const curveSelectLabel = document.getElementById("type-label");

  let showInstructions = true;
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

  const drawingCurve = () => {
    curves.forEach((curve) => {
      curve.drawCurve(ctx);
    });
    animId = requestAnimationFrame(drawingCurve);
  };

  drawingCurve();

  startTray({
    clearFunction: () => clearScreen(ctx, windowSize, curves),
    multipleFunction: () => {
      isMultipleLines = !isMultipleLines;
    },
    selectTypeFunction: (val = 0) => {
      curveSelectedType = changeCurves(curveSelectedType + val, true);
      if(curveSelectLabel) {
        curveSelectLabel.innerText = CurveTypes[curveSelectedType];
      };
    },
  });

  document.addEventListener("click", (e: MouseEvent) => {
    // Close if menu is open
    closeMenu();
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
      clearScreen(ctx, windowSize, curves)
    }

    // multiple
    if (e.key === "m") {
      isMultipleLines = !isMultipleLines;
    }

    if (e.key === "z") {
      curveSelectedType = changeCurves(curveSelectedType);
    }
  });

  optionsBtn?.addEventListener("click", (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if(optionsBtn.classList.contains("menu-active")) {
      optionsBtn?.classList.remove("menu-active");
      optionsTray?.classList.add("menu-active");
    }
  });

  optionsTray?.addEventListener("click", (e: MouseEvent) =>{
    e.stopPropagation();
    e.preventDefault();
  });
}

main();
