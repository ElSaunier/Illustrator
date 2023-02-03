import { ActionStack } from '@lib/action-stacks/action-stack.class';
import { Action } from '@lib/actions/action.class';
import { Circle } from '@lib/shapes/circle';
import { Line } from '@lib/shapes/line';

import { Tool } from './tool.abstract';
import { ToolName } from './tools';
import { IToolConfiguration } from '@lib/tools/tool-configuration.interface';

export class PointTool extends Tool {
  static override toolName: ToolName = 'point';
  static override svgPath = '../assets/customSVG/point.svg';
  
  actionDone = 0;

  constructor() {
    const config: IToolConfiguration = {
      color: 'rgba(255,0,0,1)',
      thickness: 1,
      fill: true,
      fillColor: 'rgba(255,0,0,1)'
    };
    super(config);
  }

  doClick(x: number, y: number): Action[] | null {
    this.actionDone++;

    const startCircle = new Circle(
      this.config.fill ? 'fill' : '',
      this.config.color,
      this.config.thickness,
      { x, y },
      this.config.thickness * 5
    );
    return [
      new Action(
        x,
        y,
        [startCircle],
        PointTool,
        true
      ),
    ];
  }

  doPress(x: number, y: number): Action[] | null {
    return null;
  }

  doRelease(x: number, y: number, stack?: ActionStack): Action[] | null {
    return null;
  }

  checkCompleted(stack: ActionStack): Action | null {
    const actions = stack.getActiveStack();

    if (this.actionDone != 2) {
      return null;
    }

    const lastAction: Action = actions[stack.getHeadPosition()];
    const firstAction: Action = actions[stack.getHeadPosition() - 1];

    const newAction = new Action(
      0,
      0,
      [
        new Line(
          this.config.color,
          this.config.thickness,
          firstAction.getCoordinates(),
          lastAction.getCoordinates()
        ),
      ],
      PointTool,
      false
    );

    this.actionDone = 0;

    return newAction;
  }
}
