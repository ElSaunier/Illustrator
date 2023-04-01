import { Action } from '@lib/actions/action.class';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ActionStack {
  /** The action stack is represented by an array of actions */
  private _stack: Action[] = [];
  /** The position of the pointed stack top */
  private _headPosition = -1;

  /**
   * @summary Insert a new action atop the stack and update the stack head postion.
   * @param action
   * 
   */
  insert(action: Action): void {
    if (!action.getPending() && this._stack.length >= 0) {
      // Remove all actions which is not pending
      let index = 0;
      while (index < this._stack.length) {
        if (this._stack[index].getPending()) {
          this.removeAction(index);
        } else {
          index++;
        }
      }
    }
    if (this._stack.length - 1 !== this._headPosition) {
      this._stack = this.getActiveStack();
    }
    this._stack.push(action);
    this._headPosition++;
  }

  /**
   * @summary move to the previous action within the stack
   */
  undo(): void {
    this._headPosition = Math.max(-1, this._headPosition - 1);
  }

  /**
   * @summary move to the next action within the stack
   */
  redo(): void {
    this._headPosition = Math.min(this._stack.length - 1, this._headPosition + 1);
  }

  /**
   * 
   * @returns the action stack with the head position as the top of the stack
   */
  getActiveStack(): Action[] {
    return this._stack.slice(0, this._headPosition + 1);
  }

  /** @return the complete stack */
  getStack(): Action[] {
    return this._stack;
  }

  /**
   * 
   * @returns the head position
   */
  getHeadPosition(): number {
    return this._headPosition;
  }

  /**
   * @summary reset the stack actions
   */
  resetStackActions(): void {
    this._stack = [];
    this._headPosition = -1;
  }

  /**
   * @summary remove element at index x
   * @param index index to remove from stack
   */
  removeAction(index: number): void {
    if (this._stack.length <= index || index < 0) {
      return;
    }
    this._stack.splice(index, 1);
    this._headPosition--;
  }
}
