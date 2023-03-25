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
import { HttpClientModule } from '@angular/common/http';
import { ColorPickerModule } from 'ngx-color-picker';
import { ToolComponent } from './components/tool/tool.component';
import { UnselectableToolComponent } from './components/tool/unselectableTool.component';

@NgModule({
  declarations: [
    AppComponent,
    CanvasComponent,
    ToolsSidebarComponent,
    ToolComponent,
    UnselectableToolComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    ColorPickerModule
  ],
  providers: [
    SvgElementsService,
    StorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
