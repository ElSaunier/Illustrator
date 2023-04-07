import { Shape } from '@lib/shapes/shape.abstract';
import { Vec2 } from '../vec2';

export class Rect extends Shape {
  constructor(
    fill: string,
    stroke: string,
    strokeWidth: number,
    public rpos: Vec2,
    public width: number,
    public height: number,
    uuid?: string
  ) {
    super(fill, stroke, strokeWidth, uuid);
  }

  public render(ctx: CanvasRenderingContext2D) {
    if (this.fill === 'none') {
      ctx.strokeStyle = this.stroke as string;
      ctx.strokeRect(this.rpos.x, this.rpos.y, this.width, this.height);
    } else {
      ctx.fillStyle = this.fill as string;
      ctx.strokeStyle = this.stroke as string;
      ctx.fillRect(this.rpos.x, this.rpos.y, this.width, this.height);
    }
  }

  isColliding(pos: Vec2): boolean {
    const minX = Math.min(this.rpos.x, this.rpos.x + this.width);
    const maxX = Math.max(this.rpos.x, this.rpos.x + this.width);
    const minY = Math.min(this.rpos.y, this.rpos.y + this.height);
    const maxY = Math.max(this.rpos.y, this.rpos.y + this.height);
    if (pos.x >= minX && pos.x <= maxX && pos.y >= minY && pos.y <= maxY) {
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
      width: this.width,
      height: this.height
    };
  }

  static parse(serializedShape: any) {
    const shape = new Rect(
      serializedShape.fill,
      serializedShape.stroke,
      serializedShape.strokeWidth,
      serializedShape.rpos,
      serializedShape.width,
      serializedShape.height,
      serializedShape.uuid
    );
    return shape;
  }
}