import { ActionStack } from '@lib/action-stacks/action-stack.class';
import { Action } from '@lib/actions/action.class';
import { ToolName, UnSelectableToolName } from './tools';

export class ToolWrapper {
  public static toolName: ToolName | UnSelectableToolName;
  static svgPath: string;

  doClick(x: number, y: number, stack?: ActionStack): Action[] | null {
    throw new Error('Method not implemented.');
  }
}