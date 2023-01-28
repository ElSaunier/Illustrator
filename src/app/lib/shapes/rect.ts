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
    if (this.fill !== 'transparent') {
      this.drawBorder(ctx);
      ctx.fillStyle = this.fill;
      ctx.fillRect(this.rpos.x, this.rpos.y, this.width, this.height);
    } else {
      ctx.strokeStyle = this.stroke;
      ctx.strokeRect(this.rpos.x, this.rpos.y, this.width, this.height);    
    }
  }

  public drawBorder(ctx: CanvasRenderingContext2D) {
    const thickness = 1;
    
    ctx.fillStyle = this.stroke;
    ctx.fillRect(this.rpos.x - thickness, this.rpos.y - thickness, this.width + thickness * 2, this.height + thickness * 2);
  }
}