import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'ill-app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas') canvasElement!: ElementRef<SVGElement>;

  ngOnInit() {

  }

  ngAfterViewInit() {
    console.log(this.canvasElement)
    this.canvasElement.nativeElement.addEventListener('click', event => this.handleClick(event));
  }

  handleClick(event: MouseEvent) {
    const { clientX, clientY } = event;
    this.drawVertex(clientX, clientY, 'green');
  }

  drawVertex(x: number, y: number, color: string) {
    const vertex = `<circle cx="${x}" cy="${y}" r="10" fill="${color}"></circle>`;

    const element = this.canvasElement.nativeElement;
    element.insertAdjacentHTML('beforeend', vertex);
  }
}
