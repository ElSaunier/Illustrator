import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Circle, SvgShape } from 'src/app/lib/default-svg';
import { Rect } from 'src/app/lib/rect-svg';
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
    this.elementsService.pushElement$.subscribe(elem => this.drawElement(elem));
  }

  drawElement(e: SvgShape) {
    const render = e.render();

    const element = this.canvasElement.nativeElement;
    element.insertAdjacentHTML('beforeend', render);
  }

  handleClick(event: MouseEvent) {
    const { clientX, clientY } = event;

    const { x, y } = this.canvasElement.nativeElement.getBoundingClientRect();

    // const circle = new Circle('green', 'green', 0, { x: clientX - x, y: clientY - y }, 10);
    // this.elementsService.add(circle);
    
    const width = 30;
    const height = 20;
    const rect = new Rect(this.storage.get('fill'), this.storage.get('stroke'), 0,  { x: clientX - x - 0.5 * width, y: clientY - y - 0.5 * height }, width, height);
    this.elementsService.add(rect);
  }
}
