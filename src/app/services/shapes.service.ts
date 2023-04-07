import { Injectable } from '@angular/core';
import { Shape } from '@lib/shapes/shape.abstract';
import { Tool } from '@lib/tools/tool.abstract';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export default class ShapeService {
  activeTool!: Tool;

  private elements: Shape[] = [];
  public elements$ = new Subject<Shape[]>();
  public pushElement$ = new Subject<Shape>();
  public deleteElement$ = new Subject<string>();

  public add(e: Shape) {
    this.elements.push(e);
    this.pushElement$.next(e);
  }

  public remove(uuid: string | undefined) {
    if (!uuid) return;

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

  updateElements(shapes: Shape[]) {
    this.elements = shapes;
    this.elements$.next(this.elements);
  }
}