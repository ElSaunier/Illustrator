import { SvgShape } from './default-svg';
import { randomUuid } from '../../uuid';
import { Vec2 } from '../../vec2';

export class Rect implements SvgShape {
  public uuid: string;

  constructor(
    public fill: string,
    public stroke: string,
    public strokeWidth: number,
    public rpos: Vec2,
    public width: number,
    public height: number) {

    this.uuid = randomUuid();

    this.rpos.x -= 0.5 * this.width;
    this.rpos.y -= 0.5 * this.height;

  }

  render() {
    return `<rect class="svgElement" fill="${this.fill}" stroke="${this.stroke}" x="${this.rpos.x}" y="${this.rpos.y}" width="${this.width}" height="${this.height}" id="${this.uuid}"/>`;
  }
}