import { Action } from '@lib/actions/action.class';
import { ActionStack } from '@lib/action-stacks/action-stack.class';
import { ToolName, UnSelectableToolName } from './tools';
import { IToolConfiguration } from '@lib/tools/tool-configuration.interface';
import { ToolWrapper } from './toolWrapper.class';

export class Tool implements ToolWrapper {
  protected config!: IToolConfiguration;

  public static toolName: ToolName;
  static svgPath = '/assets/customSVG/hexagonFull.svg';

  doClick(x: number, y: number, stack?: ActionStack): Action[] | null {
    return null;
  }

  doPress(x: number, y: number, stack?: ActionStack): Action[] | null {
    return null;
  }

  doRelease(x: number, y: number, stack?: ActionStack): Action[] | null {
    return null;
  }

  checkCompleted(stack: ActionStack): Action | null {
    return null;
  }

  configure(config: IToolConfiguration) {
    this.config = config;
  }

  doUnPress(x: number, y: number, stack?: ActionStack): Action[] | null {
    return null;
  }
}
