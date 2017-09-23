import { Color } from './color';

export enum ColorFormat {
  RGB, HEX, HSL
}

export function GenerateColorString(color: Color, format: ColorFormat): string {
  switch (format) {
    case ColorFormat.HEX:
      return color.hex;
    case ColorFormat.HSL:
      return color.HSL;
    case ColorFormat.RGB:
      return color.RGB;
  }
}
