import { Vec2 } from '@lib/vec2';
import { randomUuid } from '@lib/uuid';
import { Shape } from '@lib/interfaces/shape.interface';

export class Line implements Shape {
	public uuid: string;

	constructor(
		public stroke: string,
		public strokeWidth: number,
		public rpos: Vec2,
		public lpos: Vec2) {

		this.uuid = randomUuid();
	}
	fill!: string;

	callback() {

	}

	public render(ctx: CanvasRenderingContext2D): void {
		ctx.beginPath();
		ctx.moveTo(this.rpos.x, this.rpos.y);
		ctx.lineTo(this.lpos.x, this.lpos.y);
		ctx.stroke();
	}

	isColliding(pos: Vec2): Boolean {
		throw new Error('Method not implemented.');
	}
}
