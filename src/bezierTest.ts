// implementations based on: https://en.wikipedia.org/wiki/B%C3%A9zier_curve

import { cubicBezier } from "./utils/curves";

const bezierTest = (ctx) => {
  const pTestZero: [number, number] = [1, 1];
  const pTestOne: [number, number] = [450, 550];
  const pTestTwo: [number, number] = [1000, 560];
  const pTestTree: [number, number] = [400, 300];

  const points: Array<[number, number]> = [];
  for (let i = 0; i <= 1; i = i + 0.03) {
    points.push(cubicBezier(pTestZero, pTestOne, pTestTwo, pTestTree, i));
  }
  let index = 0;
  let animId;

  const drawControlPoints = () => {
    ctx!.fillStyle = "red";
    ctx?.arc(pTestOne[0], pTestOne[1], 5, 0, 2 * Math.PI);
    ctx?.arc(pTestTwo[0], pTestTwo[1], 5, 0, 2 * Math.PI);
    ctx?.fill();
  };
  const drawTest = (points, index) => {
    if (points.length - 1 === index) {
      cancelAnimationFrame(animId);
      return;
    }
    ctx.beginPath();
    ctx!.strokeStyle = "green";
    ctx?.moveTo(points[index][0], points[index][1]);
    ctx?.lineTo(points[index + 1][0], points[index + 1][1]);
    ctx?.stroke();
    index++;

    animId = requestAnimationFrame(() => drawTest(points, index));
  };
  // drawControlPoints();
  drawTest(points, index);
};

export default bezierTest;
