import { Vec2 } from '@lib/vec2';
import { Shape } from './shape.abstract';

export class Circle extends Shape {
  constructor(
    fill: string,
    stroke: string,
    strokeWidth: number,
    public rpos: Vec2,
    public radius: number,
    uuid?: string
  ) {
    super(fill, stroke, strokeWidth, uuid);
  }

  callback() {

  }

  public render(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.arc(this.rpos.x, this.rpos.y, this.radius, 0, 2 * Math.PI);
    if (this.fill === 'fill') {
      ctx.fillStyle = this.stroke as string;
      ctx.fill();
    }
    ctx.lineWidth = this.strokeWidth as number;
    ctx.strokeStyle = this.stroke as string;
    ctx.stroke();
  }

  isColliding(pos: Vec2): boolean {
    const distX: number = pos.x - this.rpos.x;
    const distY: number = pos.y - this.rpos.y;
    const distance: number = Math.sqrt((distX * distX) + (distY * distY));
    if (distance <= this.radius) {
      return true;
    }
    return false;
  }

  serialize() {
    return {
      uuid: this.uuid,
      type: this.constructor.name,
      fill: this.fill,
      stroke: this.stroke,
      strokeWidth: this.strokeWidth,
      rpos: this.rpos,
      radius: this.radius
    };
  }

  static parse(serializedShape: any): Shape {
    const shape = new Circle(
      serializedShape.fill,
      serializedShape.stroke,
      serializedShape.strokeWidth,
      serializedShape.rpos,
      serializedShape.radius,
      serializedShape.uuid
    );
    return shape;
  }
}
