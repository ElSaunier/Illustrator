import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Circle, SvgShape } from '@lib/shapes/svg/default-svg';
import { Vec2 } from '@lib/vec2';
import { Rect } from 'src/app/lib/shapes/svg/rect-svg';
import { StorageService } from 'src/app/services/storage.service';
import SvgElementsService from 'src/app/services/svg-elements.service';

@Component({
  selector: 'ill-app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements AfterViewInit {
  @ViewChild('canvas') canvasElement!: ElementRef<SVGElement>;

  constructor(private elementsService: SvgElementsService, private storage: StorageService) {}

  ngAfterViewInit() {
    this.canvasElement.nativeElement.addEventListener('click', event => this.handleClick(event));

    this.initSubscriptions();
  }

  initSubscriptions() {
    this.elementsService.pushElement$.subscribe(elem => this._drawElement(elem));

    this.elementsService.deleteElement$.subscribe(eUuid => this._eraseElement(eUuid));
  }

  _drawElement(e: SvgShape) {
    const render = e.render();

    const element = this.canvasElement.nativeElement;
    element.insertAdjacentHTML('beforeend', render);
  }

  _eraseElement(eUuid: string) {
    const canvas = this.canvasElement.nativeElement as unknown as HTMLElement;

    const elements = canvas.getElementsByClassName('svgElement');
    for (const element in elements) {
      const e = elements[element];
      if (e.id === eUuid) {
        e.remove();

        return;
      }
    }
  }

  handleClick(event: MouseEvent) {
    const { clientX, clientY } = event;

    const drawMode = this.storage.get('drawMode');

    if (drawMode !== 'eraser') {
      this.onAddElement({ x: clientX, y: clientY });
    } else {
      this.onRemoveElement({ x: clientX, y: clientY });
    }
  }


  onAddElement(ePos: Vec2) {
    const clientX = ePos.x;
    const clientY = ePos.y;
    const { x, y } = this.canvasElement.nativeElement.getBoundingClientRect();

    const fill = this.storage.get('drawMode') === 'polygon-empty'
      ? 'transparent'
      : this.storage.get('fill');
    const stroke = this.storage.get('stroke');

    
    const width = 30;
    const height = 20;
    const rect = new Rect(fill, stroke, 0,  { x: clientX - x, y: clientY - y }, width, height);
    this.elementsService.add(rect);
  }

  onRemoveElement(ePos: Vec2) {
    const elements = document.elementsFromPoint(ePos.x, ePos.y)
      .filter(elem => elem.classList.contains('svgElement'));

    if (elements.length > 0) {
      const uuid = elements[0].id;

      this.elementsService.remove(uuid);
    }
  }
}
