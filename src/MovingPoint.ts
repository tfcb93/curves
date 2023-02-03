class MovingPoint {
  private x: number;
  private y: number;
  private positions: Array<[number, number]>;

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.positions = [];
    this.addPosition(x, y);
  }

  drawPoint(ctx: CanvasRenderingContext2D) {
    // ctx!.fillStyle = "white";
    ctx!.strokeStyle = "white";
    // ctx?.arc(this.x, this.y, 1, 0, 2 * Math.PI);
    ctx?.bezierCurveTo(100, 100, 200, 200, this.x, this.y);
    // ctx?.fill();
    ctx?.stroke();
    this.addPosition(this.x + 1, this.y + 1);
  }

  getLastPosition() {
    const lastTuple: number = this.positions.length - 1;
    return this.positions[lastTuple];
  }

  addPosition(x: number, y: number) {
    this.positions = [...this.positions, [x, y]];
    this.changePositions(x, y);
  }

  changePositions(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

export default MovingPoint;
