import { Vec2 } from '@lib/vec2';
import { randomUuid } from '@lib/uuid';
import { IShape } from '@lib/shapes/shape.interface';

export class Text implements IShape {
  public uuid: string;

  constructor(
    public stroke: string,
    public text: string,
    public pos: Vec2,
    uuid?: string
  ) {

    this.uuid = uuid ?? randomUuid();
  }

  fill!: string;
  strokeWidth!: number;

  callback() {

  }

  public render(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = this.stroke;
    ctx.textAlign = 'center';
    ctx.fillText(this.text, this.pos.x, this.pos.y);
  }

  isColliding(pos: Vec2): boolean {
    throw new Error('Method not implemented.');
  }

  serialize() {
    return {
      stroke: this.stroke,
      text: this.text,
      pos: this.pos,
      uuid: this.uuid
    };
  }

  parse(serializedShape: any): Text {
    const shape = new Text(
      serializedShape.stroke,
      serializedShape.text,
      serializedShape.pos,
      serializedShape.uuid
    );

    return shape;
  }
}
