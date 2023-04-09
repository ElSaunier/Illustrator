import { ActionStack } from '@lib/action-stacks/action-stack.class';
import { Action } from '@lib/actions/action.class';
import { UnSelectableToolName } from './tools';
import { UnselectableTool } from './unselectableTool.class';

export class TrashCanTool extends UnselectableTool {
  static override toolName: UnSelectableToolName = 'trash-can';
  static override svgPath = '/assets/customSVG/trash-can.svg';

  override doClick(x: number, y: number, stack: ActionStack): Action[] | null {
    if (confirm('Do yout really want to clear all the drawings ?')) {
      stack.resetStackActions();
    }
    return null;
  }
}
