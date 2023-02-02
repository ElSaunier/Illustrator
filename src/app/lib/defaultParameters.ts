import { Circle } from './shapes/circle';
import { ToolName, tools } from './tools/tools';

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

type TestType = typeof tools[number]['cls']['toolName'];

class ClassA {
  static sharedAttribute: string = 'A' as const;
}

class ClassB {
  static sharedAttribute: string = 'B';
}

type SharedAttributeType = typeof ClassA.sharedAttribute | typeof ClassB.sharedAttribute;

const sharedAttributeValue: SharedAttributeType = 'C';