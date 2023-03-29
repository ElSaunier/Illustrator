import { Tool } from '@lib/tools/tool.abstract';
import { IShape } from '@lib/shapes/shape.interface';
import { Vec2 } from '@lib/vec2';
import { ISerializedAction } from './serialized-action.interface';
/**
 * An action which can be triggered by a tool
 */
export class Action {
  /**
   *
   * @param x the x position of the event
   * @param y the y position of the event
   * @param shapes a list of shapes the action is adding
   * @param toolType the type of tool which triggered the action
   * @param isPending Default value is true. Is the action finished ? Updated by the tool most of the time.
   */
  constructor(protected x: number, protected y: number, protected shapes: IShape[], protected toolType: typeof Tool, protected isPending = true, protected isShowed = true) {
  }

  /**
   *
   * @returns a boolean to know if the action is finished or not.
   */
  getPending(): boolean {
    return this.isPending;
  }

  /**
   * @summary updates the pending state of the action
   * @param isPending
   */
  setPending(isPending: boolean) {
    this.isPending = isPending;
  }

  /**
   *
   * @returns the coordinates where the action takes/took place
   */
  getCoordinates(): Vec2 {
    return { x: this.x, y: this.y };
  }

  /**
   * @summary update the coordinates where the action takes/took place
   * @param x
   * @param y
   */
  setCoordinates(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  /**
   *
   * @returns the list of shapes added by the action
   */
  getShapes(): IShape[] {
    return this.shapes;
  }

  /**
   * @summary set a new list of shapes that the action is working on
   * @param shapes
   */
  setIShapes(shapes: IShape[]) {
    this.shapes = shapes;
  }

  /**
   *
   * @returns the type of the tool that the action has been triggered by
   */
  getToolType(): typeof Tool {
    return this.toolType;
  }

  /**
   * @summary update the type of tool which triggers the action
   * @param toolType
   */
  setToolType(toolType: typeof Tool) {
    this.toolType = toolType;
  }

  getIsShowed() {
    return this.isShowed;
  }

  setIsShowed(isShowed: boolean) {
    this.isShowed = isShowed;
  }

  serialize(): ISerializedAction {
    return {
      x: this.x,
      y: this.y,
      shapes: this.shapes.map(s => s.serialize()),
      toolType: this.toolType,
      isPending: this.isPending,
      isShowed: this.isShowed
    };
  }
}
