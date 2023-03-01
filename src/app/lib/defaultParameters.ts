import { Circle } from './shapes/circle.class';
import { ToolName } from './tools/tools';

export type Parameters = {
  fill: string,
  stroke: string,
  toolName: ToolName,
  lastCircleSelected: Circle | null
};

export const defaultParameters: Parameters = {
  fill: 'yellow',
  stroke: 'red',
  toolName: 'pencil',
  lastCircleSelected: null
};
