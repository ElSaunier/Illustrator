import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'ill-app-system-bar',
  templateUrl: './system-bar.component.html',
  styleUrls: ['./system-bar.component.css']
})
export class SystemBarComponent implements OnInit {
  @Output() import = new EventEmitter<void>;
  @Output() export = new EventEmitter<void>;

  saveSVGPath = '/assets/customSVG/save.svg';
  exportSVGPath = '/assets/customSVG/export.svg';
  importSVGPath = '/assets/customSVG/import.svg';

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.matIconRegistry.addSvgIcon(
      'save',
      this.domSanitizer.bypassSecurityTrustResourceUrl(this.saveSVGPath)
    );

    this.matIconRegistry.addSvgIcon(
      'export',
      this.domSanitizer.bypassSecurityTrustResourceUrl(this.exportSVGPath)
    );

    this.matIconRegistry.addSvgIcon(
      'import',
      this.domSanitizer.bypassSecurityTrustResourceUrl(this.importSVGPath)
    );
  }

}
