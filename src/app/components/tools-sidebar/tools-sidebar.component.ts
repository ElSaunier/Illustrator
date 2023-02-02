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
    const toolName = this.storage.get('toolName');
    this.setActive(toolName);

    this.fillColor = this.storage.get('fill');
    this.strokeColor = this.storage.get('stroke');
  }

  /* Function for buttons */
  isButtonActive(name: ToolName) {
    return this.activeButton === name;
  }

  setActive(name: ToolName) {
    this.activeButton = name;
    this.storage.set('toolName', name);
  }

  /* Function called when click on clear all picture */
  onEraseAll() {
    while (this.elementsService.getElements().length > 0) {
      this.elementsService.remove(this.elementsService.getElement(0).uuid);
    }
  }
}