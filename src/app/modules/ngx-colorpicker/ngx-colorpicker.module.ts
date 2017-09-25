import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxColorpickerComponent } from './ngx-colorpicker/ngx-colorpicker.component';
import { NgxColorDisplayDirective } from './directives/ngx-color-display.directive';
import { NgxColorShadesComponent } from './/ngx-color-shades/ngx-color-shades.component';
import { NgxPaletteService } from './services/ngx-palette.service';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxColorStoreService } from './services/ngx-color-store.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  declarations: [NgxColorpickerComponent, NgxColorDisplayDirective, NgxColorShadesComponent],
  exports: [NgxColorpickerComponent, NgxColorShadesComponent],
  providers: [NgxPaletteService, NgxColorStoreService]
})
export class NgxColorpickerModule { }
