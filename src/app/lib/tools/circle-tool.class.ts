import { ActionStack } from '@lib/action-stacks/action-stack.class';
import { Action } from '@lib/actions/action.class';
import { Circle } from '@lib/shapes/circle.class';
import { Line } from '@lib/shapes/line.class';
import { Text } from '@lib/shapes/text.class';
import { IToolConfiguration } from './tool-configuration.interface';
import { Tool } from './tool.abstract';
import { ToolName } from './tools';

export class CircleTool extends Tool {
  static override toolName: ToolName = 'circle';
  static override svgPath = '/assets/customSVG/point.svg';

  constructor() {
    super();
    const config: IToolConfiguration = {
      color: 'rgba(0,0,0,1)',
      thickness: 1,
      fill: true,
      fillColor: 'rgba(0,0,0,1)',
    };
    this.configure(config);
  }

  nbrClick = 0;

  override doClick(x: number, y: number): Action[] | null {
    this.nbrClick++;
    return [
      new Action(x, y, [new Circle('', '', 0, { x, y }, 0)], CircleTool, true),
    ];
  }

  override doPress(x: number, y: number): Action[] | null {
    return null;
  }

  override doUnPress(x: number, y: number, stack?: ActionStack): Action[] | null {
    if (stack === undefined || this.nbrClick < 1) {
      return null;
    }

    const actions: Action[] = stack!.getStack();

    if (actions.length < 1) {
      return null;
    }

    const lastAction: Action = actions[stack.getHeadPosition()];

    if (lastAction.getToolType() !== CircleTool && !lastAction.getPending()) {
      return null;
    }

    // Remove the last ghost shown circle
    this.removeGhostElement(stack);

    // Show a ghost of the circle
    const coord1 = lastAction.getCoordinates();
    const distance = Math.sqrt(Math.pow(x - coord1.x, 2) + Math.pow(y - coord1.y, 2));

    const newAction = new Action(
      coord1.x,
      coord1.y,
      [
        new Circle(
          'fill',
          'rgba(0,0,0,0.2)',
          this.config.thickness,
          coord1,
          distance
        ),
        new Line(
          'rgba(0,0,0,0.2)',
          1,
          coord1,
          { x, y }
        ),
        new Text(
          'rgba(0,0,0,1)',
          distance.toFixed(1).toString(),
          { x: (x + coord1.x) / 2, y: (y + coord1.y) / 2 }
        )
      ],
      CircleTool,
      true
    );

    return [newAction];
  }

  override doRelease(x: number, y: number): Action[] | null {
    return null;
  }

  override checkCompleted(stack: ActionStack): Action | null {
    const actions: Action[] = stack.getStack();

    if (this.nbrClick < 2) {
      return null;
    }

    if (actions.length < 2) {
      return null;
    }

    const lastAction: Action = actions[stack.getHeadPosition()];
    const firstAction: Action = actions[stack.getHeadPosition() - 1];

    if (lastAction.getToolType() !== CircleTool && firstAction.getToolType() !== CircleTool) {
      return null;
    }
    if (!lastAction.getPending() || !firstAction.getPending()) {
      return null;
    }

    // Remove the last ghot shown circle
    this.removeGhostElement(stack);

    const coord1 = firstAction.getCoordinates();
    const coord2 = lastAction.getCoordinates();
    const distance = Math.sqrt(Math.pow(coord2.x - coord1.x, 2) + Math.pow(coord2.y - coord1.y, 2));

    const newAction = new Action(
      firstAction.getCoordinates().x,
      firstAction.getCoordinates().y,
      [
        new Circle(
          'fill',
          this.config.color,
          this.config.thickness,
          firstAction.getCoordinates(),
          distance
        )
      ],
      CircleTool,
      false
    );

    this.nbrClick = 0;

    return newAction;
  }

  override removeGhostElement(stack: ActionStack): void {
    let allAsbeenRemoved = false;
    const actions: Action[] = stack.getStack();
    while (!allAsbeenRemoved) {
      const lastAction: Action = actions[stack.getHeadPosition()];
      const beforeLastAction: Action = actions[stack.getHeadPosition() - 1];
      if (lastAction === undefined || beforeLastAction === undefined) {
        return;
      }
      if (beforeLastAction.getToolType() !== CircleTool || lastAction.getToolType() !== CircleTool) {
        allAsbeenRemoved = true;
        break;
      }
      if (!beforeLastAction.getPending() || !lastAction.getPending()) {
        allAsbeenRemoved = true;
        break;
      }
      stack.undo();
    }
  }
}
