import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { ActionStack } from '@lib/action-stacks/action-stack.class';
import { ISerializedCanvas } from '@lib/serialized-canvas.interface';
import { saveAs } from 'file-saver';
import { Shape } from '@lib/shapes/shape.abstract';
import ShapeService from 'src/app/services/shapes.service';

@Component({
  selector: 'ill-app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements AfterViewInit {
  @ViewChild('canvas') canvasElement!: ElementRef<HTMLCanvasElement>;

  constructor(private shapeService: ShapeService,
    private rootElement: ElementRef<HTMLElement>,
    private stack: ActionStack) {
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
    this.shapeService.elements$.subscribe(shapes => this._replaceShapes(shapes));
  }

  _replaceShapes(shapes: Shape[]) {
    const ctxt = this.canvasElement.nativeElement.getContext('2d');
    const clientRect = this.canvasElement.nativeElement.getBoundingClientRect();
    ctxt?.clearRect(0, 0, clientRect.width, clientRect.height);
    shapes.forEach(shape => this._drawElement(shape));
  }

  /**
   * Draw an element into the canvas context
   * @param shape
   */
  _drawElement(shape: Shape) {
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
      if (!action.getIsDeleted()) {
        const shapes = action.getShapes();
        shapes.forEach(s => {
          this.shapeService.add(s);
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
    const canvas = this.rootElement.nativeElement;
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
   * Export the current stack in a .sil file
   */
  @HostListener('document:keydown.control.s', ['$event'])
  onExport(event?: KeyboardEvent) {
    event?.preventDefault();

    const state = this._serialize();
    this._exportState(state, 'canvas');
  }

  /**
   * Import a stack from a .sil file
   */
  onImport(event: Event) {
    const eventTarget = event.target as HTMLInputElement;

    if (!eventTarget) return;
    if (!eventTarget.files?.length) return;
    const file = eventTarget.files[0];

    const fileReader: FileReader = new FileReader();
    fileReader.readAsText(file);
    fileReader.onload = () => {
      const json = JSON.parse(fileReader.result as string);
      const state = CanvasComponent.parse(json);
      this._applyState(state);
    };
    fileReader.onerror = () => {
      console.error('Could not parse the file');
    };
  }

  private _applyState(state: ReturnType<typeof CanvasComponent.parse>) {
    if (!state) {
      return;
    }

    this.stack.setStack(state.stack);
    for (const action of this.stack.getStack()) {
      const shapes = action.getShapes();
      shapes.forEach(shape => {
        this.shapeService.add(shape);
      });
    }
  }

  static parse(serializedCanva: ISerializedCanvas) {
    if (!serializedCanva.stack) return null;
    const parsedStack = ActionStack.parse(serializedCanva.stack);
    if (!parsedStack) return null;

    return {
      stack: parsedStack
    };
  }

  private _serialize(): ISerializedCanvas {
    return {
      stack: this.stack.serialize()
    };
  }

  private _exportState(state: unknown, fileName: string) {
    const json = JSON.stringify(state);
    const blob = new Blob([json], { type: 'application/json' });
    saveAs(blob, fileName + '.sil');
  }
}
