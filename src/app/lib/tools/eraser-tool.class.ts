import { ActionStack } from '@lib/action-stacks/action-stack.class';
import { Action } from '@lib/actions/action.class';
import { Circle } from '@lib/shapes/circle.class';
import { Tool } from './tool.abstract';
import { ToolName } from './tools';

export class EraserTool extends Tool {
  static override toolName: ToolName = 'eraser';
  static override svgPath = '/assets/customSVG/eraser.svg';

  constructor() {
    super();
  }

  override doClick(x: number, y: number, stack?: ActionStack | undefined): Action[] | null {
    return this.processSuppression(x, y, stack);
  }

  override doPress(x: number, y: number, stack?: ActionStack | undefined): Action[] | null {
    return this.processSuppression(x, y, stack);
  }

  processSuppression(x: number, y: number, stack?: ActionStack | undefined): Action[] | null {
    if (stack === undefined) {
      return null;
    }
    
    const actions = stack.getActiveStack();

    let action = undefined;

    for (let i = actions.length - 1; i >= 0 && action === undefined; i--) {
      if (actions[i].getShapes().find(s => s.isColliding({ x: x, y: y })) !== undefined) {
        action = actions[i];
      }
    }

    if (action === undefined) {
      return null;
    }
    
    action.setIsDeletd(true);

    const newAction = new Action(
      x,
      y,
      [],
      EraserTool,
      false
    );

    newAction.setRefAction(action);

    return [newAction];
  }
}