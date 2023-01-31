import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Shape } from '@lib/interfaces/shape.interface';
import { Circle } from '@lib/shapes/circle';
import { Rect } from '@lib/shapes/rect';
import { Vec2 } from '@lib/vec2';
import { Rgba } from 'ngx-color-picker';
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
    private element: ElementRef<HTMLElement>) { }

  ngAfterViewInit() {
    const elem = this.canvasElement.nativeElement;
    if (elem && elem.parentElement) {
      const rect = elem.parentElement.getBoundingClientRect();
      elem.width = rect.width;
      elem.height = rect.height;
    }

    const isMousDown = false;

    this.canvasElement.nativeElement.addEventListener('click', event => this.handleClick(event));
    this.canvasElement.nativeElement.addEventListener('mousedown', event => this.handleMouseDown(event));
    this.canvasElement.nativeElement.addEventListener('mouseup', event => this.handleMouseUp(event));
    this.canvasElement.nativeElement.addEventListener('mousemove', event => this.handleMouseMove(event));

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

  handleMouseMove(event: MouseEvent) {

  }

  handleMouseUp(event: MouseEvent) {

  }

  handleMouseDown(event: MouseEvent) {

  }

  handleClick(event: MouseEvent) {
    const { offsetX, offsetY } = event;

    const drawMode = this.storage.get('drawMode');

    if (drawMode !== 'eraser' && drawMode !== 'pencil') {
      this.onAddElement({ x: offsetX, y: offsetY });
    }
  }


  onAddElement(ePos: Vec2) {
    const drawMode = this.storage.get('drawMode');
    const canvas = this.element.nativeElement;

    const canvasWidth = canvas.getBoundingClientRect().width;
    const documentWidth = document.documentElement.clientWidth;
    const coef = canvasWidth / documentWidth;

    const pos = { x: ePos.x * coef, y: ePos.y };

    if (canvas === null) {
      return;
    }

    switch (drawMode) {
      case 'polygon-empty':
        this.onAddPolygonEmpty(pos);
        break;
      case 'polygon-full':
        this.onAddPolygonFill(pos);
        break;
      case 'point':
        this.onAddPoint(pos);
        break;
      case 'pencil':
        const point = new Circle('fill', this.storage.get('stroke'), 0, pos, 1);
        this.elementsService.add(point);
        break;
      default:
        console.error('DrawMode not found : ' + drawMode.toString());
    }
  }

  onAddPoint(ePos: Vec2) {
    const stroke = this.storage.get('stroke');

    const radius = 5;

    const point = new Circle('fill', stroke, 0, ePos, radius);
    this.elementsService.add(point);
  }

  onAddPolygonFill(ePos: Vec2) {
    const stroke = this.storage.get('stroke');

    const width = 100;
    const height = 100;
    const rect = new Rect(this.storage.get('fill'), stroke, 0, ePos, width, height);
    this.elementsService.add(rect);
  }

  onAddPolygonEmpty(ePos: Vec2) {
    const stroke = this.storage.get('stroke');

    const width = 100;
    const height = 100;
    const rect = new Rect('transparent', stroke, 0, ePos, width, height);
    this.elementsService.add(rect);
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
