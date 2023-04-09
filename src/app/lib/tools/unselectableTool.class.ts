import { ActionStack } from '@lib/action-stacks/action-stack.class';
import { Action } from '@lib/actions/action.class';
import { UnSelectableToolName } from './tools';
import { ToolWrapper } from './toolWrapper.class';

export class UnselectableTool implements ToolWrapper {
  public static toolName: UnSelectableToolName;
  static svgPath: string;

  doClick(x: number, y: number, stack?: ActionStack | undefined): Action[] | null {
    throw new Error('Method not implemented.');
  }
}