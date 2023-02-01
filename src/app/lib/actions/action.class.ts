import { Tool } from '@lib/tools/tool.abstract';

export class Action {
  protected isPending = true;
  protected shapes = [];

  constructor(protected _toolType: typeof Tool) {
  }
}
