import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxColorpickerComponent } from './ngx-colorpicker/ngx-colorpicker.component';
import { NgxColorDisplayDirective } from './directives/ngx-color-display.directive';
import { NgxColorShadesComponent } from './/ngx-color-shades/ngx-color-shades.component';
import { NgxPaletteService } from './services/ngx-palette.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NgxColorpickerComponent, NgxColorDisplayDirective, NgxColorShadesComponent],
  exports: [NgxColorpickerComponent, NgxColorShadesComponent],
  providers: [NgxPaletteService]
})
export class NgxColorpickerModule { }
