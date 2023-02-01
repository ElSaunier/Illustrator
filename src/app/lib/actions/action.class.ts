import { Tool } from '@lib/tools/tool.abstract';
import { Shape } from '@lib/interfaces/shape.interface';

export class Action {
  constructor(protected x: number, protected y: number, protected shapes: Shape[], protected toolType: typeof Tool, protected isPending = true) {
  }

  getPending(): boolean {
    return this.isPending;
  }

  setPending(isPending: boolean) {
    this.isPending = isPending;
  }

  getCoordinates(): { x: number, y: number } {
    return { x: this.x, y: this.y };
  }

  setCoordinates(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  getShapes(): Shape[] {
    return this.shapes;
  }

  setShapes(shapes: Shape[]) {
    this.shapes = shapes;
  }

  getToolType(): typeof Tool {
    return this.toolType;
  }

  setToolType(toolType: typeof Tool) {
    this.toolType = toolType;
  }
}
