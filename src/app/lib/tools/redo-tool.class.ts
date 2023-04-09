import { ActionStack } from '@lib/action-stacks/action-stack.class';
import { Action } from '@lib/actions/action.class';
import { UnSelectableToolName } from './tools';
import { UnselectableTool } from './unselectableTool.class';

export class RedoTool extends UnselectableTool {
  static override toolName: UnSelectableToolName = 'redo';
  static override svgPath = '/assets/customSVG/redo.svg';

  override doClick(x: number, y: number, stack: ActionStack): Action[] | null {
    stack.redo();
    return null;
  }
}
