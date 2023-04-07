import { Shape } from '@lib/interfaces/shape.interface';
import { randomUuid } from '../uuid';
import { Vec2 } from '../vec2';

export class Rect implements Shape {
  public uuid: string;

  constructor(
    public fill: string,
    public stroke: string,
    public strokeWidth: number,
    public pos: Vec2,
    public width: number,
    public height: number) {

    this.uuid = randomUuid();
  }

  public render(ctx: CanvasRenderingContext2D) {
    if (this.fill === 'none') {
      ctx.strokeStyle = this.stroke;
      ctx.strokeRect(this.pos.x, this.pos.y, this.width, this.height);
    } else {
      ctx.fillStyle = this.fill;
      ctx.strokeStyle = this.stroke;
      ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    }
  }

  isColliding(pos: Vec2): boolean {
    const minX = Math.min(this.pos.x, this.pos.x + this.width);
    const maxX = Math.max(this.pos.x, this.pos.x + this.width);
    const minY = Math.min(this.pos.y, this.pos.y + this.height);
    const maxY = Math.max(this.pos.y, this.pos.y + this.height);
    if (pos.x >= minX && pos.x <= maxX && pos.y >= minY && pos.y <= maxY) {
      return true;
    }
    return false;
  }
}