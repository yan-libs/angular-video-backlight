import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSliderModule } from "@angular/material/slider";
import { FormsModule } from "@angular/forms";
import { AngularVideoBacklightModule } from "angular-video-backlight";
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MatSliderModule,
    FormsModule,
    AngularVideoBacklightModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
