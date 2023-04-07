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

  protected tools = tools; // Tool list
  protected nonSelectableTools = nonSelectableTools; // Unselectable tools list
  private activeButton!: ToolName; // Name of the active tool, set in ngAfterViewInit

  // Config
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
    this.config = this.storage.get('config'); // Set the config to the one stored in the storage for persistence
  }

  ngAfterViewInit() {
    // Init the active tool depending on the value stored in the storage, for persistence
    const toolName = this.storage.get('toolName');
    const toolComponent = this.toolComponentRefs.find(component => component.tool.cls.toolName === toolName);

    if (toolComponent) {
      this.setActive(toolName, toolComponent.instance);
    } else {
      const defaultToolComponent = this.toolComponentRefs.first;
      this.setActive(defaultToolComponent.tool.cls.toolName, defaultToolComponent.instance);
    }

    this.cd.detectChanges(); // Check changes with changeDetectorRef to avoid "Changed after check" error (https://angular.io/errors/NG0100)

    // Watch for the config to change to reconfigure the active tool
    this.storage.subject('config').subscribe( cfg => {
      this.shapeService.activeTool.configure(cfg);
    });
  }

  /**
   * Check if a button is active or not by comparing its name to the name given as a parameter
   * @param name 
   * @returns bool
   */
  isButtonActive(name: ToolName) {
    return this.activeButton === name;
  }

  /**
   * Store the selected tool in the activeTool member, also in the storage for persistence
   * Configure the actieTool with the current configuration (colors, thickness ...).
   * @param name 
   * @param tool 
   */
  setActive(name: ToolName, tool: Tool) {
    this.activeButton = name;
    this.storage.set('toolName', name);
    this.shapeService.activeTool = tool;
    this.shapeService.activeTool.configure(this.config);
  }

  /* Function called when click on "clear all / trash" button */
  onEraseAll() {
    while (this.shapeService.getElements().length > 0) {
      this.shapeService.remove(this.shapeService.getElement(0).uuid);
    }
  }

  /**
   * @summary Select the clicked tool 
   * @param tool 
   */
  onToolClicked(tool: [Tool, ToolName]) {
    const [toolInstance, toolName] = tool;
    this.setActive(toolName, toolInstance);
  }

  /**
   * @summary called when an unselectable tool has been clicked
   * Perform a click action on the tool instance and update the canvas dending on the action stack state
   * @param unselectableTool 
   */
  onUnselectableToolClicked(unselectableTool: [UnselectableTool, UnSelectableToolName]) {
    const [toolInstance] = unselectableTool;

    toolInstance.doClick(0, 0, this.stack);

    const shapes = this.stack.getActiveStack().filter(action => !action.getIsDeleted()).map(action => action.getShapes()).flat();
    this.shapeService.updateElements(shapes);
  }
}