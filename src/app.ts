import bezierTest from "./bezierTest";
import Curve from "./Curve";
import MovingPoint from "./MovingPoint";

function main() {
  const canvas = <HTMLCanvasElement>document.getElementById("app");
  const ctx = canvas?.getContext("2d");
  const windowSize = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  canvas.width = windowSize.width;
  canvas.height = windowSize.height;

  const startPos = {
    x: Math.floor(Math.random() * 100),
    y: Math.floor(Math.random() * 100),
  };

  const curves: Array<Curve> = [];

  const drawingCurve = () => {
    // ctx?.clearRect(0, 0, windowSize.width, windowSize.height);
    curves.forEach((curve) => {
      curve.drawCurve(ctx);
    });
    // bezierTest(ctx);
    requestAnimationFrame(drawingCurve);
  };

  drawingCurve();

  document.addEventListener("click", (e: MouseEvent) => {
    curves.push(new Curve(e.clientX, e.clientY));
    // for (let i = 0; i < 100; i++) {
    //   curves.push(new Curve(e.clientX, e.clientY));
    // }
  });

  document.addEventListener("keypress", (e: KeyboardEvent) => {
    if (e.key === "r") {
      ctx?.clearRect(0, 0, windowSize.width, windowSize.height);
    }
  });
}

main();
