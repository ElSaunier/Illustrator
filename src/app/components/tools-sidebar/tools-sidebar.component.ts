import { AfterViewInit, ChangeDetectorRef, Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { nonSelectableTools, ToolName, UnSelectableToolName } from '@lib/tools/tools';
import { StorageService } from 'src/app/services/storage.service';
import ShapeService from 'src/app/services/shapes.service';
import { tools } from '@lib/tools/tools';
import { Tool } from '@lib/tools/tool.abstract';
import { ToolComponent } from '../tool/tool.component';
import { UnselectableTool } from '@lib/tools/unselectableTool.class';
import { UnselectableToolComponent } from '../tool/unselectableTool.component';
import { ActionStack } from '@lib/action-stacks/action-stack.class';

@Component({
  selector: 'ill-app-tools-sidebar',
  templateUrl: './tools-sidebar.component.html',
  styleUrls: ['./tools-sidebar.component.css']
})
export class ToolsSidebarComponent implements OnInit, AfterViewInit {
  @ViewChildren(ToolComponent) toolComponentRefs!: QueryList<ToolComponent>;
  @ViewChildren(UnselectableToolComponent) unselectableToolComponentRefs!: QueryList<UnselectableToolComponent>;

  protected tools = tools;
  protected nonSelectableTools = nonSelectableTools;
  private activeButton!: ToolName;
  protected fillColor = 'rgba(0,0,0,1)';
  protected strokeColor = 'rgba(0,0,0,1)';
  protected config = {
    color:'#000000',
    thickness: 1,
    fill: true,
    fillColor: 'rgba(0,0,0,1)'
  };

  constructor(private storage: StorageService, private shapeService: ShapeService, private cd: ChangeDetectorRef,
    private stack: ActionStack) { }

  ngOnInit() {
    this.config = this.storage.get('config');
  }

  ngAfterViewInit() {
    const toolName = this.storage.get('toolName');
    const toolComponent = this.toolComponentRefs.find(component => component.tool.cls.toolName === toolName);

    if (toolComponent) {
      this.setActive(toolName, toolComponent.instance);
    }
    this.cd.detectChanges();

    this.storage.subject('config').subscribe( cfg => {
      this.shapeService.activeTool.configure(cfg);
    });
  }

  /* Function for buttons */
  isButtonActive(name: ToolName) {
    return this.activeButton === name;
  }

  setActive(name: ToolName, tool: Tool) {
    this.activeButton = name;
    this.storage.set('toolName', name);
    this.shapeService.activeTool = tool;
    this.shapeService.activeTool.configure(this.config);
  }

  /* Function called when click on clear all picture */
  onEraseAll() {
    while (this.shapeService.getElements().length > 0) {
      this.shapeService.remove(this.shapeService.getElement(0).uuid);
    }
  }

  onToolClicked(tool: [Tool, ToolName]) {
    const [toolInstance, toolName] = tool;
    this.setActive(toolName, toolInstance);
  }

  onUnselectableToolClicked(unselectableTool: [UnselectableTool, UnSelectableToolName]) {
    const [toolInstance] = unselectableTool;

    toolInstance.doClick(0, 0, this.stack);

    const shapes = this.stack.getActiveStack().filter(action => !action.getIsDeleted()).map(action => action.getShapes()).flat();
    this.shapeService.updateElements(shapes);
  }
}