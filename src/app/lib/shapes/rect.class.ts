import { IShape } from '@lib/shapes/shape.interface';
import { randomUuid } from '../uuid';
import { Vec2 } from '../vec2';

export class Rect implements IShape {
  public uuid: string;

  constructor(
    public fill: string,
    public stroke: string,
    public strokeWidth: number,
    public rpos: Vec2,
    public width: number,
    public height: number) {

    this.uuid = randomUuid();

    // this.rpos.x -= 0.5 * this.width;
    // this.rpos.y -= 0.5 * this.height;

  }

  public render(ctx: CanvasRenderingContext2D) {
    if (this.fill === 'none') {
      ctx.strokeStyle = this.stroke;
      ctx.strokeRect(this.rpos.x, this.rpos.y, this.width, this.height);
    } else {
      ctx.fillStyle = this.fill;
      ctx.strokeStyle = this.stroke;
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
      fill: this.fill,
      stroke: this.stroke,
      strokeWidth: this.strokeWidth,
      rpos: this.rpos,
      width: this.width,
      heigth: this.height
    };
  }
}