import { Vec2 } from '@lib/vec2';
import { Shape } from './shape.abstract';

export class Text extends Shape {
  constructor(
    stroke: string,
    public text: string,
    public pos: Vec2,
    uuid?: string
  ) {
    super(null, stroke, null, uuid);
  }

  callback() {

  }

  public render(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = this.stroke as string;
    ctx.textAlign = 'center';
    ctx.fillText(this.text, this.pos.x, this.pos.y);
  }

  isColliding(pos: Vec2): boolean {
    throw new Error('Method not implemented.');
  }

  serialize() {
    return {
      uuid: this.uuid,
      type: this.constructor.name,
      stroke: this.stroke,
      text: this.text,
      pos: this.pos
    };
  }

  static parse(serializedShape: any): Text {
    const shape = new Text(
      serializedShape.stroke,
      serializedShape.text,
      serializedShape.pos,
      serializedShape.uuid
    );

    return shape;
  }
}
