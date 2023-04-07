import { Tool } from '@lib/tools/tool.abstract';

export interface ISerializedAction {
  x: number,
  y: number,
  shapes: object[],
  toolType: typeof Tool,
  isPending: boolean,
}