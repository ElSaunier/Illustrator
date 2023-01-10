import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SvgShape } from '@lib/shapes/svg/default-svg';

@Injectable({
  providedIn: 'root'
})
export default class SvgElementsService {
  private elements: SvgShape[] = [];
  public pushElement$ = new Subject<SvgShape>();
  public deleteElement$ = new Subject<string>();

  public add(e: SvgShape) {
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