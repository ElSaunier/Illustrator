import { Action } from '@lib/actions/action.class';

export class ActionStack {
  private _stack: Action[] = [];
  private _headPosition = 0;

  do(action: Action) {
    if (this._stack.length - 1 !== this._headPosition) {
      this._stack = this.getActiveStack();
    }
    this._stack.push(action);
  }

  undo(): void {
    this._headPosition = Math.max(0, this._headPosition - 1);
  }

  redo(): void {
    this._headPosition = Math.min(this._stack.length - 1, this._headPosition + 1);
  }

  getActiveStack(): Action[] {
    return this._stack.slice(0, this._headPosition + 1);
  }

  getStack(): Action[] {
    return this._stack;
  }
}
