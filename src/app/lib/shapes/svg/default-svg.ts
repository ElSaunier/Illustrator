import { Vec2 } from '@lib/vec2';
import { randomUuid } from '@lib/uuid';

export interface SvgShape {
  uuid: string;
  fill: string;
  stroke: string;
  strokeWidth: number;

  render(): string;
}

export class Circle implements SvgShape {
  public uuid: string;

  constructor(
    public fill: string,
    public stroke: string,
    public strokeWidth: number,
    public rpos: Vec2,
    public radius: number) {

    this.uuid = randomUuid();
  }

  render() {
    return `<circle class="svgElement" cx="${this.rpos.x}" cy="${this.rpos.y}" r="10" fill="${this.fill}" id="${this.uuid}" />`;
  }
}
