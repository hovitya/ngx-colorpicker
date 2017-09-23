import { Injectable } from '@angular/core';
import { Color } from '../common/color';

@Injectable()
export class NgxPaletteService {
  constructor() { }

  createColor(color?: any) {
    return new Color(color);
  }

  toHex(clr) {
    const color = this.createColor(clr);
    return color.hex;
  }

  createSolidColors(base?, lightness?, renderGrey?) {
    const newColors = [];
    let baseColors = ['#333ECF', '#6A3FC4', '#C53E3E', '#E89C30', '#E3E31F', '#40C353'];
    let lightnessValues = [73, 65, 51, 43, 34, 24];
    const colorDisposable = this.createColor();
    if (base) {
      baseColors = base;
    }
    if (lightness) {
      lightnessValues = lightness;
    }
    if (renderGrey === undefined) {
      renderGrey = true;
    }
    const greyStep = 50 / baseColors.length;
    let currentGrey1 = 100;
    let currentGrey2 = 50;
    for (const i in baseColors) {
      if (baseColors.hasOwnProperty(i)) {
        if (renderGrey) {
          colorDisposable.parse('#000000');
          colorDisposable.lightness = currentGrey1;
          newColors.push(colorDisposable.hex);
          colorDisposable.lightness = currentGrey2;
          newColors.push(colorDisposable.hex);
        }
        colorDisposable.parse(baseColors[i]);
        for (let j = 0; j < lightnessValues.length; j++) {
          colorDisposable.lightness = lightnessValues[j];
          newColors.push(colorDisposable.hex);
        }
        currentGrey1 -= greyStep;
        currentGrey2 -= greyStep;
      }
    }
    return newColors;
  }

}
