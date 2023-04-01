import { ActionStack } from '@lib/action-stacks/action-stack.class';
import { Action } from '@lib/actions/action.class';
import { UnSelectableToolName } from './tools';
import { UnselectableTool } from './unselectableTool.class';

export class UndoTool extends UnselectableTool {
  static override toolName: UnSelectableToolName = 'undo';
  static override svgPath = '/assets/customSVG/undo.svg';

  override doClick(x: number, y: number, stack?: ActionStack): Action[] | null {
    if (stack === undefined) {
      return null;
    }
    
    stack.undo();

    return null;
  }
}
