import { Component, OnInit } from '@angular/core';
import { IToolConfiguration } from '@lib/tools/tool-configuration.interface';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'ill-app-tool-configuration',
  templateUrl: './tool-configuration.component.html',
  styleUrls: ['./tool-configuration.component.css']
})
export class ToolConfigurationComponent implements OnInit {

  config: IToolConfiguration;

  constructor(private storageService: StorageService) {
    this.config = storageService.get('config');
  }

  ngOnInit(): void {
  }

  /**
   * @summary When thinckess changes in the template, update config and save it in the store
   * @param event 
   */
  onThicknessChange(event: any) {
    this.config.thickness = event;
    this.storageService.set('config', this.config);
  }

  /**
   * @summary When color changes in the template, update config and save it in the storage
   * @param event 
   */
  onColorSelect(event: any) {
    this.config.color = event;
    this.config.fillColor = event;
    this.storageService.set('config', this.config);
  }
}
