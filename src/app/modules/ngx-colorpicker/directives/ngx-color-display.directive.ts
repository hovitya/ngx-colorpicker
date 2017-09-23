import { Directive, ElementRef, Input } from '@angular/core';
import { Color } from '../common/color';

@Directive({
  selector: '[ngxColorDisplay]'
})
export class NgxColorDisplayDirective {

  private innerColor: Color;

  @Input()
  set ngxColorDisplay(value: string) {
    if (value) {
      this.innerColor.parse(value);
      this.el.nativeElement.style.backgroundColor = this.innerColor.hex;
    }
  }

  get ngxColorDisplay(): string {
    return this.el.nativeElement.style.backgroundColor;
  }

  constructor(private el: ElementRef) {
    this.innerColor = new Color();
  }
}
