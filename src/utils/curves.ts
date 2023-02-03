// implementations based on: https://en.wikipedia.org/wiki/B%C3%A9zier_curve

const linearBezier = (
  startPoint: [number, number],
  endPoint: [number, number],
  t: number = 0.05
): [number, number] => {
  const newX = (1 - t) * startPoint[0] + t * endPoint[0];
  const newY = (1 - t) * startPoint[1] + t * endPoint[1];

  return [newX, newY];
};
const quadraticBezier = (
  startPoint: [number, number],
  controlPoint: [number, number],
  endPoint: [number, number],
  t: number = 0.01
): [number, number] => {
  const newX =
    (1 - t) * ((1 - t) * startPoint[0] + t * controlPoint[0]) +
    t * ((1 - t) * controlPoint[0] + t * endPoint[0]);
  const newY =
    (1 - t) * ((1 - t) * startPoint[1] + t * controlPoint[1]) +
    t * ((1 - t) * controlPoint[1] + t * endPoint[1]);

  return [newX, newY];
};
const cubicBezier = (
  startPoint: [number, number],
  controlPoint1: [number, number],
  controlPoint2: [number, number],
  endPoint: [number, number],
  t: number = 0.01
): [number, number] => {
  const newX =
    Math.pow(1 - t, 3) * startPoint[0] +
    3 * Math.pow(1 - t, 2) * t * controlPoint1[0] +
    3 * (1 - t) * Math.pow(t, 2) * controlPoint2[0] +
    Math.pow(t, 3) * endPoint[0];
  const newY =
    Math.pow(1 - t, 3) * startPoint[0] +
    3 * (1 - t) * Math.pow(t, 2) * controlPoint2[0] +
    Math.pow(t, 3) * endPoint[0];

  return [newX, newY];
};

export { linearBezier, quadraticBezier, cubicBezier };
