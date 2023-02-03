import { ActionStack } from '@lib/action-stacks/action-stack.class';
import { Action } from '@lib/actions/action.class';
import { Circle } from '@lib/shapes/circle';
import { Line } from '@lib/shapes/line';

import { Tool } from './tool.abstract';
import { ToolName } from './tools';

export class PointTool extends Tool {
  static override toolName: ToolName = 'point';
  actionDone : number = 0;

  constructor() {
    super('point', '../assets/customSVG/point.svg');
  }

  doClick(x: number, y: number): Action[] | null {
    this.actionDone ++;
    return [
      new Action(
        x,
        y,
        [new Circle('fill', '', 1, { x, y }, 5)],
        PointTool,
        true
      ),
    ];
  }

  doPress(x: number, y: number): Action[] | null {
    return null;
  }

  doRelease(x: number, y: number): Action[] | null {
    return null;
  }

  checkCompleted(stack: ActionStack): Action | null {
    let actions = stack.getStack();

    console.log(this.actionDone)

    if (this.actionDone != 2) {
      console.log('Here');
      return null;
    }

    console.log('Drawing line');
    // Can replace by headposition
    let lastAction: Action = actions[actions.length -1];
    let firstAction: Action = actions[actions.length - 2];

    let newAction = new Action(
      0,
      0,
      [
        new Line(
          'rgba(0,0,0,1)',
          1,
          firstAction.getCoordinates(),
          lastAction.getCoordinates()
        ),
      ],
      PointTool,
      false
    );

    this.actionDone = 0;

    return newAction;
  }
}
