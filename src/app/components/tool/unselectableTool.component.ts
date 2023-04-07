import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatIconRegistry, MatIconModule } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { UnselectableToolMeta, UnSelectableToolName } from '@lib/tools/tools';
import { UnselectableTool } from '@lib/tools/unselectableTool.class';

@Component({
  selector: 'app-unselectable-tool[unselectableTool]',
  templateUrl: './unselectableTool.component.html',
})
export class UnselectableToolComponent implements OnInit {
  @Input() unselectableTool!: UnselectableToolMeta;

  instance!: UnselectableTool;

  @Output() unselectableToolClicked = new EventEmitter<[UnselectableTool, UnSelectableToolName]>();

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) { }

  ngOnInit() {
    /* Registering custom SVGs */
    this.matIconRegistry.addSvgIcon(
      this.unselectableTool.cls.toolName,
      this.domSanitizer.bypassSecurityTrustResourceUrl(this.unselectableTool.cls.svgPath)
    );

    this.instance = new this.unselectableTool.cls();
  }

  onClickTool() {
    this.unselectableToolClicked.emit([this.instance, this.unselectableTool.cls.toolName]);
  }
}
