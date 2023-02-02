import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ToolName } from '@lib/tools/tools';
import { StorageService } from 'src/app/services/storage.service';
import SvgElementsService from 'src/app/services/svg-elements.service';
import { tools } from '@lib/tools/tools';
@Component({
  selector: 'ill-app-tools-sidebar',
  templateUrl: './tools-sidebar.component.html',
  styleUrls: ['./tools-sidebar.component.css']
})
export class ToolsSidebarComponent implements OnInit {
  protected tools = tools;
  private activeButton!: ToolName;
  protected fillColor = 'rgba(0,0,0,1)';
  protected strokeColor = 'rgba(0,0,0,1)';

  constructor(private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer, private storage: StorageService, private elementsService: SvgElementsService) {
  }

  ngOnInit() {
    const drawMode = this.storage.get('toolName');
    this.setActive(drawMode);

    this.fillColor = this.storage.get('fill');
    this.strokeColor = this.storage.get('stroke');
  }

  /* Function for buttons */
  isButtonActive(name: ToolName) {
    return this.activeButton == name;
  }

  setActive(name: ToolName) {
    this.activeButton = name;
  }
  /* --------------- */

  /* Function called when click on pencil button */
  onPencil() {
    this.storage.set('toolName', 'pencil');
  }

  /* Function called when click on eraser button */
  onErase() {
    this.storage.set('toolName', 'eraser');
  }

  /* Function called when click on polygon-full button */
  onDrawFullPolygon() {
    this.storage.set('toolName', 'polygon-full');
  }

  /* Function called when click on polygon-empty button */
  onDrawEmptyPolygon() {
    this.storage.set('toolName', 'polygon-empty');
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
    this.storage.set('toolName', 'point');
  }

  /* Function called when click on line button */
  onDrawLine() {
    this.storage.set('toolName', 'line');
  }

}