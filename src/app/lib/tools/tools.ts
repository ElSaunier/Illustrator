import { CircleTool } from './circle-tool.class';
import { PencilTool } from './pencil-tool.class';
import { PointTool } from './point-tool.class';
import { PolygonFullTool } from './polygon-full-tool.class';
import { Tool } from './tool.abstract';

export type ToolMeta = { cls: typeof Tool, desc: string };

const toolNames = ['pencil', 'eraser', 'polygon-full', 'polygon-empty', 'point', 'line', 'circle'] as const;
export type ToolName = typeof toolNames[number];

export const tools: ToolMeta[] = [
  { cls: PencilTool, desc: 'Icon button to draw a segment' },
  { cls: PointTool, desc: 'Icon button to draw a line' },
  { cls: PolygonFullTool, desc: 'Icon button to draw a rectangle' },
  { cls: CircleTool, desc: 'Icon button to draw a circle' }
];
