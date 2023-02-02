import { Action } from '@lib/actions/action.class';
import { ActionStack } from '@lib/action-stacks/action-stack.class';
import { ToolName } from './tools';

export abstract class Tool {
  constructor(protected name: string, protected iconPath: string) {
  }

  static toolName: ToolName;

  abstract doClick(x: number, y: number): Action[] | null;

  abstract doPress(x: number, y: number): Action[] | null;

  abstract doRelease(x: number, y: number): Action[] | null;

  abstract checkCompleted(stack: ActionStack): Action | null;
}

export class PencilTool extends Tool {
  static override toolName: ToolName = 'pencil';

  override doClick(x: number, y: number): Action[] | null {
    throw new Error('Method not implemented.');
  }
  override doPress(x: number, y: number): Action[] | null {
    throw new Error('Method not implemented.');
  }
  override doRelease(x: number, y: number): Action[] | null {
    throw new Error('Method not implemented.');
  }
  override checkCompleted(stack: ActionStack): Action | null {
    throw new Error('Method not implemented.');
  }
}
