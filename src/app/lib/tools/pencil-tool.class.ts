import { ActionStack } from '@lib/action-stacks/action-stack.class';
import { Action } from '@lib/actions/action.class';
import { Line } from '@lib/shapes/line.class';
import { Tool } from './tool.abstract';
import { ToolName } from './tools';

export class PencilTool extends Tool {
  static override toolName: ToolName = 'pencil';
  static override svgPath = '/assets/customSVG/pencil.svg';

  inTrace = false;

  override doClick(x: number, y: number): Action[] | null {
    return null;
  }

  override doPress(x: number, y: number): Action[] | null {
    this.inTrace = true;
    return [
      new Action(x, y, [], PencilTool, true),
    ];
  }

  override doRelease(x: number, y: number, stack: ActionStack): Action[] | null {
    this.inTrace = false;
    const lastAction: Action | null = this.getLastPendingPencilTool(stack.getActiveStack());
    lastAction?.setPending(false);
    return null;
  }

  override checkCompleted(stack: ActionStack): Action | null {
    const actions: Action[] = stack.getActiveStack();

    if (actions.length < 2 || !this.inTrace) {
      return null;
    }

    // Get the last action and the one before it, concerning the pencil tool
    const lastAction: Action | null = this.getLastPendingPencilTool(actions);
    const displayedAction: Action | null =
      this.getBeforeLastPendingTool(actions);

    if (!lastAction) {
      return null;
    }

    // If we only have one action, we build a new one, corresponding to the new hand draw parcel
    if (!displayedAction) {
      const newAction = new Action(
        lastAction.getCoordinates().x,
        lastAction.getCoordinates().y,
        [],
        PencilTool,
        true
      );

      return newAction;
    }

    // Draw a new line for the new built action
    displayedAction?.getShapes().push(new Line(
      this.config.color,
      this.config.thickness,
      displayedAction.getCoordinates(),
      lastAction?.getCoordinates()
    ));

    displayedAction.setCoordinates(lastAction.getCoordinates().x, lastAction.getCoordinates().y);

    this.removeTemporaryElement(stack);

    return null;
  }

  getLastPendingPencilTool(actions: Action[]) {
    // Loop through the actions to find the most recent one which concerns the pencil tool
    for (let i = actions.length - 1; i >= 0; i--) {
      if (
        actions[i].getToolType() === PencilTool &&
        actions[i].getPending() === true
      ) {
        return actions[i];
      }
    }
    return null;
  }

  getBeforeLastPendingTool(actions: Action[]) {
    let alreadyFoundOne = false;
    // Loop through the actions to find the one before the most recent one which concerns the pencil tool
    for (let i = actions.length - 1; i >= 0; i--) {
      if (
        actions[i].getToolType() === PencilTool &&
        actions[i].getPending() === true &&
        alreadyFoundOne
      ) {
        return actions[i];
      } else {
        alreadyFoundOne = true;
      }
    }
    return null;
  }

  removeTemporaryElement(stack: ActionStack) {
    // Remove the intermediate actions concerning the pencil tool to build a standalone one
    for (let i = stack.getStack().length - 1; i >= 0;) {
      if (
        stack.getStack()[i].getToolType() === PencilTool &&
        stack.getStack()[i].getPending() === true &&
        stack.getStack()[i].getShapes().length == 0
      ) {
        stack.removeAction(i);
        i -= 2;
      } else {
        i--;
      }
    }
    return null;
  }
}
