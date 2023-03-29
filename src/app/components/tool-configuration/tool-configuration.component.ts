import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IToolConfiguration } from '@lib/tools/tool-configuration.interface';
import { StorageService } from 'src/app/services/storage.service';
import SvgElementsService from 'src/app/services/svg-elements.service';

@Component({
  selector: 'ill-app-tool-configuration',
  templateUrl: './tool-configuration.component.html',
  styleUrls: ['./tool-configuration.component.css']
})
export class ToolConfigurationComponent implements OnInit {

  config: IToolConfiguration;

  constructor(private elementService: SvgElementsService, private storageService: StorageService) {
    this.config = storageService.get('config');
  }

  ngOnInit(): void {
  }

  onThicknessChange(event: any) {
    this.config.thickness = event;
    this.storageService.set('config', this.config);
  }

  onColorSelect(event: any) {
    this.config.color = event;
    this.config.fillColor = event;
    this.storageService.set('config', this.config);
  }

}
