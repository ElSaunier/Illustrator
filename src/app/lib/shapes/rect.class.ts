import { Shape } from '@lib/shapes/shape.abstract';
import { Vec2 } from '../vec2';

export class Rect extends Shape {
  minX: number;
  maxX: number;

  minY: number;
  maxY: number;

  constructor(
    fill: string,
    stroke: string,
    strokeWidth: number,
    public pos: Vec2,
    public width: number,
    public height: number,
    uuid?: string
  ) {
    super(fill, stroke, strokeWidth, uuid);


    // Compute the rect corners
    this.minX = Math.min(this.pos.x, this.pos.x + this.width);
    this.maxX = Math.max(this.pos.x, this.pos.x + this.width);
    this.minY = Math.min(this.pos.y, this.pos.y + this.height);
    this.maxY = Math.max(this.pos.y, this.pos.y + this.height);
  }

  public render(ctx: CanvasRenderingContext2D) {
    if (this.fill === 'none') {
      ctx.strokeStyle = this.stroke as string;
      ctx.strokeRect(this.pos.x, this.pos.y, this.width, this.height);
    } else {
      ctx.fillStyle = this.fill as string;
      ctx.strokeStyle = this.stroke as string;
      ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    }
  }

  isColliding(pos: Vec2): boolean {

    // Check the testing point is between each corner
    if (pos.x >= this.minX && pos.x <= this.maxX && pos.y >= this.minY && pos.y <= this.maxY) {
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
      width: this.width,
      height: this.height
    };
  }

  static parse(serializedShape: any) {

    const shape = new Rect(
      serializedShape.fill,
      serializedShape.stroke,
      serializedShape.strokeWidth,
      serializedShape.pos,
      serializedShape.width,
      serializedShape.height,
      serializedShape.uuid
    );
    return shape;
  }
}