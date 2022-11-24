import { Component, NgModule, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-tools-sidebar',
  templateUrl: './tools-sidebar.component.html',
  styleUrls: ['./tools-sidebar.component.css']
})
export class ToolsSidebarComponent implements OnInit {

  private activeButton: string;

  constructor(private matIconRegistry: MatIconRegistry,    
              private domSanitizer: DomSanitizer
    ) { 

      this.activeButton = "";

      /* Registering custom SVGs */
      this.matIconRegistry.addSvgIcon(
        "pencil",
        this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/customSVG/pencil.svg")
      );

      this.matIconRegistry.addSvgIcon(
        "eraser",
        this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/customSVG/eraser.svg")
      );

      this.matIconRegistry.addSvgIcon(
        "polygon-full",
        this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/customSVG/hexagonFull.svg")
      );

      this.matIconRegistry.addSvgIcon(
        "polygon-empty",
        this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/customSVG/hexagonEmpty.svg")
      );
      /* ----------------------- */
  }

  /* Function for buttons */  
  isButtonActive(name: string){
    return this.activeButton == name;
  }

  setActive(name: string){
    this.activeButton = name;
  }
  /* --------------- */

  ngOnInit(): void {
  }

  /* Function called when click on pencil button */
  onPencil(){

  }

  /* Function called when click on eraser button */
  onErase(){

  }

  /* Function called when click on polygon-full button */
  onDrawFullPolygon(){

  }

  /* Function called when click on polygon-empty button */
  onDrawEmptyPolygon(){

  }

}