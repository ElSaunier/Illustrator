import { ActionStack } from "@lib/action-stacks/action-stack.class";
import { Action } from "@lib/actions/action.class";
import { Circle } from "@lib/shapes/circle";
import { Line } from "@lib/shapes/line";
import { IToolConfiguration } from "./tool-configuration.interface";
import { Tool } from "./tool.abstract";

export class PencilTool extends Tool {

	constructor() {
		const config: IToolConfiguration = {
			color: 'rgba(0,0,0,1)',
			thickness: 1,
			fill: true,
			fillColor: 'rgba(0,0,0,1)'
		};
		super('pencil', '../assets/customSVG/pencil.svg', config);
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

	doRelease(x: number, y: number, stack?: ActionStack): Action[] | null {
		// Remove all pending PencilTool
		let actions = stack!.getStack();
		for (let i = 0; i < actions.length;) {
			if (actions[i].getToolType() === PencilTool && actions[i].getPending() === true) {
				actions.splice(i, 1);
			}
			else {
				i++;
			}
		}
		return null;
	}

	checkCompleted(stack: ActionStack): Action | null {

		const actions: Action[] = stack.getStack().reverse();

		if (actions.length < 2) {
			return null;
		}

		const lastAction: Action | null = this.getLastPendingPencilTool(actions);
		const beforeLastAction: Action | null = this.getBeforeLastPendingTool(actions);

		if (!lastAction || !beforeLastAction) {
			return null;
		}

		const newAction: Action = new Action(
			0,
			0,
			[new Line(
				this.config.color,
				this.config.thickness, beforeLastAction!.getCoordinates(), lastAction!.getCoordinates())],
			PencilTool,
			false
		);

		return newAction;
	}

	getLastPendingPencilTool(actions: Action[]) {
		for (let i = 0; i < actions.length; i++) {
			if (actions[i].getToolType() === PencilTool && actions[i].getPending() === true) {
				return actions[i];
			}
		}
		return null;
	}

	getBeforeLastPendingTool(actions: Action[]) {
		let alreadyFoundOne = false;
		for (let i = 0; i < actions.length; i++) {
			if (actions[i].getToolType() === PencilTool && actions[i].getPending() === true && alreadyFoundOne) {
				return actions[i];
			}
			else {
				alreadyFoundOne = true;
			}
		}
		return null;
	}
}