import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CanvasComponent } from './components/canvas/canvas.component';
import SvgElementsService from './services/svg-elements.service';
import { StorageService } from './services/storage.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ToolsSidebarComponent } from './components/tools-sidebar/tools-sidebar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    CanvasComponent,
    ToolsSidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule

  ],
  providers: [
    SvgElementsService,
    StorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
