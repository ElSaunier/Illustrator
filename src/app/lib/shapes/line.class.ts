import { Vec2 } from '@lib/vec2';
import { Shape } from './shape.abstract';

export class Line extends Shape {
  private TOLERANCE = 2;

  constructor(
    stroke: string,
    strokeWidth: number,
    public p1: Vec2,
    public p2: Vec2,
    uuid?: string
  ) {
    super(null, stroke, strokeWidth, uuid);
  }

  callback() {

  }

  public render(ctx: CanvasRenderingContext2D): void {
    ctx.strokeStyle = this.stroke as string;
    ctx.lineWidth = this.strokeWidth as number;
    ctx.beginPath();
    ctx.moveTo(this.p1.x, this.p1.y);
    ctx.lineTo(this.p2.x, this.p2.y);
    ctx.stroke();
  }

  isColliding(pos: Vec2): boolean {
    const slope = (this.p1.y - this.p2.y) / (this.p1.x - this.p2.x);
    const yIntercept = this.p2.y - slope * this.p2.x;
    const resultY = slope * pos.x + yIntercept;
    if (Math.abs(pos.y - resultY) <= this.TOLERANCE) {
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
      serializedShape.rpos,
      serializedShape.lpos,
      serializedShape.uuid
    );
    return shape;
  }
}