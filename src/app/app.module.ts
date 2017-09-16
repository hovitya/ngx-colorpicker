import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgxColorpickerModule } from './modules/ngx-colorpicker/ngx-colorpicker.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxColorpickerModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
