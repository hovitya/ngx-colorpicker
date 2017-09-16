/*
 * Ported from https://github.com/moagrius/Color-1
 * License Unknown
 */
import { EventDispatcher, RokkEvent } from './event-dispatcher';

export const namedColors: Object = {
  'transparent': 'rgba(0, 0, 0, 0)',
  'aliceblue': '#F0F8FF',
  'antiquewhite': '#FAEBD7',
  'aqua': '#00FFFF',
  'aquamarine': '#7FFFD4',
  'azure': '#F0FFFF',
  'beige': '#F5F5DC',
  'bisque': '#FFE4C4',
  'black': '#000000',
  'blanchedalmond': '#FFEBCD',
  'blue': '#0000FF',
  'blueviolet': '#8A2BE2',
  'brown': '#A52A2A',
  'burlywood': '#DEB887',
  'cadetblue': '#5F9EA0',
  'chartreuse': '#7FFF00',
  'chocolate': '#D2691E',
  'coral': '#FF7F50',
  'cornflowerblue': '#6495ED',
  'cornsilk': '#FFF8DC',
  'crimson': '#DC143C',
  'cyan': '#00FFFF',
  'darkblue': '#00008B',
  'darkcyan': '#008B8B',
  'darkgoldenrod': '#B8860B',
  'darkgray': '#A9A9A9',
  'darkgrey': '#A9A9A9',
  'darkgreen': '#006400',
  'darkkhaki': '#BDB76B',
  'darkmagenta': '#8B008B',
  'darkolivegreen': '#556B2F',
  'darkorange': '#FF8C00',
  'darkorchid': '#9932CC',
  'darkred': '#8B0000',
  'darksalmon': '#E9967A',
  'darkseagreen': '#8FBC8F',
  'darkslateblue': '#483D8B',
  'darkslategray': '#2F4F4F',
  'darkslategrey': '#2F4F4F',
  'darkturquoise': '#00CED1',
  'darkviolet': '#9400D3',
  'deeppink': '#FF1493',
  'deepskyblue': '#00BFFF',
  'dimgray': '#696969',
  'dimgrey': '#696969',
  'dodgerblue': '#1E90FF',
  'firebrick': '#B22222',
  'floralwhite': '#FFFAF0',
  'forestgreen': '#228B22',
  'fuchsia': '#FF00FF',
  'gainsboro': '#DCDCDC',
  'ghostwhite': '#F8F8FF',
  'gold': '#FFD700',
  'goldenrod': '#DAA520',
  'gray': '#808080',
  'grey': '#808080',
  'green': '#008000',
  'greenyellow': '#ADFF2F',
  'honeydew': '#F0FFF0',
  'hotpink': '#FF69B4',
  'indianred': '#CD5C5C',
  'indigo': '#4B0082',
  'ivory': '#FFFFF0',
  'khaki': '#F0E68C',
  'lavender': '#E6E6FA',
  'lavenderblush': '#FFF0F5',
  'lawngreen': '#7CFC00',
  'lemonchiffon': '#FFFACD',
  'lightblue': '#ADD8E6',
  'lightcoral': '#F08080',
  'lightcyan': '#E0FFFF',
  'lightgoldenrodyellow': '#FAFAD2',
  'lightgray': '#D3D3D3',
  'lightgrey': '#D3D3D3',
  'lightgreen': '#90EE90',
  'lightpink': '#FFB6C1',
  'lightsalmon': '#FFA07A',
  'lightseagreen': '#20B2AA',
  'lightskyblue': '#87CEFA',
  'lightslategray': '#778899',
  'lightslategrey': '#778899',
  'lightsteelblue': '#B0C4DE',
  'lightyellow': '#FFFFE0',
  'lime': '#00FF00',
  'limegreen': '#32CD32',
  'linen': '#FAF0E6',
  'magenta': '#FF00FF',
  'maroon': '#800000',
  'mediumaquamarine': '#66CDAA',
  'mediumblue': '#0000CD',
  'mediumorchid': '#BA55D3',
  'mediumpurple': '#9370D8',
  'mediumseagreen': '#3CB371',
  'mediumslateblue': '#7B68EE',
  'mediumspringgreen': '#00FA9A',
  'mediumturquoise': '#48D1CC',
  'mediumvioletred': '#C71585',
  'midnightblue': '#191970',
  'mintcream': '#F5FFFA',
  'mistyrose': '#FFE4E1',
  'moccasin': '#FFE4B5',
  'navajowhite': '#FFDEAD',
  'navy': '#000080',
  'oldlace': '#FDF5E6',
  'olive': '#808000',
  'olivedrab': '#6B8E23',
  'orange': '#FFA500',
  'orangered': '#FF4500',
  'orchid': '#DA70D6',
  'palegoldenrod': '#EEE8AA',
  'palegreen': '#98FB98',
  'paleturquoise': '#AFEEEE',
  'palevioletred': '#D87093',
  'papayawhip': '#FFEFD5',
  'peachpuff': '#FFDAB9',
  'peru': '#CD853F',
  'pink': '#FFC0CB',
  'plum': '#DDA0DD',
  'powderblue': '#B0E0E6',
  'purple': '#800080',
  'red': '#FF0000',
  'rosybrown': '#BC8F8F',
  'royalblue': '#4169E1',
  'saddlebrown': '#8B4513',
  'salmon': '#FA8072',
  'sandybrown': '#F4A460',
  'seagreen': '#2E8B57',
  'seashell': '#FFF5EE',
  'sienna': '#A0522D',
  'silver': '#C0C0C0',
  'skyblue': '#87CEEB',
  'slateblue': '#6A5ACD',
  'slategray': '#708090',
  'slategrey': '#708090',
  'snow': '#FFFAFA',
  'springgreen': '#00FF7F',
  'steelblue': '#4682B4',
  'tan': '#D2B48C',
  'teal': '#008080',
  'thistle': '#D8BFD8',
  'tomato': '#FF6347',
  'turquoise': '#40E0D0',
  'violet': '#EE82EE'
};

export class ColorEvent extends RokkEvent {
  static RGB_UPDATED = 'RGBUpdated';
  static HSL_UPDATED = 'HSLUpdated';
  static HSV_UPDATED = 'HSVUpdated';
  static HEX_UPDATED = 'HexUpdated';
  static INT_UPDATED = 'IntUpdated';
  static UPDATED = 'updated';
}
/* tslint:disable:no-bitwise */
export class Color extends EventDispatcher {
  private isHex: RegExp = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i;
  private isHSL: RegExp = /^hsla?\((\d{1,3}?),\s*(\d{1,3}%),\s*(\d{1,3}%)(,\s*[01]?\.?\d*)?\)$/;
  private isRGB: RegExp = /^rgba?\((\d{1,3}%?),\s*(\d{1,3}%?),\s*(\d{1,3}%?)(,\s*[01]?\.?\d*)?\)$/;
  private isPercent: RegExp = /^\d+(\.\d+)*%$/;

  private hexBit: RegExp = /([0-9a-f])/gi;
  private leadHex: RegExp = /^#/;

  private matchHSL: RegExp = /^hsla?\((\d{1,3}),\s*(\d{1,3})%,\s*(\d{1,3})%(,\s*([01]?\.?\d*))?\)$/;
  private matchRGB: RegExp = /^rgba?\((\d{1,3}%?),\s*(\d{1,3}%?),\s*(\d{1,3}%?)(,\s*([01]?\.?\d*))?\)$/;


  private _decimal = 0;  // 0 - 16777215
  private _hex = '#000000';  // #000000 - #FFFFFF
  private _red = 0;  // 0 - 255
  private _green = 0;  // 0 - 255
  private _blue = 0;  // 0 - 255
  private _hue = 0;  // 0 - 360
  private _saturation = 0;  // 0 - 100
  private _lightness = 0;  // 0 - 100
  private _brightness = 0;  // 0 - 100
  private _alpha = 1;  // 0 - 1


  private oldRGB: string;
  private oldPRGB: string;
  private oldRGBA: string;
  private oldHSL: string;
  private oldHSLA: string;

  private absround(num: number): any {
    return (0.5 + num) * 1;
  }

  toBackgroundCSS(): string {
    return this.RGBA;
  }

  private hue2rgb(a: number, b: number, c: number) {
    if (c < 0) {
      c += 1;
    }
    if (c > 1 ) {
      c -= 1;
    }
    if (c < 1 / 6) {
      return a + (b - a) * 6 * c;
    }
    if (c < 1 / 2) {
      return b;
    }
    if (c < 2 / 3) {
      return a + (b - a) * (2 / 3 - c) * 6;
    }
    return a;
  }

  private p2v(p: string): number {
    return this.isPercent.test(p) ? this.absround(parseInt(p, 10) * 2.55) : p;
  }

  private isNamedColor(key): string {
    const lc = ('' + key).toLowerCase();
    return namedColors.hasOwnProperty(lc)
      ? namedColors[lc]
      : null;
  }

  constructor(value?: any) {
    super();
    const that = this;
    this.addEventListener(ColorEvent.RGB_UPDATED, function (evt: RokkEvent) {
      that._RGBUpdated();
    });
    this.addEventListener(ColorEvent.HEX_UPDATED, function (evt: RokkEvent) {
      that._HEXUpdated();
    });
    this.addEventListener(ColorEvent.HSL_UPDATED, function (evt: RokkEvent) {
      that._HSLUpdated();
    });
    this.addEventListener(ColorEvent.HSV_UPDATED, function (evt: RokkEvent) {
      that._HSVUpdated();
    });
    this.addEventListener(ColorEvent.INT_UPDATED, function (evt: RokkEvent) {
      that._INTUpdated();
    });
    if (value !== null && value !== undefined) {
      this.parse(value);
    }
  }



  parse(value: any): Color {
    if (typeof value === 'undefined') {
      return this;
    }
    switch (true) {
      case isFinite(value):
        this.decimal = value;
        return this;
      case (value instanceof Color):
        this.copy(value);
        return this;
      default:
        let stripped;
        let parts;
        switch (true) {
          case (namedColors.hasOwnProperty(value)):
            value = namedColors[value];
            stripped = value.replace(this.leadHex, '');
            this.decimal = parseInt(stripped, 16);
            return this;
          case this.isHex.test(value):
            stripped = value.replace(this.leadHex, '');
            if (stripped.length === 3) {
              stripped = stripped.replace(this.hexBit, '$1$1');
            }
            this.decimal = parseInt(stripped, 16);
            return this;
          case this.isRGB.test(value):
            parts = value.match(this.matchRGB);
            this.red = this.p2v(parts[1]);
            this.green = this.p2v(parts[2]);
            this.blue = this.p2v(parts[3]);
            this.alpha = parseFloat(parts[5]) || 1;
            return this;
          case this.isHSL.test(value):
            parts = value.match(this.matchHSL);
            this.hue = parseInt(parts[1], 10);
            this.saturation = parseInt(parts[2], 10);
            this.lightness = parseInt(parts[3], 10);
            this.alpha = parseFloat(parts[5]) || 1;
            return this;
        }
    }
    return this;
  }

  clone(): Color {
    return new Color(this.decimal);
  }

  copy(color: Color): Color {
    this.decimal = color.decimal;
    return this;
  }


  interpolate(destination, factor) {
    if (!(destination instanceof Color)) {
      destination = new Color(destination);
    }
    this._red = this.absround(+(this._red) + (destination._red - this._red) * factor);
    this._green = this.absround(+(this._green) + (destination._green - this._green) * factor);
    this._blue = this.absround(+(this._blue) + (destination._blue - this._blue) * factor);
    this._alpha = this.absround(+(this._alpha) + (destination._alpha - this._alpha) * factor);
    this.dispatchEvent(new ColorEvent(ColorEvent.RGB_UPDATED, false, false));
    this.dispatchEvent(new ColorEvent(ColorEvent.UPDATED, false, false));
    return this;
  }

  private _RGB2HSL(): void {
    const oh = this._hue;
    const os = this._saturation;
    const ol = this._lightness;
    const ob = this._brightness;
    const r = this._red / 255;
    const g = this._green / 255;
    const b = this._blue / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const l = (max + min) / 2;
    const v = max;

    if (max === min) {
      this._hue = 0;
      this._saturation = 0;
      this._lightness = this.absround(l * 100);
      this._brightness = this.absround(v * 100);
      return;
    }

    const d = max - min;
    const s = d / ((l <= 0.5) ? (max + min) : (2 - max - min));
    const h = ((max === r)
      ? (g - b) / d + (g < b ? 6 : 0)
      : (max === g)
        ? ((b - r) / d + 2)
        : ((r - g) / d + 4)) / 6;

    this._hue = this.absround(h * 360);
    this._saturation = this.absround(s * 100);
    this._lightness = this.absround(l * 100);
    this._brightness = this.absround(v * 100);
  }

  private _HSL2RGB = function () {
    const r = this._red;
    const g = this._green;
    const b = this._blue;
    const h = this._hue / 360;
    const s = this._saturation / 100;
    const l = this._lightness / 100;
    const q = l < 0.5 ? l * (1 + s) : (l + s - l * s);
    const p = 2 * l - q;
    this._red = this.absround(this.hue2rgb(p, q, h + 1 / 3) * 255);
    this._green = this.absround(this.hue2rgb(p, q, h) * 255);
    this._blue = this.absround(this.hue2rgb(p, q, h - 1 / 3) * 255);
  };

  private _HSV2RGB() {
    const or = this._red;
    const og = this._green;
    const ob = this._blue;
    const h = this._hue / 360;
    const s = this._saturation / 100;
    const v = this._brightness / 100;
    let r = 0;
    let g = 0;
    let b = 0;
    const i = Math.floor(h * 6);
    const f = h * 6 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);
    switch (i % 6) {
      case 0:
        r = v, g = t, b = p;
        break;
      case 1:
        r = q, g = v, b = p;
        break;
      case 2:
        r = p, g = v, b = t;
        break;
      case 3:
        r = p, g = q, b = v;
        break;
      case 4:
        r = t, g = p, b = v;
        break;
      case 5:
        r = v, g = p, b = q;
        break;
    }
    this._red = this.absround(r * 255);
    this._green = this.absround(g * 255);
    this._blue = this.absround(b * 255);
  }

  private _INT2HEX() {
    const old = this._hex;
    let x = this._decimal.toString(16);
    x = '000000'.substr(0, 6 - x.length) + x;
    this._hex = '#' + x.toUpperCase();
  }

  private _INT2RGB() {
    const r = this._red;
    const g = this._green;
    const b = this._blue;
    this._red = this._decimal >> 16;
    this._green = (this._decimal >> 8) & 0xFF;
    this._blue = this._decimal & 0xFF;
  }

  private _HEX2INT() {
    const old = this._decimal;
    this._decimal = parseInt(this._hex, 16);
  }

  private _RGB2INT() {
    const old = this._decimal;
    this._decimal = (this._red << 16 | (this._green << 8) & 0xffff | this._blue);
  }

  private _RGBUpdated() {
    this._prepareUpdate();
    this._RGB2INT();  // populate INT values
    this._RGB2HSL();  // populate HSL values
    this._INT2HEX();  // populate HEX values
    this._broadcastUpdate();
  }

  private _HSLUpdated() {
    this._prepareUpdate();
    this._HSL2RGB();  // populate RGB values
    this._RGB2INT();  // populate INT values
    this._INT2HEX();  // populate HEX values
    this._broadcastUpdate();
  }

  private _HSVUpdated() {
    this._prepareUpdate();
    this._HSV2RGB();  // populate RGB values
    this._RGB2INT();  // populate INT values
    this._INT2HEX();  // populate HEX values
    this._broadcastUpdate();
  }

  private _HEXUpdated () {
    this._prepareUpdate();
    this._HEX2INT();  // populate INT values
    this._INT2RGB();  // populate RGB values
    this._RGB2HSL();  // populate HSL values
    this._broadcastUpdate();
  }

  private _INTUpdated() {
    this._prepareUpdate();
    this._INT2RGB();  // populate RGB values
    this._RGB2HSL();  // populate HSL values
    this._INT2HEX();  // populate HEX values
    this._broadcastUpdate();
  }

  private _prepareUpdate() {
    this.oldRGB = this.RGB;
    this.oldPRGB = this.PRGB;
    this.oldRGBA = this.RGBA;
    this.oldHSL = this.HSL;
    this.oldHSLA = this.HSLA;
  }

  private _broadcastUpdate() {
    this.dispatchEvent(new ColorEvent(ColorEvent.UPDATED, false, false));
  }

  get decimal(): number {
    return this._decimal;
  }

  set decimal(value: number) {
    if (this._decimal === value) {
      return;
    }
    const old = this._decimal;
    this._decimal = value;
    this.dispatchEvent(new ColorEvent(ColorEvent.INT_UPDATED));
  }

  get hex(): string {
    return this._hex;
  }

  set hex(value: string) {
    const old = this._hex;
    this._hex = value;
    this.dispatchEvent(new ColorEvent(ColorEvent.HEX_UPDATED));
  }

  get red(): number {
    return this._red;
  }

  set red(value: number) {
    const old = this._red;
    this._red = value;
    this.dispatchEvent(new ColorEvent(ColorEvent.RGB_UPDATED));
  }


  get green(): number {
    return this._green;
  }

  set green(value: number) {
    const old = this._green;
    this._green = value;
    this.dispatchEvent(new ColorEvent(ColorEvent.RGB_UPDATED));
  }

  get blue(): number {
    return this._blue;
  }

  set blue(value: number) {
    this._blue = value;
    this.dispatchEvent(new ColorEvent(ColorEvent.RGB_UPDATED));
  }

  get hue(): number {
    return this._hue;
  }

  set hue(value: number) {
    this._hue = value;
    this.dispatchEvent(new ColorEvent(ColorEvent.HSL_UPDATED));
  }

  get saturation(): number {
    return this._saturation;
  }

  set saturation(value: number) {
    this._saturation = value;
    this.dispatchEvent(new ColorEvent(ColorEvent.HSL_UPDATED));
  }

  get lightness(): number {
    return this._lightness;
  }

  set lightness(value: number) {
    this._lightness = value;
    this.dispatchEvent(new ColorEvent(ColorEvent.HSL_UPDATED));
  }

  get brightness(): number {
    return this._brightness;
  }

  set brightness(value: number) {
    this._brightness = value;
    this.dispatchEvent(new ColorEvent(ColorEvent.HSV_UPDATED));
  }

  get alpha(): number {
    return this._alpha;
  }

  set alpha(value: number) {
    this._prepareUpdate();
    this._alpha = value;
    this._broadcastUpdate();
  }

  get RGB(): string {
    const components = [this.absround(this._red), this.absround(this._green), this.absround(this._blue)];
    return 'rgb(' + components.join(', ') + ')';
  }

  get PRGB(): string {
    const components = [this.absround(100 * this._red / 255) + '%',
      this.absround(100 * this._green / 255) + '%', this.absround(100 * this._blue / 255) + '%'];
    return 'rgb(' + components.join(', ') + ')';
  }

  get RGBA(): string {
    const components = [this.absround(this._red), this.absround(this._green), this.absround(this._blue), this._alpha];
    return 'rgba(' + components.join(', ') + ')';
  }

  get HSL(): string {
    const components = [this.absround(this._hue), this.absround(this._saturation) + '%', this.absround(this._lightness) + '%'];
    return 'hsl(' + components.join(', ') + ')';
  }

  get HSLA(): string {
    const components = [this.absround(this._hue), this.absround(this._saturation) + '%', this.absround(this._lightness) + '%', this._alpha];
    return 'hsla(' + components.join(', ') + ')';
  }

  setFillColor(ctx: CanvasRenderingContext2D, x0: number, y0: number, x1: number, y1: number): void {
    ctx.fillStyle = this.toBackgroundCSS();
  }

  toStringValue(): string {
    return this.hex;
  }
}
