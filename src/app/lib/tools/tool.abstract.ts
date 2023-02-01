import { Action } from '@lib/actions/action.class';
import { ActionStack } from '@lib/action-stacks/action-stack.class';

export abstract class Tool {
  constructor(protected name: string, protected iconPath: string) {
  }

  abstract doClick(x: number, y: number): Action[] | null;

  abstract doPress(x: number, y: number): Action[] | null;

  abstract doRelease(x: number, y: number): Action[] | null;

  abstract checkCompleted(stack: ActionStack): Action | null;
}
