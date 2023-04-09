import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'ill-app-system-bar',
  templateUrl: './system-bar.component.html',
  styleUrls: ['./system-bar.component.css']
})
export class SystemBarComponent implements OnInit {
  @Output() import = new EventEmitter<Event>;
  @Output() export = new EventEmitter<void>;

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }
}
