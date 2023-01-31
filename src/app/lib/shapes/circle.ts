import { Vec2 } from '@lib/vec2';
import { randomUuid } from '@lib/uuid';
import { Shape } from '@lib/interfaces/shape.interface';

export class Circle implements Shape {
  public uuid: string;

  constructor(
    public fill: string,
    public stroke: string,
    public strokeWidth: number,
    public rpos: Vec2,
    public radius: number) {

    this.uuid = randomUuid();
  }

  callback() {

  }

  public render(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.arc(this.rpos.x, this.rpos.y, this.radius, 0, 2 * Math.PI);
    if (this.fill === 'fill') {
      ctx.fillStyle = this.stroke;
      ctx.fill();
    }
    ctx.lineWidth = this.strokeWidth;
    ctx.strokeStyle = this.stroke;
    ctx.stroke()
  }
}
