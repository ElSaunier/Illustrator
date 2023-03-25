/* eslint-disable @typescript-eslint/no-useless-constructor */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ActionStack } from '@lib/action-stacks/action-stack.class';
import { Action } from '@lib/actions/action.class';
import { Tool } from './tool.abstract';
import { ToolName, UnSelectableToolName } from './tools';
import { UnselectableTool } from './unselectableTool.class';

export class RedoTool extends UnselectableTool {
  static override toolName: UnSelectableToolName = 'redo';
  static override svgPath = '/assets/customSVG/redo.svg';

  constructor() {
    super();
  }

  override doClick(x: number, y: number, stack: ActionStack): Action[] | null {
    const actions: Action[] = stack!.getStack();

    let lastNonPendingNotShownAction = null;

    let indice = 0;
    while (indice <= stack.getHeadPosition() && lastNonPendingNotShownAction == null) {
      if (!actions[indice].getPending() && !actions[indice].getIsShowed()) {
        lastNonPendingNotShownAction = actions[indice];
      }
      indice++;
    }
    
    if (lastNonPendingNotShownAction == null) {
      return null;
    }

    lastNonPendingNotShownAction.setIsShowed(true);

    return null;
  }
}
