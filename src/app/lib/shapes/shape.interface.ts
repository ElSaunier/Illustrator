import { Vec2 } from '@lib/vec2';
export interface IShape {
  /** the unique id of the shape */
  uuid: string;

  /** Fill color (rgb, hexadecimal) */
  fill: string;

  /** Stroke color (rgb, hexadecimal)*/
  stroke: string;

  /** Stroke width, in px*/
  strokeWidth: number;

  /**
   * @summary draw the shape within a canvas context
   */
  render(context: CanvasRenderingContext2D): void;

  /**
   * @returns true if the pos is inside the concerning shape.
   * @param pos
   */
  isColliding(pos: Vec2): boolean;

  serialize(): object
}