import chroma from "chroma-js";
import { cubicBezier, linearBezier, quadraticBezier } from "./utils/curves";
import { CurveTypes } from "./utils/enums";
import { initializeColorControl, initializePoints } from "./utils/functions";
import { curveColors, curvePoints } from "./utils/types";

class Curve {
  private points: curvePoints;
  private colorControl: curveColors;
  private curveType: CurveTypes;
  private step: number;
  private stepInterval: number;

  constructor(startX: number, startY: number, curveType: CurveTypes) {
    this.points = initializePoints();
    this.points.start.x = this.points.prev.x = startX;
    this.points.start.y = this.points.prev.y = startY;
    this.colorControl = initializeColorControl();
    this.colorControl.actualColor = chroma.random();
    this.curveType = curveType;
    this.step = 0;
    this.stepInterval = 0.01;
    this.calculatePoints();
    this.calculateColors();
    this.generatePoints();
  }

  drawControlPoints(ctx) {
    ctx.beginPath();
    ctx!.fillStyle = "yellow";
    ctx?.arc(
      this.points.controlPoints.one.x,
      this.points.controlPoints.one.y,
      5,
      0,
      2 * Math.PI
    );
    if (this.curveType === CurveTypes.Cubic) {
      ctx?.arc(
        this.points.controlPoints.two.x,
        this.points.controlPoints.two.y,
        5,
        0,
        2 * Math.PI
      );
    }
    ctx?.fill();
  }

  drawCurve(ctx) {
    ctx.beginPath();
    ctx!.strokeStyle = this.colorControl.actualColor;
    ctx?.moveTo(this.points.prev.x, this.points.prev.y);
    ctx?.lineTo(this.points.next.x, this.points.next.y);
    ctx?.stroke();
    this.points.prev.x = this.points.next.x;
    this.points.prev.y = this.points.next.y;

    if (this.step >= 1) {
      this.step = 0;
      this.points.start.x = this.points.end.x;
      this.points.start.y = this.points.end.y;
      this.calculatePoints();
      this.calculateColors();
    }
    this.generatePoints();
  }

  calculatePoints() {
    this.generateRandomEndPoints(window.innerWidth, 0, window.innerHeight, 0);
    this.generateRandomControlPoints(
      this.points.start.x - 1000,
      this.points.start.y + 1000,
      this.points.start.x - 100,
      this.points.start.y + 100
    );
  }

  generatePoints() {
    switch (this.curveType) {
      case CurveTypes.Linear:
        [this.points.next.x, this.points.next.y] = linearBezier(
          [this.points.start.x, this.points.start.y],
          [this.points.end.x, this.points.end.y],
          this.step
        );
        this.step += this.stepInterval;
        break;
      case CurveTypes.Cubic:
        [this.points.next.x, this.points.next.y] = cubicBezier(
          [this.points.start.x, this.points.start.y],
          [
            this.points.controlPoints.one.x,
            this.points.controlPoints.one.y,
          ] as [number, number],
          [
            this.points.controlPoints.two.x,
            this.points.controlPoints.two.y,
          ] as [number, number],
          [this.points.end.x, this.points.end.y],
          this.step
        );
        this.step += this.stepInterval;
        break;
      case CurveTypes.Quadratic:
        [this.points.next.x, this.points.next.y] = quadraticBezier(
          [this.points.start.x, this.points.start.y],
          [
            this.points.controlPoints.one.x,
            this.points.controlPoints.one.y,
          ] as [number, number],
          [this.points.end.x, this.points.end.y],
          this.step
        );
        this.step += this.stepInterval;
        break;
      default:
        null;
    }
    this.colorControl.actualColor =
      this.colorControl.colorArray[parseInt((this.step * 100).toString()) - 1];
  }

  calculateColors() {
    this.colorControl.colorArray = chroma
      .scale([this.colorControl.actualColor, chroma.random()])
      .mode("hsl")
      .colors(1 / this.stepInterval);
  }

  generateRandomControlPoints(
    maxX: number = 100,
    minX: number = 0,
    maxY: number = 100,
    minY: number = 0
  ) {
    this.points.controlPoints.one.x = Math.floor(
      Math.random() * (maxX - minX) + minX
    );
    this.points.controlPoints.one.y = Math.floor(
      Math.random() * (maxY - minY) + minY
    );
    this.points.controlPoints.two.x = Math.floor(
      Math.random() * (maxX - minX) + minX
    );
    this.points.controlPoints.two.y = Math.floor(
      Math.random() * (maxY - minY) + minY
    );
  }

  setControlPoints(cp1: [number, number], cp2: [number, number]) {
    this.points.controlPoints.one.x = cp1[0];
    this.points.controlPoints.one.y = cp1[1];
    this.points.controlPoints.two.x = cp2[0];
    this.points.controlPoints.two.y = cp2[1];
  }

  generateRandomEndPoints(
    maxX: number = 100,
    minX: number = 0,
    maxY: number = 100,
    minY: number = 0
  ) {
    this.points.end.x = Math.floor(Math.random() * (maxX - minX) + minX);
    this.points.end.y = Math.floor(Math.random() * (maxY - minY) + minY);
  }
}

export default Curve;
