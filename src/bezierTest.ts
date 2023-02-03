// implementations based on: https://en.wikipedia.org/wiki/B%C3%A9zier_curve

import { cubicBezier } from "./utils/curves";

const bezierTest = (ctx) => {
  const pTestZero: [number, number] = [1, 1];
  const pTestOne: [number, number] = [450, 550];
  const pTestTwo: [number, number] = [10, 560];
  const pTestTree: [number, number] = [100, 500];

  const points: Array<[number, number]> = [];
  for (let i = 0; i <= 1; i = i + 0.03) {
    points.push(cubicBezier(pTestZero, pTestOne, pTestTwo, pTestTree, i));
  }
  let index = 0;
  let animId;

  const drawTest = (points, index) => {
    if (points.length - 1 === index) {
      cancelAnimationFrame(animId);
      return;
    }
    ctx.beginPath();
    ctx!.fillStyle = "red";
    ctx!.strokeStyle = "green";
    ctx?.moveTo(points[index][0], points[index][1]);
    ctx?.lineTo(points[index + 1][0], points[index + 1][1]);
    ctx?.fill();
    ctx?.stroke();
    index++;

    animId = requestAnimationFrame(() => drawTest(points, index));
  };

  drawTest(points, index);
};

export default bezierTest;
