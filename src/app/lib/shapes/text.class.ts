import { Vec2 } from '@lib/vec2';
import { randomUuid } from '@lib/uuid';
import { Shape } from '@lib/interfaces/shape.interface';

export class Text implements Shape {
  public uuid: string;

  constructor(
    public stroke: string,
    public text: string,
    public pos: Vec2
  ) {

    this.uuid = randomUuid();
  }

  fill!: string;
  strokeWidth!: number;

  callback() {

  }

  public render(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = this.stroke;
    ctx.textAlign = 'center';
    ctx.fillText(this.text, this.pos.x, this.pos.y)
  }

  isColliding(pos: Vec2): boolean {
    throw new Error('Method not implemented.');
  }
}
