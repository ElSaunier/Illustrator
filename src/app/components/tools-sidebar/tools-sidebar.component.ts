import { AfterViewInit, ChangeDetectorRef, Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ToolName } from '@lib/tools/tools';
import { StorageService } from 'src/app/services/storage.service';
import SvgElementsService from 'src/app/services/svg-elements.service';
import { tools } from '@lib/tools/tools';
import { Tool } from '@lib/tools/tool.abstract';
import { ToolComponent } from '../tool/tool.component';
@Component({
  selector: 'ill-app-tools-sidebar',
  templateUrl: './tools-sidebar.component.html',
  styleUrls: ['./tools-sidebar.component.css']
})
export class ToolsSidebarComponent implements OnInit, AfterViewInit {
  @ViewChildren(ToolComponent) toolComponentRefs!: QueryList<ToolComponent>;

  protected tools = tools;
  private activeButton!: ToolName;
  protected fillColor = 'rgba(0,0,0,1)';
  protected strokeColor = 'rgba(0,0,0,1)';

  constructor(private storage: StorageService, private elementsService: SvgElementsService, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.fillColor = this.storage.get('fill');
    this.strokeColor = this.storage.get('stroke');
  }

  ngAfterViewInit() {
    const toolName = this.storage.get('toolName');
    const toolComponent = this.toolComponentRefs.find(component => component.tool.cls.toolName === toolName);

    if (toolComponent) {
      this.setActive(toolName, toolComponent.instance);
    }
    this.cd.detectChanges();
  }

  /* Function for buttons */
  isButtonActive(name: ToolName) {
    return this.activeButton === name;
  }

  setActive(name: ToolName, tool: Tool) {
    this.activeButton = name;
    this.storage.set('toolName', name);
    this.elementsService.activeTool = tool;
  }

  /* Function called when click on clear all picture */
  onEraseAll() {
    while (this.elementsService.getElements().length > 0) {
      this.elementsService.remove(this.elementsService.getElement(0).uuid);
    }
  }

  onToolClicked(tool: [Tool, ToolName]) {
    this.setActive(tool[1], tool[0]);
  }
}