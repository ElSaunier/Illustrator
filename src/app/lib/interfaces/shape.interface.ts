import { Vec2 } from "@lib/vec2";

export interface Shape {
  uuid: string;
  fill: string;
  stroke: string;
  strokeWidth: number;

  render(ctx: CanvasRenderingContext2D): void;
  isColliding(pos: Vec2): Boolean;
}