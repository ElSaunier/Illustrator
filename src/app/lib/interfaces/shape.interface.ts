export interface Shape {
  uuid: string;
  fill: string;
  stroke: string;
  strokeWidth: number;

  render(ctx: CanvasRenderingContext2D): void;
}