import { AfterViewInit, Directive, ElementRef, Input, OnDestroy } from "@angular/core";

@Directive({
  selector: 'video[backlight]',
})
export class VideoBacklightComponent implements AfterViewInit, OnDestroy {

  private readonly videoPlayer: HTMLVideoElement;
  private readonly canvasContext: CanvasRenderingContext2D | null;
  private readonly canvas: HTMLCanvasElement;

  private requestId = 0;

  /**
   * offset-x or offset-y(depending on the side).
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow
   */
  @Input()
  delta: Number = 40;

  /**
   * The larger this value, the bigger the blur, so the shadow becomes bigger and lighter.
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow
   */
  @Input()
  blur_radius: Number = 40;

  /**
   * The larger this value, the bigger the shadow.
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow
   */
  @Input()
  spread_radius: Number = 40;

  /**
   * The lower this value, the more transparent the shadow
   */
  @Input()
  alpha: Number = 0.3;

  constructor(
    private video: ElementRef
  ) {
    this.videoPlayer = video.nativeElement

    this.canvas = document.createElement('canvas')
    this.canvasContext = this.canvas.getContext("2d", { willReadFrequently: true })
  }

  ngOnDestroy() {
    window.cancelAnimationFrame(this.requestId);
  }

  ngAfterViewInit() {
    this.requestId = window.requestAnimationFrame(this.onUpdate);
  }

  onUpdate = () => {
    const colorTop = this.getEdgeColor(0, 0, this.videoPlayer.clientWidth, 20)
    const colorBottom = this.getEdgeColor(0, this.videoPlayer.clientHeight - 20, this.videoPlayer.clientWidth, 20)
    const colorLeft = this.getEdgeColor(0, 0, 20, this.videoPlayer.clientHeight)
    const colorRight = this.getEdgeColor(this.videoPlayer.clientWidth - 20, 0, 20, this.videoPlayer.clientHeight)

    this.videoPlayer.style.boxShadow = [
      `0px -${this.delta}px ${this.blur_radius}px ${this.spread_radius}px rgba(${colorTop[0]}, ${colorTop[1]}, ${colorTop[2]}, ${this.alpha})`,
      `${this.delta}px 0px ${this.blur_radius}px ${this.spread_radius}px rgba(${colorRight[0]}, ${colorRight[1]}, ${colorRight[2]}, ${this.alpha})`,
      `0px ${this.delta}px ${this.blur_radius}px ${this.spread_radius}px rgba(${colorBottom[0]}, ${colorBottom[1]}, ${colorBottom[2]}, ${this.alpha})`,
      `-${this.delta}px 0px ${this.blur_radius}px ${this.spread_radius}px rgba(${colorLeft[0]}, ${colorLeft[1]}, ${colorLeft[2]}, ${this.alpha})`
    ].join(', ')

    this.requestId = window.requestAnimationFrame(this.onUpdate);
  }

  private getEdgeColor = (left: number, top: number, width: number, height: number): Array<number> => {
    if (this.canvasContext != null) {
      let factor;
      let destWidth;
      let destHeight;

      if (width > height) {
        factor = width / height;
        destWidth = 100;
        destHeight = Math.round(destWidth / factor);
      } else {
        factor = height / width;
        destHeight = 100;
        destWidth = Math.round(destHeight / factor);
      }

      if (
        destWidth > width || destHeight > height ||
        destWidth < 10 || destHeight < 10
      ) {
        destWidth = width;
        destHeight = height;
      }

      this.canvas.width = destWidth
      this.canvas.height = destHeight

      this.canvasContext.clearRect(0, 0, destWidth, destHeight)
      this.canvasContext.drawImage(
        this.videoPlayer,
        left,
        top,
        width,
        height,
        0,
        0,
        destWidth,
        destHeight
      )

      const bitmapData = this.canvasContext.getImageData(0, 0, this.videoPlayer.clientWidth, this.videoPlayer.clientHeight).data

      const bytesPerPixel = 4;
      const len = bitmapData.length - bitmapData.length % bytesPerPixel;
      const step = bytesPerPixel;

      let redTotal = 0;
      let greenTotal = 0;
      let blueTotal = 0;
      let alphaTotal = 0;

      // Alpha for more saturation
      for (let i = 0; i < len; i += step) {
        const alpha = bitmapData[i + 3];
        const red = bitmapData[i] * alpha;
        const green = bitmapData[i + 1] * alpha;
        const blue = bitmapData[i + 2] * alpha;

        redTotal += red;
        greenTotal += green;
        blueTotal += blue;
        alphaTotal += alpha;
      }

      return [
        Math.round(redTotal / alphaTotal),
        Math.round(greenTotal / alphaTotal),
        Math.round(blueTotal / alphaTotal)
      ]
    }

    return [0, 0, 0]
  }
}
