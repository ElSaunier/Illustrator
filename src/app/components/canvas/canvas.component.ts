import { AfterViewInit, Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import { ActionStack } from '@lib/action-stacks/action-stack.class';
import { ISerializedCanva } from '@lib/serialized-canva.interface';
import { IShape } from '@lib/shapes/shape.interface';
import { Circle } from '@lib/shapes/circle.class';
import { Line } from '@lib/shapes/line.class';
import { Rect } from '@lib/shapes/rect.class';
import { UndoTool } from '@lib/tools/undo-tool.class';
import { Vec2 } from '@lib/vec2';
import ShapeService from 'src/app/services/shapes.service';
import { StorageService } from 'src/app/services/storage.service';
import { exportState } from '@lib/utils';

@Component({
  selector: 'ill-app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements AfterViewInit {
  @ViewChild('canvas') canvasElement!: ElementRef<HTMLCanvasElement>;

  constructor(private shapeService: ShapeService, private storage: StorageService,
    private element: ElementRef<HTMLElement>, private stack: ActionStack) {
  }

  ngAfterViewInit() {
    const shape = this.canvasElement.nativeElement;
    if (shape && shape.parentElement) {
      const rect = shape.parentElement.getBoundingClientRect();
      shape.width = rect.width;
      shape.height = rect.height;
    }

    let isMouseDown = false;

    this.canvasElement.nativeElement.addEventListener('click', event => this.handleClick(event));

    this.canvasElement.nativeElement.addEventListener('mousedown', () => {
      isMouseDown = true;
    });

    this.canvasElement.nativeElement.addEventListener('mouseup', event => {
      isMouseDown = false;
      this.handleMouseRelease(event);
    });

    this.canvasElement.nativeElement.addEventListener('mousemove', event => {
      if (!isMouseDown) {
        this.handleMouseMoveWhenUnClicked(event);
      } else {
        this.handleMouseMoveWhenClicked(event);
      }
    });

    window.addEventListener('keydown', event => this.handleKeyDown(event));

    this.initSubscriptions();
  }

  /**
   * Init subscriptions for the component.
   * Listen for new elements to be added
   */
  initSubscriptions() {
    this.shapeService.pushElement$.subscribe(shape => this._drawElement(shape));
  }

  /**
   * Draw an element into the canvas context
   * @param shape
   */
  _drawElement(shape: IShape) {
    const ctxt = this.canvasElement.nativeElement.getContext('2d');

    if (ctxt) {
      shape.render(ctxt);
    }
  }

  /**
   * @summary handle key down events
   * triggers the tool wich is concerned by the key press
   * @param event
   */
  handleKeyDown(event: KeyboardEvent) {
    if (event.ctrlKey && event.key === 'z') {
      event.preventDefault();
      (document.getElementById('undo')?.children[0] as HTMLElement).click();
      this.updateCanvas();
    } else if (event.ctrlKey && event.key === 'y') {
      event.preventDefault();
      (document.getElementById('redo')?.children[0] as HTMLElement).click();
      this.updateCanvas();
    }
  }

  /**
   * @summary handle mouse button released events
   * triggers the concerned event in the currently selected tool, and process the returned action if any (for instance, draw a line between two points)
   * @param event
   */
  handleMouseRelease(event: MouseEvent) {
    const tool = this.shapeService.activeTool;
    const coord = this.getCoordinates(event);

    const curActions = tool.doRelease(coord.x, coord.y, this.stack);

    if (curActions) {
      curActions.forEach(curAction => {
        this.stack.insert(curAction);
      });
    }

    const lastAction = tool.checkCompleted(this.stack);
    if (lastAction) {
      this.stack.insert(lastAction);
    }

    this.updateCanvas();
  }

  /**
   * @summary handle mouse move events
   * triggers the concerned event in the currently selected tool, and process the returned action if any (for instance, draw a line between two points)
   * @param event
  */
  handleMouseMoveWhenUnClicked(event: MouseEvent) {
    const tool = this.shapeService.activeTool;
    const coord = this.getCoordinates(event);

    const curActions = tool.doUnPress(coord.x, coord.y, this.stack);

    if (curActions) {
      curActions.forEach(curAction => {
        this.stack.insert(curAction);
      });
    }

    const lastAction = tool.checkCompleted(this.stack);
    if (lastAction) {
      this.stack.insert(lastAction);
    }

    this.updateCanvas();
  }

  /**
   * @summary redraw the entire canvas with the stack
   */
  updateCanvas() {
    const shape = this.canvasElement.nativeElement;
    if (!shape) {
      return;
    }
    const rect = shape.parentElement!.getBoundingClientRect();
    shape.width = rect.width;
    shape.height = rect.height;
    this.canvasElement.nativeElement.getContext('2d')?.clearRect(0, 0, shape.width, shape.height);
    const actions = this.stack.getActiveStack();
    actions.forEach(action => {
      if (action.getIsShowed()) {
        const shapes = action.getShapes();
        shapes.forEach(shape => {
          this.shapeService.add(shape);
        });
      }
    });
  }

  /**
   * @summary handle mouse move when clicked events
   * triggers the concerned event in the currently selected tool
   * process the returned action if any (for instance, draw a line between two points)
   * @param event
  */
  handleMouseMoveWhenClicked(event: MouseEvent) {
    const tool = this.shapeService.activeTool;
    const coord = this.getCoordinates(event);

    const curActions = tool.doPress(coord.x, coord.y, this.stack);

    if (curActions) {
      curActions.forEach(curAction => {
        this.stack.insert(curAction);
      });
    }

    const lastAction = tool.checkCompleted(this.stack);
    if (lastAction) {
      this.stack.insert(lastAction);
    }

    this.updateCanvas();
  }

  /**
   * Compute the coordinates of an event
   * @param event
   * @returns x and y
   */
  getCoordinates(event: MouseEvent) {
    const { offsetX, offsetY } = event;
    const canvas = this.element.nativeElement;
    const canvasWidth = canvas.getBoundingClientRect().width;
    const documentWidth = document.documentElement.clientWidth;
    const coef = canvasWidth / documentWidth;
    return { x: offsetX * coef, y: offsetY };
  }

  /**
   * @summary handle click events
   * triggers the concerned event in the currently selected tool
   * process the returned action if any (for instance, draw a line between two points)
   * @param event
  */
  handleClick(event: MouseEvent) {
    const tool = this.shapeService.activeTool;
    const coord = this.getCoordinates(event);

    const curActions = tool.doClick(coord.x, coord.y, this.stack);

    if (curActions) {
      curActions.forEach(curAction => {
        this.stack.insert(curAction);
      });
    }

    const lastAction = tool.checkCompleted(this.stack);
    if (lastAction) {
      this.stack.insert(lastAction);
    }

    this.updateCanvas();
  }

  /**
   * @summary handle mouse move when clicked events
   * triggers the concerned event in the currently selected tool
   * process the returned action if any (for instance, draw a line between two points)
   * @param event
  */
  onAddElement(ePos: Vec2) {
    const toolName = this.storage.get('toolName');
    const canvas = this.element.nativeElement;

    const canvasWidth = canvas.getBoundingClientRect().width;
    const documentWidth = document.documentElement.clientWidth;
    const coef = canvasWidth / documentWidth;

    const pos = { x: ePos.x * coef, y: ePos.y };

    if (canvas === null) {
      return;
    }

    switch (toolName) {
      case 'polygon-empty':
        this.onAddPolygonEmpty(pos);
        break;
      case 'polygon-full':
        this.onAddPolygonFill(pos);
        break;
      case 'point':
        this.onAddPoint(pos);
        break;
      case 'pencil': {
        const point = new Circle('fill', this.storage.get('stroke'), 0, pos, 1);
        this.shapeService.add(point);
        break;
      }
      case 'line':
        for (let i = 0; i < this.shapeService.getElements().length; i++) {
          let shape: IShape;
          if ((shape = this.shapeService.getElement(i)) instanceof Circle) {
            if (shape.isColliding(pos)) {
              if (this.storage.get('lastCircleSelected') === null) {
                this.storage.set('lastCircleSelected', shape);
              } else {
                if (shape !== this.storage.get('lastCircleSelected')) {
                  this.onAddLine(this.storage.get('lastCircleSelected')!.rpos, shape.rpos);
                  this.storage.set('lastCircleSelected', null);
                }
              }
            }
          }
        }
        break;
      default:
        console.error('DrawMode not found : ' + toolName.toString());
    }
  }

  /**
   * @summary add line from pos1 to pos2 and push it to the element service.
   * @param pos1
   * @param pos2
   */
  onAddLine(pos1: Vec2, pos2: Vec2) {
    const line = new Line(this.storage.get('stroke'), 0, pos1, pos2);
    this.shapeService.add(line);
  }

  /**
   * Add a point to the elements
   * @param ePos
   */
  onAddPoint(ePos: Vec2) {
    const stroke = this.storage.get('stroke');

    const radius = 5;

    const point = new Circle('fill', stroke, 0, ePos, radius);
    this.shapeService.add(point);
  }

  /**
   * Add a filled polygon to the elements list
   * @param ePos
   */
  onAddPolygonFill(ePos: Vec2) {
    const stroke = this.storage.get('stroke');

    const width = 100;
    const height = 100;
    const rect = new Rect(this.storage.get('fill'), stroke, 0, ePos, width, height);
    this.shapeService.add(rect);
  }

  /**
   * Add an empty polygon to the elements list
   * @param ePos
   */
  onAddPolygonEmpty(ePos: Vec2) {
    const stroke = this.storage.get('stroke');

    const width = 100;
    const height = 100;
    const rect = new Rect('transparent', stroke, 0, ePos, width, height);
    this.shapeService.add(rect);
  }

  /**
   * Remove an element from a given position
   * @param ePos
   */
  onRemoveElement(ePos: Vec2) {
    // const elements = document.elementsFromPoint(ePos.x, ePos.y)
    //   .filter(shape => shape.classList.contains('svgElement'));

    // if (elements.length > 0) {
    //   const uuid = elements[0].id;

    //   this.shapeService.remove(uuid);
    // }
  }

  /**
   * Save the current stack in the local storage
   */
  @HostListener('document:keydown.control.s', ['$event'])
  onExp(event: KeyboardEvent) {
    event.preventDefault();

    const state = this.serialize();
    exportState(state, 'canva');
  }

  /**
   * Export the current stack in a .sil file
   */
  onExport(canvaState?: object) {
    const state = canvaState ?? this.serialize();
    const stringifiedState =  JSON.stringify(state);
    const fileName = 'canva.sil';
    const file = new Blob([stringifiedState], { type: 'text/plain' });

  }

  serialize(): ISerializedCanva {
    return {
      stack: this.stack.serialize()
    };
  }
}
