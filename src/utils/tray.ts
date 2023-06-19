import { CurveTypes } from "./enums";

interface startTraysProps {
  clearFunction?: Function;
  multipleFunction?: Function;
  selectTypeFunction?: Function;
}

function startTrays({clearFunction, multipleFunction, selectTypeFunction}:startTraysProps) {
  const menuTray = document.getElementById("menu-tray");
  const menuBtn = document.getElementById("menu-icon");
  const closeButton = document.getElementById("tray-close");
  const curveSelectLeft = document.getElementById("type-left");
  const curveSelectRight = document.getElementById("type-right");
  const resetButton = document.getElementById("clear-screen");
  const toggle10Curves = document.getElementById("toggle-ten-curves");

  closeButton?.addEventListener("click", (e: MouseEvent) => {
    if (menuTray?.classList.contains("menu-active")) {
      menuBtn?.classList.add("menu-active");
      menuTray.classList.remove("menu-active");
    }
  });

  resetButton?.addEventListener("click", (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (clearFunction) {
      clearFunction();
    }
  });

  toggle10Curves?.addEventListener("click", (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    toggle10Curves.innerText = toggle10Curves.innerText === "Off" ? "On" : "Off"; 
    if (multipleFunction) {
      multipleFunction();
    }
  });

  curveSelectLeft?.addEventListener("click", (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if(selectTypeFunction) {
      selectTypeFunction(1);
    }
  });

  curveSelectRight?.addEventListener("click", (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if(selectTypeFunction) {
      selectTypeFunction(-1);
    }
  });
}

export default startTrays;