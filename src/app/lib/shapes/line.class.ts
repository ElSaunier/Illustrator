import { Vec2 } from '@lib/vec2';
import { Shape } from './shape.abstract';

export class Line extends Shape {
  private TOLERANCE = 2;
  private a: number; // a in the ax + b equation
  private b: number; // b in the ax + b equation

  constructor(
    stroke: string,
    strokeWidth: number,
    public p1: Vec2,
    public p2: Vec2,
    uuid?: string
  ) {
    super(null, stroke, strokeWidth, uuid);

    this.a = (this.p1.y - this.p2.y) / (this.p1.x - this.p2.x);
    this.b = this.p2.y - this.a * this.p2.x;
  }

  callback() {

  }

  public render(ctx: CanvasRenderingContext2D): void {
    ctx.strokeStyle = this.stroke as string;
    ctx.lineWidth = this.strokeWidth as number;
    ctx.beginPath();
    ctx.moveTo(this.p1.x, this.p1.y); // Move the context to the first point
    ctx.lineTo(this.p2.x, this.p2.y); // Build a line from the first point to the second one
    ctx.stroke(); // Draw the line
  }

  isColliding(testingPos: Vec2): boolean {
    const resultY = this.a * testingPos.x + this.b; // Compute y for pos.x on the line

    // If the computed y is equal to testingPos.y, then the point is on the line
    if (Math.abs(testingPos.y - resultY) <= this.TOLERANCE) {
      return true;
    }
    return false;
  }

  serialize() {
    return {
      uuid: this.uuid,
      type: this.constructor.name,
      stroke: this.stroke,
      strokeWidth: this.strokeWidth,
      p1: this.p1,
      p2: this.p2
    };
  }

  static parse(serializedShape: any): Shape {
    const shape = new Line(
      serializedShape.stroke,
      serializedShape.strokeWidth,
      serializedShape.p1,
      serializedShape.p2,
      serializedShape.uuid
    );
    return shape;
  }
}