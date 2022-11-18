import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CanvasComponent } from './components/canvas/canvas.component';
import SvgElementsService from './services/svg-elements.service';

@NgModule({
  declarations: [
    AppComponent,
    CanvasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [
    SvgElementsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
