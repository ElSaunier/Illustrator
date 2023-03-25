import { CircleTool } from './circle-tool.class';
import { PencilTool } from './pencil-tool.class';
import { PointTool } from './point-tool.class';
import { RectangleTool } from './rectangle-tool.class';
import { RedoTool } from './redo-tool.class';
import { Tool } from './tool.abstract';
import { UndoTool } from './undo-tool.class';
import { UnselectableTool } from './unselectableTool.class';

export type ToolMeta = { cls: typeof Tool; desc: string };
export type UnselectableToolMeta = { cls: typeof UnselectableTool; desc: string };

const toolNames = [
  'pencil',
  'eraser',
  'polygon-full',
  'polygon-empty',
  'point',
  'line',
  'circle',
  'rectangle'
] as const;
const nonSelectableToolNames = ['undo', 'redo'] as const;
export type ToolName = (typeof toolNames)[number];
export type UnSelectableToolName = (typeof nonSelectableToolNames)[number];

export const tools: ToolMeta[] = [
  { cls: PencilTool, desc: 'Icon button to draw a segment' },
  { cls: PointTool, desc: 'Icon button to draw a line' },
  { cls: RectangleTool, desc: 'Icon button to draw a rectangle' },
  { cls: CircleTool, desc: 'Icon button to draw a circle' }
];

export const nonSelectableTools: UnselectableToolMeta[] = [
  { cls: UndoTool, desc: 'Icon button to undo action' },
  { cls: RedoTool, desc: 'Icon button to redo action' }
];
