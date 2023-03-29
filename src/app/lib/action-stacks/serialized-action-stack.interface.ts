import { ISerializedAction } from '@lib/actions/serialize-action.interface';

export interface ISerializedActionStack {
  stack: ISerializedAction[],
  headPosition: number
}