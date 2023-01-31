const drawModes = ['pencil', 'eraser', 'polygon-full', 'polygon-empty', 'point'] as const;

export type DrawMode = typeof drawModes[number];
export type Parameters = {
  fill: string,
  stroke: string,
  drawMode: DrawMode
};

export const defaultParameters: Parameters = {
  fill: 'yellow',
  stroke: 'red',
  drawMode: 'pencil'
};

