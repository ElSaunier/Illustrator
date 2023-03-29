import { Circle } from './shapes/circle.class';
import { IToolConfiguration } from './tools/tool-configuration.interface';
import { ToolName } from './tools/tools';

export type Parameters = {
  fill: string,
  stroke: string,
  config: IToolConfiguration,
  toolName: ToolName,
  lastCircleSelected: Circle | null
};

export const defaultParameters: Parameters = {
  fill: 'yellow',
  stroke: 'red',
  toolName: 'pencil',
  config: {
    color:'#000000',
    thickness: 1,
    fill: true,
    fillColor: 'rgba(0,0,0,1)'
  },
  lastCircleSelected: null
};
