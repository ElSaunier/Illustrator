import { Vec2 } from '@lib/vec2';
import { Shape } from './shape.abstract';

export class Line extends Shape {
  private TOLERANCE = 2;

  constructor(
    stroke: string,
    strokeWidth: number,
    public rpos: Vec2,
    public lpos: Vec2,
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
    ctx.moveTo(this.rpos.x, this.rpos.y);
    ctx.lineTo(this.lpos.x, this.lpos.y);
    ctx.stroke();
  }

  isColliding(pos: Vec2): boolean {
    const slope = (this.rpos.y - this.lpos.y) / (this.rpos.x - this.lpos.x);
    const yIntercept = this.lpos.y - slope * this.lpos.x;
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
      rpos: this.rpos,
      lpos: this.lpos
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