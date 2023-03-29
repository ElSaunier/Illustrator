import { ActionStack } from '@lib/action-stacks/action-stack.class';
import { Action } from '@lib/actions/action.class';
import { Circle } from '@lib/shapes/circle.class';
import { Line } from '@lib/shapes/line.class';
import { IToolConfiguration } from './tool-configuration.interface';
import { Tool } from './tool.abstract';
import { ToolName } from './tools';

export class EraserTool extends Tool {
  static override toolName: ToolName = 'eraser';
  static override svgPath = '/assets/customSVG/eraser.svg';

  constructor() {
    super();
    const config: IToolConfiguration = {
      color: 'rgba(255,255,255,1)',
      thickness: 5,
      fill: true,
      fillColor: 'rgba(255,255,255,1)',
    };
    this.configure(config);
  }

  override doPress(x: number, y: number, stack: ActionStack): Action[] | null {
    // TODO
    return null;
  }
}
