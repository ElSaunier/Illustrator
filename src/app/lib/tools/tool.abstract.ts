import { Action } from '@lib/actions/action.class';
import { ActionStack } from '@lib/action-stacks/action-stack.class';
import { IToolConfiguration } from '@lib/tools/tool-configuration.interface';

export abstract class Tool {
  constructor(protected name: string, protected iconPath: string, protected config: IToolConfiguration) {
  }

  abstract doClick(x: number, y: number): Action[] | null;

  abstract doPress(x: number, y: number): Action[] | null;

  abstract doRelease(x: number, y: number): Action[] | null;

  abstract checkCompleted(stack: ActionStack): Action | null;

  configure(config: IToolConfiguration) {
    this.config = config;
  }
}
