import { Circle } from "./shapes/circle";

const drawModes = ['pencil', 'eraser', 'polygon-full', 'polygon-empty', 'point', 'line'] as const;

export type DrawMode = typeof drawModes[number];
export type Parameters = {
  fill: string,
  stroke: string,
  drawMode: DrawMode,
  lastCircleSelected: Circle | null
};

export const defaultParameters: Parameters = {
  fill: 'yellow',
  stroke: 'red',
  drawMode: 'pencil',
  lastCircleSelected: null
};

