import { ActionStack } from '@lib/action-stacks/action-stack.class';
import { Action } from '@lib/actions/action.class';
import { Rect } from '@lib/shapes/rect';

import { Tool } from './tool.abstract';
import { ToolName } from './tools';

export class PolygonFullTool extends Tool {
  static override toolName: ToolName = 'polygon-full';
  actionDone : number = 0;

  constructor() {
    super('polygon-full', '../assets/customSVG/hexagonFull.svg');
  }

  doClick(x: number, y: number): Action[] | null {
    return [
      new Action(
        x,
        y,
        [new Rect('fill', '', 1, { x, y }, 50, 50)],
        PolygonFullTool,
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
    return null;
  }
}
