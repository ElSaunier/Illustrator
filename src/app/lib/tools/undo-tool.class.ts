/* eslint-disable @typescript-eslint/no-useless-constructor */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ActionStack } from '@lib/action-stacks/action-stack.class';
import { Action } from '@lib/actions/action.class';
import { Tool } from './tool.abstract';
import { ToolName, UnSelectableToolName } from './tools';
import { UnselectableTool } from './unselectableTool.class';

export class UndoTool extends UnselectableTool {
  static override toolName: UnSelectableToolName = 'undo';
  static override svgPath = '/assets/customSVG/undo.svg';

  override doClick(x: number, y: number, stack?: ActionStack): Action[] | null {
    const actions: Action[] = stack!.getStack();

    let lastNonPendingShownAction = null;

    let indice = stack!.getHeadPosition();
    while (indice > 0 && lastNonPendingShownAction == null) {
      if (!actions[indice].getPending() && actions[indice].getIsShowed()) {
        lastNonPendingShownAction = actions[indice];
      }
      indice--;
    }

    if (lastNonPendingShownAction == null) {
      return null;
    }

    lastNonPendingShownAction.setIsShowed(false);

    return null;
  }
}
