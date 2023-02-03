import { ActionStack } from '@lib/action-stacks/action-stack.class';
import { Action } from '@lib/actions/action.class';
import { Rect } from '@lib/shapes/rect';
import { IToolConfiguration } from './tool-configuration.interface';

import { Tool } from './tool.abstract';
import { ToolName } from './tools';

export class PolygonFullTool extends Tool {
  static override toolName: ToolName = 'polygon-full';
  static override svgPath = '../assets/customSVG/hexagonFull.svg';
  actionDone = 0;

  constructor() {
    const config: IToolConfiguration = {
      color: 'rgba(255,0,0,1)',
      thickness: 0,
      fill: true,
      fillColor: 'rgba(255,0,0,1)'
    };
    super(config);
  }

  doClick(x: number, y: number): Action[] | null {

    const rect = new Rect(
      this.config.fill ? this.config.color : 'transparent',
      this.config.color,
      this.config.thickness,
      { x, y },
      50,
      50
    );

    return [
      new Action(
        x,
        y,
        [rect],
        PolygonFullTool,
        true
      ),
    ];
  }

  doPress(x: number, y: number): Action[] | null {
    return null;
  }

  doRelease(x: number, y: number): Action[] | null {
    return null;
  }

  checkCompleted(stack: ActionStack): Action | null {
    return null;
  }
}
