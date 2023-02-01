import { ActionStack } from "@lib/action-stacks/action-stack.class";
import { Action } from "@lib/actions/action.class";
import { Circle } from "@lib/shapes/circle";
import { Line } from "@lib/shapes/line";
import { Tool } from "./tool.abstract";

export class PointTool extends Tool {

    constructor() {
        super('point','../assets/customSVG/point.svg');
    }

    doClick(x: number, y: number): Action[] | null {
        return [new Action(x,y,
            [new Circle('fill','',1,{x,y}, 1)],
            PointTool,
            true
            )]
    }

    doPress(x: number, y: number): Action[] | null {
        return null;
    }

    doRelease(x: number, y: number): Action[] | null {
        return null;
    }

    checkCompleted(stack: ActionStack): Action | null {
        return null;
        /*
        let lastAction:Action = stack._stack[stack._headPosition];
        let firstAction:Action= stack._stack[stack.headPosition-1];

        let newAction = new Action(0,0,
            [new Line('',1,firstAction.getCoordinates(),lastAction.getCoordinates())],
            PointTool,
            false)

        stack.do(newAction);

        return newAction;
        */
    }

}