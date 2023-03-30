import { Component, ElementRef, ViewChild } from '@angular/core';
import { map } from 'rxjs';
import { CanvasComponent } from './components/canvas/canvas.component';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('canvas') canvas!: CanvasComponent;

  title = 'Illustrator';

  constructor(private storage: StorageService) {}
  isErasing = this.storage.subject('toolName').pipe(map(val => val === 'eraser'));

  onImport() {
    this.canvas.onAImport();
  }

  onExport() {
    this.canvas.onExport();
  }
}
