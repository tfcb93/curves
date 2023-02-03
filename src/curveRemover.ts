class Remover {
  private points: Array<Array<number>>;
  private bgColor;
  constructor(color) {
    this.points = [];
    this.bgColor = color;
  }

  draw(ctx) {
    ctx?.beginPath();
    ctx!.strokeStyle = this.bgColor;
    const startPoint = this.points[0];
    const endPoint = this.points[1];
    ctx?.moveTo(startPoint[0], startPoint[1]);
    ctx?.lineTo(endPoint[0], endPoint[1]);
    this.points = [...this.points.slice(0, 1), ...this.points.slice(2)];
    ctx?.stroke();
  }

  addPoint(x: number, y: number) {
    this.points = [...this.points, [x, y]];
  }
}

export default Remover;
