import { Component, EventEmitter, Input, NgZone, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Color, ColorEvent } from '../common/color';
import { NgxPaletteService } from '../services/ngx-palette.service';
import { Page } from '../common/pages';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ColorFormat, GenerateColorString } from '../common/color-format';

@Component({
  selector: 'ngx-colorpicker',
  templateUrl: './ngx-colorpicker.component.html',
  styleUrls: ['./ngx-colorpicker.component.scss'],
  animations: [
    trigger('pageState', [
      state(Page.SOLID, style({
        marginLeft: '0px'
      })),
      state(Page.ADVANCED, style({
        marginLeft: '-250px'
      })),
      state(Page.FAVORITE, style({
        marginLeft: '-500px'
      })),
      transition('* => *', animate('500ms cubic-bezier(0.645, 0.045, 0.355, 1.000)')),
    ])
  ]
})
export class NgxColorpickerComponent implements OnInit {
  private internalColor = new Color();
  private _colorFormat: ColorFormat = ColorFormat.HEX;

  @Input()
  set colorFormat(value: ColorFormat) {
    this._colorFormat = value;
  }

  get colorFormat(): ColorFormat {
    return this._colorFormat;
  }

  @Input()
  public showClose = false;

  @Input()
  public showFavorites = true;

  @Input()
  public showLastUsed = true;

  @Input()
  public lastUsedLabel = 'Last used';

  @Input()
  public solidColorsLabel = 'Solid colors';

  @Input()
  public favoritesLabel = 'Favorites';

  @Input()
  public set baseColors(value: string[]) {
    this.solidColors = this.paletteService.createSolidColors(value).filter((item, index) => index < 56 );
  }

  @Output()
  public close: EventEmitter<string> = new EventEmitter();

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
      if (this.hexColor.value.length === 6 && this.internalColor.hex !== this.hexColor.value) {
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

  public closeClicked() {
    this.close.emit(GenerateColorString(this.internalColor, this.colorFormat));
  }
}
