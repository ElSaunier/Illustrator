import { ActionStack } from '@lib/action-stacks/action-stack.class';
import { Action } from '@lib/actions/action.class';
import { Rect } from '@lib/shapes/rect.class';
import { Tool } from './tool.abstract';
import { ToolName } from './tools';

export class PolygonFullTool extends Tool {
  static override toolName: ToolName = 'polygon-full';
  static override svgPath = '/assets/customSVG/hexagonFull.svg';

  actionDone = 0;

  override doClick(x: number, y: number): Action[] | null {

    const rect = new Rect(
      this.config.fill ? this.config.color : 'transparent',
      this.config.color,
      this.config.thickness,
      { x, y },
      50,
      50
    );

    return [
      new Action(
        x,
        y,
        [rect],
        PolygonFullTool,
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

  override checkCompleted(stack: ActionStack): Action | null {
    return null;
  }
}
