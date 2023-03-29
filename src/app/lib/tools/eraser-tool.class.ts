import { ActionStack } from '@lib/action-stacks/action-stack.class';
import { Action } from '@lib/actions/action.class';
import { Circle } from '@lib/shapes/circle.class';
import { Line } from '@lib/shapes/line.class';
import { IToolConfiguration } from './tool-configuration.interface';
import { Tool } from './tool.abstract';
import { ToolName } from './tools';

export class EraserTool extends Tool {
  static override toolName: ToolName = 'eraser';
  static override svgPath = '/assets/customSVG/eraser.svg';

  constructor() {
    super();
    const config: IToolConfiguration = {
      color: 'rgba(255,255,255,1)',
      thickness: 5,
      fill: true,
      fillColor: 'rgba(255,255,255,1)',
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
      new Action(x, y, [new Circle('', '', 0, { x, y }, 0)], EraserTool, true),
    ];
  }

  override doRelease(x: number, y: number): Action[] | null {
    this.inTrace = false;
    return null;
  }

  override checkCompleted(stack: ActionStack): Action | null {
    const actions: Action[] = stack.getStack();

    if (actions.length < 2) {
      return null;
    }

    const lastAction: Action | null = this.getLastPendingEraserTool(actions);
    const beforeLastAction: Action | null =
      this.getBeforeLastPendingTool(actions);

    if (!lastAction || !beforeLastAction) {
      return null;
    }

    const newAction: Action = new Action(
      0,
      0,
      [
        new Line(
          this.config.color,
          this.config.thickness,
          beforeLastAction!.getCoordinates(),
          lastAction!.getCoordinates()
        ),
      ],
      EraserTool,
      false
    );

    beforeLastAction.setPending(false);

    if (!this.inTrace) {
      lastAction.setPending(false);
    }

    return newAction;
  }

  getLastPendingEraserTool(actions: Action[]) {
    for (let i = actions.length - 1; i >= 0; i--) {
      if (
        actions[i].getToolType() === EraserTool &&
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
        actions[i].getToolType() === EraserTool &&
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
}
