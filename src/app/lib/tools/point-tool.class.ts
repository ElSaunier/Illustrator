import { ActionStack } from '@lib/action-stacks/action-stack.class';
import { Action } from '@lib/actions/action.class';
import { Circle } from '@lib/shapes/circle.class';
import { Line } from '@lib/shapes/line.class';

import { Tool } from './tool.abstract';
import { ToolName } from './tools';
import { IToolConfiguration } from '@lib/tools/tool-configuration.interface';
import { Text } from '@lib/shapes/text.class';

export class PointTool extends Tool {
  static override toolName: ToolName = 'point';
  static override svgPath = '/assets/customSVG/line.svg';

  actionDone = 0;

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

  override doClick(x: number, y: number, stack?: ActionStack): Action[] | null {
    this.actionDone++;

    if (stack !== undefined) {
      const actions = stack.getActiveStack();
      const action = actions.find(ac => ac.getShapes().find(s => s instanceof Circle && s.isColliding({ x, y })));
      if (action !== undefined) {
        const shape = action.getShapes().find(s => s instanceof Circle && s.isColliding({ x, y })) as Circle;
        if (shape !== undefined) {
          x = shape.rpos.x;
          y = shape.rpos.y;
        }
      }
    }

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

  override doPress(x: number, y: number): Action[] | null {
    return null;
  }

  override doRelease(x: number, y: number, stack?: ActionStack): Action[] | null {
    return null;
  }

  override doUnPress(x: number, y: number, stack?: ActionStack | undefined): Action[] | null {
    if (stack === undefined || this.actionDone < 1) {
      return null;
    }

    const actions: Action[] = stack!.getStack();

    if (actions.length < 1) {
      return null;
    }

    // Remove the last ghost shown line
    this.removeGhostElement(stack);

    const lastAction: Action = actions[stack.getHeadPosition()];

    if (lastAction.getToolType() !== PointTool && !lastAction.getPending()) {
      return null;
    }

    const coord1 = lastAction.getCoordinates();
    const distance = Math.sqrt(Math.pow(x - coord1.x, 2) + Math.pow(y - coord1.y, 2));

    const newAction = new Action(
      x,
      y,
      [
        new Line(
          'rgba(0,0,0,0.2)',
          this.config.thickness,
          lastAction.getCoordinates(),
          { x, y }
        ),
        new Text(
          'rgba(0,0,0,1)',
          distance.toFixed(1).toString(),
          { x: (x + coord1.x) / 2, y: (y + coord1.y) / 2 }
        )
      ],
      PointTool,
      true
    );

    return [newAction];
  }

  override checkCompleted(stack: ActionStack): Action | null {
    let actions = stack.getActiveStack();

    if (this.actionDone != 2) {
      return null;
    }

    this.removeGhostElement(stack);

    actions = stack.getActiveStack();

    const lastPoint: Action = actions[stack.getHeadPosition()];
    const firstPoint: Action = actions[stack.getHeadPosition() - 1];

    const firstShape = firstPoint.getShapes()[0] as Circle;
    const secondShape = lastPoint.getShapes()[0] as Circle;

    // Remove points
    stack.undo();
    stack.undo();

    const newAction = new Action(
      0,
      0,
      [
        new Circle(firstShape.fill, firstShape.stroke, firstShape.strokeWidth, firstShape.rpos, firstShape.radius),
        new Circle(secondShape.fill, secondShape.stroke, secondShape.strokeWidth, secondShape.rpos, secondShape.radius),
        new Line(
          this.config.color,
          this.config.thickness,
          firstPoint.getCoordinates(),
          lastPoint.getCoordinates()
        ),
      ],
      PointTool,
      false
    );

    this.actionDone = 0;

    return newAction;
  }

  override removeGhostElement(stack: ActionStack): void {
    const actions = stack.getActiveStack();
    const lastAction = actions[stack.getHeadPosition()];
    if (this.actionDone == 1 && lastAction.getToolType() === PointTool && lastAction.getPending() && lastAction.getShapes().find(shape => shape instanceof Line)) { // Point - Line
      stack.undo();
    } else if (this.actionDone == 2) { // Point - Line - Point
      const lastPoint = actions[stack.getHeadPosition()];
      stack.undo();
      stack.undo();
      stack.insert(lastPoint);
    }
  }
}
