import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ActionStack } from '@lib/action-stacks/action-stack.class';
import { Shape } from '@lib/interfaces/shape.interface';
import { Circle } from '@lib/shapes/circle';
import { Line } from '@lib/shapes/line';
import { Rect } from '@lib/shapes/rect';
import { PointTool } from '@lib/tools/point-tool.class';
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

  // Mock
  tool: PointTool

  constructor(private elementsService: SvgElementsService, private storage: StorageService,
    private element: ElementRef<HTMLElement>, private stack: ActionStack) {
      // Mock
      this.tool = new PointTool()
     }

  ngAfterViewInit() {
    const elem = this.canvasElement.nativeElement;
    if (elem && elem.parentElement) {
      const rect = elem.parentElement.getBoundingClientRect();
      elem.width = rect.width;
      elem.height = rect.height;
    }

    let isMouseDown: Boolean = false;
    let lastPoint: Vec2 | null = null;

    this.canvasElement.nativeElement.addEventListener('click', event => this.handleClick(event));

    this.canvasElement.nativeElement.addEventListener('mousedown', event => {
      isMouseDown = true;
    });

    this.canvasElement.nativeElement.addEventListener('mouseup', event => {
      isMouseDown = false;
      lastPoint = null;
    });

    this.canvasElement.nativeElement.addEventListener('mousemove', event => {
      if (!isMouseDown) {
        return;
      }

      const { offsetX, offsetY } = event;
      const pos = { x: offsetX, y: offsetY };

      const drawMode = this.storage.get('drawMode');
      if (drawMode === 'pencil') {
        if (lastPoint !== null) {
          const drawMode = this.storage.get('drawMode');
          const canvas = this.element.nativeElement;

          const canvasWidth = canvas.getBoundingClientRect().width;
          const documentWidth = document.documentElement.clientWidth;
          const coef = canvasWidth / documentWidth;
          this.onAddLine({ x: lastPoint.x * coef, y: lastPoint.y }, { x: pos.x * coef, y: pos.y });
        }
        lastPoint = pos;
      }
    });

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

    if (drawMode !== 'eraser' && drawMode !== 'pencil' && drawMode !=='point') {
      this.onAddElement({ x: offsetX, y: offsetY });
    }

    // MockUp for now
    // In the future, we shouldn't need a if
    // Also, we shouldn't need to instantiate tool
    if (drawMode == 'point'){
      let curAction = this.tool.doClick(offsetX,offsetY);
      if (curAction){
        this.stack.do(curAction[0]);
        let shapes = curAction[0].getShapes()

        console.log("DRAWING ");
        shapes.forEach((shape) => {
          this.elementsService.add(shape);
        })

      }
      console.log(this.stack)

      let lastAction = this.tool.checkCompleted(this.stack);
      if (lastAction){
        let shapes = lastAction.getShapes();
        shapes.forEach((shape) => {
          this.elementsService.add(shape)
        })
      }
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
      case 'line':
        for (let i = 0; i < this.elementsService.getElements().length; i++) {
          let elem: Shape;
          if ((elem = this.elementsService.getElement(i)) instanceof Circle) {
            if (elem.isColliding(pos)) {
              if (this.storage.get('lastCircleSelected') === null) {
                this.storage.set('lastCircleSelected', elem);
              }
              else {
                if (elem !== this.storage.get('lastCircleSelected')) {
                  this.onAddLine(this.storage.get('lastCircleSelected')!.rpos, elem.rpos);
                  this.storage.set('lastCircleSelected', null);
                }
              }
            }
          }
        }
        break;
      default:
        console.error('DrawMode not found : ' + drawMode.toString());
    }
  }

  onAddLine(pos1: Vec2, pos2: Vec2) {
    const line = new Line(this.storage.get('stroke'), 0, pos1, pos2);
    this.elementsService.add(line);
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
