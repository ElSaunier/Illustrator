import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IToolConfiguration } from '@lib/tools/tool-configuration.interface';
import SvgElementsService from 'src/app/services/svg-elements.service';

@Component({
  selector: 'ill-app-tool-configuration',
  templateUrl: './tool-configuration.component.html',
  styleUrls: ['./tool-configuration.component.css']
})
export class ToolConfigurationComponent implements OnInit {

  config: IToolConfiguration;

  constructor(private elementService: SvgElementsService) {
    this.config = {
      color:'#000000',
      thickness: 1,
      fill: true,
      fillColor: 'rgba(0,0,0,1)'
    };
  }

  ngOnInit(): void {
  }

  onThicknessChange(event: any) {
    this.config.thickness = event;
    this.elementService.activeTool.configure(this.config);
  }

  onColorSelect(event: any) {
    this.config.color = event;
    this.config.fillColor = event;
    this.elementService.activeTool.configure(this.config);
  }

}
