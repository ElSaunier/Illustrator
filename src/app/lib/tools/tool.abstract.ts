import { Action } from '@lib/actions/action.class';
import { ActionStack } from '@lib/action-stacks/action-stack.class';
import { ToolName } from './tools';
import { IToolConfiguration } from '@lib/tools/tool-configuration.interface';

export abstract class Tool {
  constructor(protected name: string, protected iconPath: string, protected config: IToolConfiguration) {
  }

  static toolName: ToolName;

  abstract doClick(x: number, y: number): Action[] | null;

  abstract doPress(x: number, y: number): Action[] | null;

  abstract doRelease(x: number, y: number, stack?: ActionStack): Action[] | null;

  abstract checkCompleted(stack: ActionStack): Action | null;

  configure(config: IToolConfiguration) {
    this.config = config;
  }
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
