import { ActionStack } from '@lib/action-stacks/action-stack.class';
import { Action } from '@lib/actions/action.class';
import { Circle } from '@lib/shapes/circle.class';
import { Line } from '@lib/shapes/line.class';
import { IToolConfiguration } from './tool-configuration.interface';
import { Tool } from './tool.abstract';
import { ToolName } from './tools';

export class PencilTool extends Tool {
  static override toolName: ToolName = 'pencil';
  static override svgPath = '/assets/customSVG/pencil.svg';

  constructor() {
    super();
    const config: IToolConfiguration = {
      color: 'rgba(0,0,0,1)',
      thickness: 1,
      fill: true,
      fillColor: 'rgba(0,0,0,1)',
    };
    this.configure(config);
  }

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

    const lastAction: Action | null = this.getLastPendingPencilTool(actions);
    const displayedAction: Action | null =
      this.getBeforeLastPendingTool(actions);

    if (!lastAction) {
      return null;
    }

    if (!displayedAction) {
      const newAction = new Action(
        lastAction.getCoordinates().x,
        lastAction.getCoordinates().y,
        [],
        PencilTool,
        true,
        true
      );

      return newAction;
    }

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
