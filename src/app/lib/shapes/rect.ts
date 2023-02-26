import { Shape } from '@lib/interfaces/shape.interface';
import { randomUuid } from '../uuid';
import { Vec2 } from '../vec2';

export class Rect implements Shape {
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
    }
    else {
      ctx.fillStyle = this.fill;
      ctx.strokeStyle = this.stroke;
      ctx.fillRect(this.rpos.x, this.rpos.y, this.width, this.height);
    }
  }

  isColliding(pos: Vec2): Boolean {
    throw new Error('Method not implemented.');
  }
}