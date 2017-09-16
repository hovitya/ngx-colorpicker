///<reference path="../../../../../node_modules/@angular/core/src/metadata/lifecycle_hooks.d.ts"/>
import {
  AfterViewChecked, AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild,
  ViewContainerRef
} from '@angular/core';
import { Color, ColorEvent } from '../common/color';
import { NgxPaletteService } from '../services/ngx-palette.service';
import * as elementResizeDetectorMaker from 'element-resize-detector';

const Parameters = {
  BSCanvasSize: 100,
  MaxHue: 360,
  Opaque: 255,
  DarkLightnessValues: [51, 43, 34, 24]
};

@Component({
  selector: 'ngx-color-shades',
  templateUrl: './ngx-color-shades.component.html',
  styleUrls: ['./ngx-color-shades.component.scss']
})
export class NgxColorShadesComponent implements OnInit, OnDestroy, AfterViewInit {
  constructor(private paletteService: NgxPaletteService, public el: ElementRef ) {
    this.tempCanvas = document.createElement('canvas');
    this.tempCanvas.width = Parameters.BSCanvasSize;
    this.tempCanvas.height = Parameters.BSCanvasSize;
    this.internalColor = new Color('skyblue');
  }

  @ViewChild('hueCanvas') hueCanvas: ElementRef;
  @ViewChild('chromeCanvas') chromeCanvas: ElementRef;
  @ViewChild('imageCanvas') imageCanvas: ElementRef;
  @ViewChild('versionCanvas') versionCanvas: ElementRef;

  private lastRenderedHue: string;
  private tempCanvas: HTMLCanvasElement;
  private internalColor: Color;
  private observer;

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.renderHue();
    this.renderImage(this.internalColor.hue);
    this.renderChrome(this.internalColor.hue, this.internalColor.saturation, this.internalColor.brightness);
    this.internalColor.addEventListener(ColorEvent.UPDATED, () => {
      console.log(this.internalColor)
      this.renderImage(this.internalColor.hue);
      this.renderChrome(this.internalColor.hue, this.internalColor.saturation, this.internalColor.brightness);
    });
  }

  private renderHue() {
    const hueCanvas = this.hueCanvas.nativeElement;
    hueCanvas.width = hueCanvas.offsetWidth;
    hueCanvas.height = hueCanvas.offsetHeight;
    const width = hueCanvas.width;
    const step = Parameters.MaxHue / width;
    const ctx = hueCanvas.getContext('2d');
    for (let i = 0; i < width; i++) {
      ctx.strokeStyle = `hsl(${(i * step)},100%,50%)`;
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, hueCanvas.height);
      ctx.stroke();
    }
  }

  private renderChrome(hue, sat, bri) {
    hue = Math.round(hue);
    sat = sat;
    bri = bri;
    const canvas = this.chromeCanvas.nativeElement;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';

    const hueStart = canvas.height - 10;
    const huePercentage = hue / Parameters.MaxHue * 100;
    const centerX = Math.round(canvas.width * (huePercentage / 100.0));
    const centerY = hueStart;
    const radius = 5;

    ctx.beginPath();
    ctx.fillOpacity = 1;
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    ctx.fill();

    // Mark brightness and saturation
    const lightnessPosition = ((bri) / 100) * canvas.width;
    const saturationPosition = (((sat) / 100) * (canvas.height - 30)) + 10;

    ctx.beginPath();
    ctx.strokeOpacity = 1;
    if (sat < 50 && bri > 50) {
      ctx.strokeStyle = 'black';
    } else {
      ctx.strokeStyle = 'white';
    }
    ctx.lineWidth = 2;
    ctx.arc(lightnessPosition, saturationPosition, radius, 0, 2 * Math.PI, false);
    ctx.stroke();
  }

  private renderImage(hue) {
    if (this.lastRenderedHue === hue) {
      return;
    }
    this.lastRenderedHue = hue;

    // Render saturation and brightness
    const color = new Color(`hsl(${Math.round(hue)},100%,50%)`);
    const hex = color.hex;
    const canvas = this.imageCanvas.nativeElement;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const width = canvas.width,
      height = canvas.height;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, width, height);
    const data = ctx.createImageData(Parameters.BSCanvasSize, Parameters.BSCanvasSize);
    const imageData = data.data;
    const widthScale = width / Parameters.BSCanvasSize;
    const heightScale = height / Parameters.BSCanvasSize;
    for (let y = 0; y < Parameters.BSCanvasSize; y++) {
      for (let x = 0; x < Parameters.BSCanvasSize; x++) {
        const startPoint = ((Parameters.BSCanvasSize * y) + x) * 4;
        color.saturation = y;
        color.brightness = x;
        imageData[startPoint] = color.red;
        imageData[startPoint + 1] = color.green;
        imageData[startPoint + 2] = color.blue;
        imageData[startPoint + 3] = Parameters.Opaque;
      }
    }

    this.tempCanvas.getContext('2d').putImageData(data, 0, 0);
    ctx.save();
    ctx.scale(widthScale, heightScale);
    ctx.drawImage(this.tempCanvas, 0, 0);
    ctx.restore();


    // Render versions
    const versionCanvas = this.versionCanvas.nativeElement;
    versionCanvas.width = canvas.offsetWidth;
    versionCanvas.height = versionCanvas.offsetHeight;
    const versionCtx = versionCanvas.getContext('2d');
    const versionColors = this.paletteService.createSolidColors([hex], Parameters.DarkLightnessValues, false);
    const versionWidth = Math.ceil(width / versionColors.length);
    for (let k = 0; k < versionColors.length; k++) {
      versionCtx.fillStyle = versionColors[k];
      versionCtx.fillRect(k * versionWidth, 0, versionWidth, 10);
    }
  }

  private fixEvent(e) {
    if (! e.hasOwnProperty('offsetX')) {
      let curleft = 0,
        curtop = 0;
      if (e.offsetParent) {
        let obj = e;
        do {
          obj = obj.offsetParent;
          curleft += obj.offsetLeft;
          curtop += obj.offsetTop;
        } while (obj.offsetParent);
      }
      return {
        ...e,
        offsetX: e.layerX - curleft,
        offsetY: e.layerY - curtop
      };
    }
    return e;
  }

  chromeClicked($event: MouseEvent) {
    console.log($event);
    $event = this.fixEvent($event);
    const canvas = this.chromeCanvas.nativeElement;
    let p;
    if ($event.offsetY <= 10) {
      // Variations clicked
      p = this.versionCanvas.nativeElement.getContext('2d').getImageData($event.offsetX, $event.offsetY, 1, 1).data;
      this.internalColor.parse(`rgba(${p[0]},${p[1]},${p[2]},${Parameters.Opaque})`);
    } else if ($event.offsetY > canvas.height - 20) {
      // Hue clicked
      p = this.hueCanvas.nativeElement.getContext('2d').getImageData($event.offsetX, $event.offsetY - canvas.height + 20, 1, 1).data;
      this.internalColor.parse(`rgba(${p[0]},${p[1]},${p[2]},${Parameters.Opaque})`);
    } else {
      // BS clicked
      const coord = {
        x: Math.round($event.offsetX / this.chromeCanvas.nativeElement.canvasWidth * 100),
        y: Math.round(($event.offsetY - 10) / this.chromeCanvas.nativeElement.canvasHeight * 100)
      };
      this.internalColor.saturation = coord.x;
      this.internalColor.brightness = coord.y;
    }
  }

  ngOnDestroy(): void {
  }
}
