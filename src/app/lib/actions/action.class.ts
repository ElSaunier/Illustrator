import { Tool } from '@lib/tools/tool.abstract';
import { Shape } from '@lib/interfaces/shape.interface';
import { Vec2 } from '@lib/vec2';
import { EraserTool } from '@lib/tools/eraser-tool.class';
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
  constructor(protected x: number, protected y: number, protected shapes: Shape[], protected toolType: typeof Tool, protected isPending = true) {
  }

  /**
   * Tell if the action is deleted or not (used for the EraserTool)
   */
  protected isDeleted = false;
  /**
   * Action reference another existing action
   */
  protected refAction: Action | null = null;

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
  getShapes(): Shape[] {
    return this.shapes;
  }

  /**
   * @summary set a new list of shapes that the action is working on
   * @param shapes
   */
  setShapes(shapes: Shape[]) {
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

  /**
   * @param isDeleted set if the action is deleted or not
   */
  setIsDeletd(isDeleted: boolean) {
    this.isDeleted = isDeleted;
  }

  /**
   * @returns if the action is deleted or not
   */
  getIsDeleted() {
    return this.isDeleted;
  }

  /**
   * @returns the referenced action
   */
  getRefAction() {
    return this.refAction;
  }

  /**
   * @param refAction set the referenced action if any
   */
  setRefAction(refAction: Action) {
    this.refAction = refAction;
  }
}
