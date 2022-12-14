import { Component } from '@angular/core';
import { map } from 'rxjs';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Illustrator';

  constructor(private storage: StorageService) {}
  isErasing = this.storage.subject('drawMode').pipe(map(val => val === 'eraser'));
}
