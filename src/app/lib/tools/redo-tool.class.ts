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

    stack?.redo();

    return null;
  }
}
