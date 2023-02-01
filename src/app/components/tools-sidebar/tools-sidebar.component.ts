import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { DrawMode } from '@lib/defaultParameters';
import { StorageService } from 'src/app/services/storage.service';
import SvgElementsService from 'src/app/services/svg-elements.service';

@Component({
  selector: 'ill-app-tools-sidebar',
  templateUrl: './tools-sidebar.component.html',
  styleUrls: ['./tools-sidebar.component.css']
})
export class ToolsSidebarComponent implements OnInit {

  private activeButton!: DrawMode;
  protected fillColor = 'rgba(0,0,0,1)';
  protected strokeColor = 'rgba(0,0,0,1)';

  constructor(private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer, private storage: StorageService, private elementsService: SvgElementsService) {

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

    this.matIconRegistry.addSvgIcon(
      'trash-can',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/customSVG/trash-can.svg')
    );

    this.matIconRegistry.addSvgIcon(
      'point',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/customSVG/point.svg')
    );

    this.matIconRegistry.addSvgIcon(
      'line',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/customSVG/line.svg')
    );
    /* ----------------------- */
  }

  ngOnInit() {
    const drawMode = this.storage.get('drawMode');
    this.setActive(drawMode);

    this.fillColor = this.storage.get('fill');
    this.strokeColor = this.storage.get('stroke');
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

  onFillChanges() {
    this.storage.set('fill', this.fillColor);
  }

  onStrokeChanges() {
    this.storage.set('stroke', this.strokeColor);
  }
  /* Function called when click on clear all picture */
  onEraseAll() {
    while (this.elementsService.getElements().length > 0) {
      this.elementsService.remove(this.elementsService.getElement(0).uuid);
    }
  }

  /* Function called when click on point button */
  onDrawPoint() {
    this.storage.set('drawMode', 'point');
  }

  /* Function called when click on line button */
  onDrawLine() {
    this.storage.set('drawMode', 'line');
  }

}