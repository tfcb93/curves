import chroma from "chroma-js";
import { cubicBezier, linearBezier, quadraticBezier } from "./utils/curves";
import { CurveTypes } from "./utils/enums";

class Curve {
  private startX: number;
  private startY: number;
  private endX: number;
  private endY: number;
  private prevPoint: [number, number];
  private nextPoint: [number, number];
  private points: Array<Array<number>>;
  private colors: Array<string>;
  private actualColor: string;
  private curveType: CurveTypes;
  private controlPoints: Array<Array<number>>;
  private step: number;
  private stepInterval: number;

  constructor(startX, startY) {
    this.startX = startX;
    this.startY = startY;
    this.curveType = CurveTypes.Quadratic;
    this.step = 0;
    this.stepInterval = 0.01;
    this.points = [];
    this.prevPoint = [this.startX, this.startY];
    this.actualColor = chroma.random();
    this.calculatePoints();
    this.calculateColors();
    this.generatePoints();
  }

  drawControlPoints(ctx) {
    this.points.map(() => {});
  }

  drawCurve(ctx) {
    ctx.beginPath();
    ctx!.strokeStyle = this.actualColor;
    ctx?.moveTo(this.prevPoint[0], this.prevPoint[1]);
    ctx?.lineTo(this.nextPoint[0], this.nextPoint[1]);
    ctx?.stroke();
    this.prevPoint = this.nextPoint.map((value) => value) as [number, number];
    if (this.step >= 1) {
      this.step = 0;
      this.startX = this.endX;
      this.startY = this.endY;
      this.calculatePoints();
      this.calculateColors();
    }
    this.generatePoints();
  }

  calculatePoints() {
    this.generateRandomEndPoints(window.innerWidth, 0, window.innerHeight, 0);
    this.generateRandomControlPoints(
      this.startX - 1000,
      this.startY + 1000,
      this.startX - 100,
      this.startY + 100
    );
  }

  generatePoints() {
    switch (this.curveType) {
      case CurveTypes.Linear:
        for (let i = 0; i < 1; i = i + this.step) {
          this.points = [
            ...this.points,
            linearBezier([this.startX, this.startY], [this.endX, this.endY], i),
          ];
        }
        break;
      case CurveTypes.Cubic:
        for (let i = 0; i < 1; i = i + this.step) {
          this.points = [
            ...this.points,
            cubicBezier(
              [this.startX, this.startY],
              this.controlPoints[0] as [number, number],
              this.controlPoints[1] as [number, number],
              [this.endX, this.endY],
              i
            ),
          ];
        }
        break;
      case CurveTypes.Quadratic:
        this.nextPoint = quadraticBezier(
          [this.startX, this.startY],
          this.controlPoints[0] as [number, number],
          [this.endX, this.endY],
          this.step
        );
        this.step += this.stepInterval;
        break;
      default:
        this.points = [];
    }
    this.actualColor = this.colors[parseInt((this.step * 100).toString()) - 1];
  }

  calculateColors() {
    this.colors = chroma
      .scale([this.actualColor, chroma.random()])
      .mode("hsl")
      .colors(1 / this.stepInterval);
  }

  generateRandomControlPoints(
    maxX: number = 100,
    minX: number = 0,
    maxY: number = 100,
    minY: number = 0
  ) {
    this.controlPoints = [
      [
        Math.floor(Math.random() * (maxX - minX) + minX),
        Math.floor(Math.random() * (maxY - minY) + minY),
      ],
      [
        Math.floor(Math.random()) * (maxX - minX) + minX,
        Math.floor(Math.random() * (maxY - minY) + minY),
      ],
    ];
  }

  setControlPoints(cp1: [number, number], cp2: [number, number]) {
    this.controlPoints = [cp1, cp2];
  }

  generateRandomEndPoints(
    maxX: number = 100,
    minX: number = 0,
    maxY: number = 100,
    minY: number = 0
  ) {
    this.endX = Math.floor(Math.random() * (maxX - minX) + minX);
    this.endY = Math.floor(Math.random() * (maxY - minY) + minY);
  }
}

export default Curve;
