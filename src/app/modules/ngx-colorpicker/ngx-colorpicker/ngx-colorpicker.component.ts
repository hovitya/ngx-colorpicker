import { Component, Input, NgZone, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Color, ColorEvent } from '../common/color';
import { NgxPaletteService } from '../services/ngx-palette.service';
import { Page } from '../common/pages';

@Component({
  selector: 'ngx-colorpicker',
  templateUrl: './ngx-colorpicker.component.html',
  styleUrls: ['./ngx-colorpicker.component.scss']
})
export class NgxColorpickerComponent implements OnInit {
  private internalColor = new Color();

  @Input()
  public showClose = false;

  @Input()
  public lastUsedLabel = 'Last used';

  @Input()
  public solidColorsLabel = 'Solid colors';

  @Input()
  public set baseColors(value: string[]) {
    this.solidColors = this.paletteService.createSolidColors(value).filter((item, index) => index < 56 );
  }

  public currentPage: Page = Page.SOLID;

  public Page = Page;

  public solidColors;

  color = new FormControl();
  redColor = new FormControl();
  greenColor = new FormControl();
  blueColor = new FormControl();
  hexColor = new FormControl();

  constructor(private zone: NgZone, private paletteService: NgxPaletteService) {
    this.solidColors = this.paletteService.createSolidColors().filter((item, index) => index < 56 );
  }

  ngOnInit() {
    this.color.valueChanges.subscribe(() => {
      if (this.internalColor.hex !== this.color.value) {
        this.internalColor.parse(this.color.value);
      }
    });

    this.blueColor.valueChanges.subscribe(() => {
      const clr =  parseInt(this.blueColor.value, 10);
      if (this.internalColor.blue !== clr) {
        this.internalColor.blue = clr;
      }
    });

    this.greenColor.valueChanges.subscribe(() => {
      const clr =  parseInt(this.greenColor.value, 10);
      if (this.internalColor.green !== clr) {
        this.internalColor.green = clr;
      }
    });

    this.redColor.valueChanges.subscribe(() => {
      const clr =  parseInt(this.redColor.value, 10);
      if (this.internalColor.red !== clr) {
        this.internalColor.red = clr;
      }
    });

    this.hexColor.valueChanges.subscribe(() => {
      if (this.internalColor.isHex.test(`#${this.hexColor.value}`) && this.internalColor.hex !== this.hexColor.value) {
        this.internalColor.parse(`#${this.hexColor.value}`);
      }
    });

    this.internalColor.addEventListener(ColorEvent.UPDATED, () => {
        this.color.setValue(this.internalColor.hex, {onlySelf: true, emitEvent: false});
        this.redColor.setValue(this.internalColor.red, {onlySelf: true, emitEvent: false});
        this.greenColor.setValue(this.internalColor.green, {onlySelf: true, emitEvent: false});
        this.blueColor.setValue(this.internalColor.blue, {onlySelf: true, emitEvent: false});
        this.hexColor.setValue(this.internalColor.hex.substr(1), {onlySelf: true, emitEvent: false});
    });
  }

  public setActive(color) {
    this.internalColor.parse(color);
  }

  public close() {
    // TODO
  }

}
