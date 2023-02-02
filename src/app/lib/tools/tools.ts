import { PointTool } from './point-tool.class';
import { PencilTool, Tool } from './tool.abstract';

export type ToolMeta = { svgPath: string, cls: typeof Tool, desc: string };

const toolNames = ['pencil', 'eraser', 'polygon-full', 'polygon-empty', 'point', 'line'] as const;
export type ToolName = typeof toolNames[number];

export const tools: ToolMeta[] = [
  { svgPath: '../assets/customSVG/pencil.svg', cls: PencilTool, desc: 'Icon button to draw a segment' },
  { svgPath: '../assets/customSVG/point.svg', cls: PointTool, desc: 'Icon button to draw a point' },
];
