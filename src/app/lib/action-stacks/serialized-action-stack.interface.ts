import { ISerializedAction } from '@lib/actions/serialized-action.interface';

export interface ISerializedActionStack {
  actions: ISerializedAction[],
  headPosition: number
}