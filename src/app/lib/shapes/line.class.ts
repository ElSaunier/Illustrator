import { Vec2 } from '@lib/vec2';
import { randomUuid } from '@lib/uuid';
import { Shape } from '@lib/interfaces/shape.interface';

export class Line implements Shape {
  public uuid: string;

  private TOLERANCE = 1;

  constructor(
    public stroke: string,
    public strokeWidth: number,
    public rpos: Vec2,
    public lpos: Vec2) {

    this.uuid = randomUuid();
  }

  fill!: string;

  callback() {

  }

  public render(ctx: CanvasRenderingContext2D): void {
    ctx.strokeStyle = this.stroke;
    ctx.lineWidth = this.strokeWidth;
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
}
