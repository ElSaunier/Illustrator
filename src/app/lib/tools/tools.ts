import { PointTool } from './point-tool.class';
import { PolygonFullTool } from './polygon-full-tool.class';
import { PencilTool, Tool } from './tool.abstract';

export type ToolMeta = { cls: typeof Tool, desc: string };

const toolNames = ['pencil', 'eraser', 'polygon-full', 'polygon-empty', 'point', 'line'] as const;
export type ToolName = typeof toolNames[number];

export const tools: ToolMeta[] = [
  { cls: PencilTool, desc: 'Icon button to draw a segment' },
  { cls: PointTool, desc: 'Icon button to draw a point' },
  { cls: PolygonFullTool, desc: 'Icon button to draw a rectangle' },
];
