import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Circle, SvgShape } from 'src/app/lib/default-svg';
import SvgElementsService from 'src/app/services/svg-elements.service';

@Component({
  selector: 'ill-app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements AfterViewInit {
  @ViewChild('canvas') canvasElement!: ElementRef<SVGElement>;

  constructor(private elementsService: SvgElementsService) {}

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
    const circle = new Circle('green', 'green', 0, { x: clientX, y: clientY }, 10);
    this.elementsService.add(circle);
  }
}
