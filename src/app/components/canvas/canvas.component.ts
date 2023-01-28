import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Shape } from '@lib/interfaces/shape.interface';
import { Rect } from '@lib/shapes/rect';
import { Vec2 } from '@lib/vec2';
import { StorageService } from 'src/app/services/storage.service';
import SvgElementsService from 'src/app/services/svg-elements.service';

@Component({
  selector: 'ill-app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements AfterViewInit {
  @ViewChild('canvas') canvasElement!: ElementRef<HTMLCanvasElement>;

  constructor(private elementsService: SvgElementsService, private storage: StorageService,
    private element: ElementRef<HTMLElement>) {}

  ngAfterViewInit() {
    const elem = this.canvasElement.nativeElement;
    if (elem && elem.parentElement) {
      const rect = elem.parentElement.getBoundingClientRect();
      elem.width = rect.width;
      elem.height = rect.height;
    }
    
    this.canvasElement.nativeElement.addEventListener('click', event => this.handleClick(event));

    this.initSubscriptions();
  }

  initSubscriptions() {
    this.elementsService.pushElement$.subscribe(elem => this._drawElement(elem));
    // this.elementsService.deleteElement$.subscribe(eUuid => this._eraseElement(eUuid));
  }

  _drawElement(e: Shape) {
    const ctxt = this.canvasElement.nativeElement.getContext('2d');

    if (ctxt) {
      e.render(ctxt);
    }
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
    const { offsetX, offsetY } = event;

    const drawMode = this.storage.get('drawMode');

    if (drawMode !== 'eraser') {
      this.onAddElement({ x: offsetX, y: offsetY });
    }
  }


  onAddElement(ePos: Vec2) {
    const { x, y } = ePos;

    const fill = this.storage.get('drawMode') === 'polygon-empty'
      ? 'transparent'
      : this.storage.get('fill');
    const stroke = this.storage.get('stroke');

    const canvas = this.element.nativeElement;
    if (canvas) {
      const canvasWidth = canvas.getBoundingClientRect().width;
      const documentWidth = document.documentElement.clientWidth;
      const coef = canvasWidth / documentWidth;

      const width = 100;
      const height = 100;
      const rect = new Rect(fill, stroke, 0,  { x: x * coef, y }, width, height);
      this.elementsService.add(rect);
    }
  }

  onRemoveElement(ePos: Vec2) {
    // const elements = document.elementsFromPoint(ePos.x, ePos.y)
    //   .filter(elem => elem.classList.contains('svgElement'));

    // if (elements.length > 0) {
    //   const uuid = elements[0].id;

    //   this.elementsService.remove(uuid);
    // }
  }
}
