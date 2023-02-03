import { ActionStack } from "@lib/action-stacks/action-stack.class";
import { Action } from "@lib/actions/action.class";
import { Circle } from "@lib/shapes/circle";
import { Line } from "@lib/shapes/line";
import { IToolConfiguration } from "./tool-configuration.interface";
import { Tool } from "./tool.abstract";

export class PencilTool extends Tool {

	constructor() {
		super('pencil', '../assets/customSVG/pencil.svg');
	}

	doClick(x: number, y: number): Action[] | null {
		return null;
	}

	doPress(x: number, y: number): Action[] | null {
		return [
			new Action(
				x,
				y,
				[new Circle('', '', 0, { x, y }, 0)],
				PencilTool,
				true
			)
		]
	}

	doRelease(x: number, y: number): Action[] | null {
		return [
			new Action(
				x,
				y,
				[new Circle('', '', 0, { x, y }, 0)],
				PencilTool,
				true
			)
		]
	}

	checkCompleted(stack: ActionStack): Action | null {

		const actions = stack.getStack();
		console.log(actions);

		if (actions.length != 2) {
			return null;
		}

		const lastAction: Action = actions[actions.length - 1];
		const beforeLastAction: Action = actions[actions.length - 2];

		const newAction: Action = new Action(
			0,
			0,
			[new Line('rgba(0,0,0,1)', 1, beforeLastAction.getCoordinates(), lastAction.getCoordinates())],
			PencilTool,
			false
		);

		return newAction;
	}
}