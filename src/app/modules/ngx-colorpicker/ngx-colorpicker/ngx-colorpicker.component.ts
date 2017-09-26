import { Component, EventEmitter, Input, NgZone, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Color, ColorEvent } from '../common/color';
import { NgxPaletteService } from '../services/ngx-palette.service';
import { Page } from '../common/pages';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ColorFormat, GenerateColorString } from '../common/color-format';
import { NgxColorStoreService } from '../services/ngx-color-store.service';
import { Subscription } from 'rxjs/Subscription';
import { ColorCharacteristic } from '../common/color-characteristic';

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
export class NgxColorpickerComponent implements OnInit, OnDestroy {
  private internalColor = new Color();
  private _colorFormat: ColorFormat = ColorFormat.HEX;
  private subscriptions: Subscription[] = [];
  private colorUpdateListener: () => void;
  private LAST_USED_KEY = 'ngx-cp-lastused';
  private FAVORITES_KEY = 'ngx-cp-favorites';

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
  public autoCommit = true;

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
    this.solidColors = this.paletteService.createSolidColors(value).filter((item, index) => index < 56);
  }

  @Output()
  public close: EventEmitter<string> = new EventEmitter();

  @Output()
  public colorCharacteristic: EventEmitter<ColorCharacteristic> = new EventEmitter();

  public currentPage: string = Page.SOLID;

  public Page = Page;

  public solidColors;

  public get isCurrentFavorite(): boolean {
    return this.favorites.indexOf(this.internalColor.hex) !== -1;
  }

  public favorites = [];
  public lastUsed = [];

  color = new FormControl();
  redColor = new FormControl();
  greenColor = new FormControl();
  blueColor = new FormControl();
  hexColor = new FormControl();

  constructor(private zone: NgZone, private paletteService: NgxPaletteService, private colorStore: NgxColorStoreService) {
    this.solidColors = this.paletteService.createSolidColors().filter((item, index) => index < 56);
  }

  ngOnInit() {
    this.colorUpdateListener = () => {
      this.color.setValue(this.internalColor.hex, {onlySelf: true, emitEvent: false});
      this.redColor.setValue(this.internalColor.red, {onlySelf: true, emitEvent: false});
      this.greenColor.setValue(this.internalColor.green, {onlySelf: true, emitEvent: false});
      this.blueColor.setValue(this.internalColor.blue, {onlySelf: true, emitEvent: false});
      this.hexColor.setValue(this.internalColor.hex.substr(1), {onlySelf: true, emitEvent: false});
      if (this.autoCommit) {
        this.commitValue();
      }
    };
    this.subscriptions.push(this.colorStore.get(this.FAVORITES_KEY).subscribe(fav => this.favorites = fav));
    this.subscriptions.push(this.colorStore.get(this.LAST_USED_KEY).subscribe(lu => this.lastUsed = lu));

    this.subscriptions.push(this.color.valueChanges.subscribe(() => {
      if (this.internalColor.hex !== this.color.value) {
        this.internalColor.parse(this.color.value);
      }
    }));

    this.subscriptions.push(this.blueColor.valueChanges.subscribe(() => {
      const clr = parseInt(this.blueColor.value, 10);
      if (this.internalColor.blue !== clr) {
        this.internalColor.blue = clr;
      }
    }));

    this.subscriptions.push(this.greenColor.valueChanges.subscribe(() => {
      const clr = parseInt(this.greenColor.value, 10);
      if (this.internalColor.green !== clr) {
        this.internalColor.green = clr;
      }
    }));

    this.subscriptions.push(this.redColor.valueChanges.subscribe(() => {
      const clr = parseInt(this.redColor.value, 10);
      if (this.internalColor.red !== clr) {
        this.internalColor.red = clr;
      }
    }));

    this.subscriptions.push(this.hexColor.valueChanges.subscribe(() => {
      if (this.hexColor.value.length === 6 && this.internalColor.hex !== this.hexColor.value) {
        this.internalColor.parse(`#${this.hexColor.value}`);
      }
    }));

    this.internalColor.addEventListener(ColorEvent.UPDATED, this.colorUpdateListener);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
    this.internalColor.removeEventListener(ColorEvent.UPDATED, this.colorUpdateListener);
  }

  public setActive(color: string) {
    this.internalColor.parse(color);
  }

  public addToFavorite() {
    if (this.isCurrentFavorite) {
      this.colorStore.remove(this.FAVORITES_KEY, this.internalColor.hex);
    } else {
      this.colorStore.add(this.FAVORITES_KEY, this.internalColor.hex, 56);
    }
  }

  public closeClicked() {
    this.close.emit(GenerateColorString(this.internalColor, this.colorFormat));
    if (!this.autoCommit) {
      this.commitValue();
    }
  }

  private commitValue() {
    const hex = this.internalColor.hex;
    if (this.lastUsed.indexOf(hex) === -1) {
      this.colorStore.add(this.LAST_USED_KEY, hex, 8);
    }
    this.colorCharacteristic.emit({
      lightness: this.internalColor.lightness,
      saturation: this.internalColor.saturation,
      hue: this.internalColor.hue,
      r: this.internalColor.red,
      g: this.internalColor.green,
      b: this.internalColor.blue
    });
  }
}
