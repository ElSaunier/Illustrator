import { Injectable } from '@angular/core';
import { IShape } from '@lib/shapes/shape.interface';
import { Tool } from '@lib/tools/tool.abstract';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export default class ShapeService {
  activeTool!: Tool;

  private elements: IShape[] = [];
  public pushElement$ = new Subject<IShape>();
  public deleteElement$ = new Subject<string>();

  public add(e: IShape) {
    this.elements.push(e);
    this.pushElement$.next(e);
  }

  public remove(uuid: string) {
    const element = this.elements.find(elem => elem.uuid === uuid);

    if (!element) {
      throw new Error(`Cannot delete element ${uuid}: does not exist`);
    }

    const index = this.elements.indexOf(element);
    this.elements.splice(index, 1);

    this.deleteElement$.next(uuid);
  }

  public getElement(index: number) {
    return this.elements[index];
  }

  public getElements() {
    return this.elements;
  }
}