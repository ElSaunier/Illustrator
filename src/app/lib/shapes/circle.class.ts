import { Vec2 } from '@lib/vec2';
import { Shape } from './shape.abstract';

export class Circle extends Shape {
  constructor(
    fill: string,
    stroke: string,
    strokeWidth: number,
    public pos: Vec2,
    public radius: number,
    uuid?: string
  ) {
    super(fill, stroke, strokeWidth, uuid);
  }

  public render(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    // Draw the circle
    ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);

    // Fill the circle ?
    if (this.fill === 'fill') {
      ctx.fillStyle = this.stroke as string;
      ctx.fill();
    }
    ctx.lineWidth = this.strokeWidth as number;
    ctx.strokeStyle = this.stroke as string;
    ctx.stroke();
  }

  isColliding(pos: Vec2): boolean {
    // Compute the distance between pos and this.pos
    const distX: number = pos.x - this.pos.x;
    const distY: number = pos.y - this.pos.y;
    const distance: number = Math.sqrt((distX * distX) + (distY * distY));

    // pos is colliding with the circle if it between the center and the radius.
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
      pos: this.pos,
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
