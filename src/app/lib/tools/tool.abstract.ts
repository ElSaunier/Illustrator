import { Action } from '@lib/actions/action.class';
import { ActionStack } from '@lib/action-stacks/action-stack.class';
import { ToolName } from './tools';
import { IToolConfiguration } from '@lib/tools/tool-configuration.interface';

export abstract class Tool {
  constructor(protected config: IToolConfiguration) {}

  static toolName: ToolName;
  static svgPath = '/assets/customSVG/hexagonFull.svg';

  abstract doClick(x: number, y: number): Action[] | null;

  abstract doPress(x: number, y: number): Action[] | null;

  abstract doRelease(x: number, y: number): Action[] | null;

  abstract checkCompleted(stack: ActionStack): Action | null;

  configure(config: IToolConfiguration) {
    this.config = config;
  }
}
