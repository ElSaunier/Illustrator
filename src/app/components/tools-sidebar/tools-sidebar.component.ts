import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { DrawMode } from '@lib/defaultParameters';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'ill-app-tools-sidebar',
  templateUrl: './tools-sidebar.component.html',
  styleUrls: ['./tools-sidebar.component.css']
})
export class ToolsSidebarComponent implements OnInit {

  private activeButton!: DrawMode;

  constructor(private matIconRegistry: MatIconRegistry,    
    private domSanitizer: DomSanitizer, private storage: StorageService) { 

    /* Registering custom SVGs */
    this.matIconRegistry.addSvgIcon(
      'pencil',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/customSVG/pencil.svg')
    );

    this.matIconRegistry.addSvgIcon(
      'eraser',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/customSVG/eraser.svg')
    );

    this.matIconRegistry.addSvgIcon(
      'polygon-full',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/customSVG/hexagonFull.svg')
    );

    this.matIconRegistry.addSvgIcon(
      'polygon-empty',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/customSVG/hexagonEmpty.svg')
    );
    /* ----------------------- */
  }

  ngOnInit() {
    const drawMode = this.storage.get('drawMode');
    this.setActive(drawMode);
  }

  /* Function for buttons */  
  isButtonActive(name: string) {
    return this.activeButton == name;
  }

  setActive(name: DrawMode) {
    this.activeButton = name;
  }
  /* --------------- */

  /* Function called when click on pencil button */
  onPencil() {
    this.storage.set('drawMode', 'pencil');
  }

  /* Function called when click on eraser button */
  onErase() {
    this.storage.set('drawMode', 'eraser');
  }

  /* Function called when click on polygon-full button */
  onDrawFullPolygon() {
    this.storage.set('drawMode', 'polygon-full');
  }

  /* Function called when click on polygon-empty button */
  onDrawEmptyPolygon() {
    this.storage.set('drawMode', 'polygon-empty');
  }

}