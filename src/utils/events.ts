import Curve from "../Curve";
import { CurveTypes } from "./enums";
import { clearScreen, changeCurves } from "./functions";
import startTray, { closeMenu } from "./tray";
import { windowSize } from "./types";

interface eventsProps {
  ctx: CanvasRenderingContext2D | null;
  windowSize: windowSize;
  curveSelectedType: CurveTypes;
  curves: Array<Curve>;
  isMultipleLines: boolean;
}

function events({ctx, windowSize, curveSelectedType, curves, isMultipleLines}:eventsProps) {
  const optionsBtn: HTMLElement | null = document.getElementById("menu-icon");
  const optionsTray: HTMLElement | null = document.getElementById("menu-tray");
  const curveSelectLabel = document.getElementById("type-label");
  let showInstructions = true;

  // Had to be placed here, otherwise the click event bellow would not get the change of the curveSelectedType variable
  startTray({
    clearFunction: () => clearScreen(ctx, windowSize, curves),
    multipleFunction: () => {
      isMultipleLines = !isMultipleLines;
    },
    // Not gonna create a separated function for this one, since it's only used here and nowhere else for now
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
      // I could also add to read the actual curve value, but I don't think it's necessary
      // I will not consider the user to have a keyboard when on mobile
      // or open on mobile version when in a desktop
    }
  });

  optionsTray?.addEventListener("click", (e: MouseEvent) =>{
    e.stopPropagation();
    e.preventDefault();
  });
}

export default events;