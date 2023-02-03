import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Tool } from '@lib/tools/tool.abstract';
import { ToolMeta, ToolName } from '@lib/tools/tools';

@Component({
  selector: 'app-tool[tool][active]',
  templateUrl: './tool.component.html',
  styleUrls: ['./tool.component.css']
})
export class ToolComponent implements OnInit {
  @Input() tool!: ToolMeta;
  @Input() active = false;

  instance!: Tool;

  @Output() toolClicked = new EventEmitter<[Tool, ToolName]>();

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {}

  ngOnInit() {
    /* Registering custom SVGs */
    this.matIconRegistry.addSvgIcon(
      this.tool.cls.toolName,
      this.domSanitizer.bypassSecurityTrustResourceUrl(this.tool.cls.svgPath)
    );

    this.instance = new this.tool.cls();
  }

  onClickTool() {
    this.toolClicked.emit([this.instance, this.tool.cls.toolName]);
  }
}
