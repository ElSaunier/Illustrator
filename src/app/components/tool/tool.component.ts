import { Component, Input, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ToolMeta } from '@lib/tools/tools';

@Component({
  selector: 'app-tool[tool][active]',
  templateUrl: './tool.component.html',
  styleUrls: ['./tool.component.css']
})
export class ToolComponent implements OnInit {
  @Input() tool!: ToolMeta;
  @Input() active = false;

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {}

  ngOnInit() {
    /* Registering custom SVGs */
    this.matIconRegistry.addSvgIcon(
      this.tool.cls.toolName,
      this.domSanitizer.bypassSecurityTrustResourceUrl(this.tool.cls.svgPath)
    );
  }
}
