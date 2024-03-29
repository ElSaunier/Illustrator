import { ActionStack } from '@lib/action-stacks/action-stack.class';
import { Action } from '@lib/actions/action.class';
import { Circle } from '@lib/shapes/circle.class';
import { Tool } from './tool.abstract';
import { ToolName } from './tools';
import { Text } from '@lib/shapes/text.class';
import { Rect } from '@lib/shapes/rect.class';

export class RectangleTool extends Tool {
  static override toolName: ToolName = 'rectangle';
  static override svgPath = '/assets/customSVG/rectangle.svg';

  actionDone = 0;

  override doClick(x: number, y: number, stack?: ActionStack): Action[] | null {
    this.actionDone++;

    return [
      new Action(
        x,
        y,
        [
          new Circle(
            '',
            'rgba(255,255,255,0)',
            0,
            { x, y },
            0
          )
        ],
        RectangleTool,
        true
      ),
    ];
  }

  override doPress(x: number, y: number): Action[] | null {
    return null;
  }

  override doRelease(x: number, y: number, stack?: ActionStack): Action[] | null {
    return null;
  }

  override doUnPress(x: number, y: number, stack?: ActionStack | undefined): Action[] | null {
    // We cannot process the the unpress if this action is the first one. We need at least a first point
    if (this.actionDone != 1 || stack === undefined) {
      return null;
    }

    if (stack.getStack().length < 1) {
      this.actionDone = 0;
      return null;
    }

    // If we draw the rectangle, we first need to remove the ghost rectangle
    this.removeGhostElement(stack);

    const actions = stack.getActiveStack();

    const lastAction: Action = actions[stack.getHeadPosition()];
    // Check the last action is concerning the Rectangle and is not pending
    if (lastAction.getToolType() !== RectangleTool || !lastAction.getPending()) {
      return null;
    }

    // Draw the ghost rectangle with text informations
    const coord1 = lastAction.getCoordinates();
    const coord2 = { x, y };

    const distanceX = Math.abs(coord2.x - coord1.x);
    const distanceY = Math.abs(coord2.y - coord1.y);

    const newAction = new Action(
      0,
      0,
      [
        new Rect(
          'rgba(0,0,0,0.2)',
          'rgba(0,0,0,0.2)',
          this.config.thickness,
          coord1,
          coord2.x - coord1.x,
          coord2.y - coord1.y
        ),
        new Text(
          'rgba(0,0,0,1)',
          distanceX.toFixed(1).toString() + ' x ' + distanceY.toFixed(1).toString(),
          { x: (coord1.x + coord2.x) / 2, y: (coord1.y + coord2.y) / 2 }
        )
      ],
      RectangleTool,
      true
    );

    return [newAction];
  }

  override checkCompleted(stack: ActionStack): Action | null {
    if (this.actionDone < 2) {
      return null;
    }

    this.removeGhostElement(stack);

    const actions: Action[] = stack.getStack();

    if (actions.length < 2) {
      return null;
    }

    const lastAction: Action = actions[stack.getHeadPosition()];
    const beforeLastAction = actions[stack.getHeadPosition() - 1];

    const coord1 = lastAction.getCoordinates();
    const coord2 = beforeLastAction.getCoordinates();

    // Remove the last 2 actions to draw the rectangle
    this.removePendingActions(stack);

    const newAction = new Action(
      0,
      0,
      [
        new Rect(
          this.config.color,
          this.config.color,
          this.config.thickness,
          coord1,
          coord2.x - coord1.x,
          coord2.y - coord1.y
        )
      ],
      RectangleTool,
      false
    );

    this.actionDone = 0;

    return newAction;
  }

  override removeGhostElement(stack: ActionStack): void {
    const actions = stack.getActiveStack();
    const lastAction = actions[stack.getHeadPosition()];
    if (this.actionDone == 1 && lastAction.getToolType() === RectangleTool && lastAction.getPending() && lastAction.getShapes().find(shape => shape instanceof Rect)) { // Point - Ghost
      stack.undo();
    } else if (this.actionDone == 2) { // Point - Ghost - Point
      const lastPoint = actions[stack.getHeadPosition()];
      stack.undo();
      stack.undo();
      stack.insert(lastPoint);
    }
  }
}
