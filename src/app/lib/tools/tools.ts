import { CircleTool } from './circle-tool.class';
import { PencilTool } from './pencil-tool.class';
import { PointTool } from './line-tool.class';
import { RectangleTool } from './rectangle-tool.class';
import { RedoTool } from './redo-tool.class';
import { Tool } from './tool.abstract';
import { EraserTool } from '@lib/tools/eraser-tool.class';
import { UndoTool } from './undo-tool.class';
import { UnselectableTool } from './unselectableTool.class';
import { TrashCanTool } from './trash-can-tool.class';

/** Tool informations type */
export type ToolMeta = { cls: typeof Tool, desc: string };
export type UnselectableToolMeta = { cls: typeof UnselectableTool; desc: string };

/** List of tools in which we can pick a name to define a new tool */
const toolNames = ['pencil', 'eraser', 'polygon-full', 'polygon-empty', 'point', 'line', 'circle', 'rectangle'] as const;
const nonSelectableToolNames = ['undo', 'redo', 'trash-can'] as const;
export type ToolName = typeof toolNames[number];
export type UnSelectableToolName = typeof nonSelectableToolNames[number];

/**
 * List of tools to be displayed within the main toolbar
 */
export const tools: ToolMeta[] = [
  { cls: PencilTool, desc: 'Icon button to draw a segment' },
  { cls: PointTool, desc: 'Icon button to draw a line' },
  { cls: RectangleTool, desc: 'Icon button to draw a rectangle' },
  { cls: CircleTool, desc: 'Icon button to draw a circle' },
  { cls: EraserTool, desc: 'Icon button to erase' }
];

/**
 * List of unselectableTools to be displayed within the main toolbar
 */
export const nonSelectableTools: UnselectableToolMeta[] = [
  { cls: UndoTool, desc: 'Icon button to undo action' },
  { cls: RedoTool, desc: 'Icon button to redo action' },
  { cls: TrashCanTool, desc: 'Icon button to trash all drawings' }
];
