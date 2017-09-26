import { Directive, ElementRef, HostBinding, Input } from '@angular/core';
import { Color } from '../common/color';

@Directive({
  selector: '[ngxColorDisplay]'
})
export class NgxColorDisplayDirective {
  private innerColor: Color;
  @HostBinding('style.background-color') backgroundColor: string;

  @Input()
  set ngxColorDisplay(value: string) {
    if (value) {
      this.innerColor.parse(value);
      this.backgroundColor = this.innerColor.hex;
    }
  }

  get ngxColorDisplay(): string {
    return this.backgroundColor;
  }

  constructor() {
    this.innerColor = new Color();
  }
}
