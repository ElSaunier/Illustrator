import { Tool } from '@lib/tools/tool.abstract';
import { Vec2 } from '@lib/vec2';
import { ISerializedAction } from './serialized-action.interface';
import { Shape } from '@lib/shapes/shape.abstract';
import { Rect } from '@lib/shapes/rect.class';
import { Circle } from '@lib/shapes/circle.class';
import { Text } from '@lib/shapes/text.class';
import { Line } from '@lib/shapes/line.class';
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

  /**
   * Parse a serialized Action
   * @param serializedAction A serialized action
   * @returns An instantiated action
   */
  static parse(serializedAction: ISerializedAction): Action {
    let shapes = serializedAction.shapes.map(serializedShape => {
      return this._parseShape(serializedShape);
    });
    shapes = shapes.filter(shape => shape != null);

    const action = new Action(
      serializedAction.x,
      serializedAction.y,
      shapes as Shape[],
      serializedAction.toolType,
      serializedAction.isPending
    );

    return action;
  }

  /**
   * Parse a serialized Shape
   * @param serializedShape A serialized Shape
   * @returns An instantiated shape
   */
  private static _parseShape(serializedShape: any): Shape | null {
    switch (serializedShape?.type) {
      case 'Rect':
        return Rect.parse(serializedShape);
      case 'Circle':
        return Circle.parse(serializedShape);
      case 'Text':
        return Text.parse(serializedShape);
      case 'Line':
        return Line.parse(serializedShape);
      default:
        return null;
    }
  }

  /**
   * Serialize the action
   * @returns A serialized Action
   */
  serialize(): ISerializedAction {
    return {
      x: this.x,
      y: this.y,
      shapes: this.shapes.map(s => s.serialize()),
      toolType: this.toolType,
      isPending: this.isPending,
    };
  }
}
