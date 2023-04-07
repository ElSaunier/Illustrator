import { Vec2 } from '@lib/vec2';
import { randomUuid } from '../uuid';

export abstract class Shape {
  public uuid?: string;

  constructor(
    /** Fill color (rgb, hexadecimal) */
    public fill: string | null,
    /** Stroke color (rgb, hexadecimal)*/
    public stroke: string | null,
    /** Stroke width, in px*/
    public strokeWidth: number | null,
    /** the unique id of the shape */
    uuid?: string,
  ) {
    this.uuid = uuid ?? randomUuid();
  }

  /**
   * @summary draw the shape within a canvas context
   */
  abstract render(context: CanvasRenderingContext2D): void;

  /**
   * @returns true if the pos is inside the concerning shape.
   * @param pos
   */
  abstract isColliding(pos: Vec2): boolean;

  /**
   * @summary Serialize the object
   * @returns A serialized version of the Shape object
   */
  abstract serialize(): object;
}