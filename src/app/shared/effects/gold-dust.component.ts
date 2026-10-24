import { AfterViewInit, Component, ElementRef, Input, NgZone, OnDestroy, ViewChild } from '@angular/core';

/** Softly glowing gold particles drifting upward. Fills its parent; pauses when off-screen. */
@Component({
  selector: 'app-gold-dust',
  standalone: true,
  template: `<canvas #c aria-hidden="true"></canvas>`,
  styles: [`:host{position:absolute;inset:0;pointer-events:none;overflow:hidden}canvas{width:100%;height:100%;display:block}`]
})
export class GoldDustComponent implements AfterViewInit, OnDestroy {
  @Input() density = 60;
  @ViewChild('c') canvas!: ElementRef<HTMLCanvasElement>;
  private raf = 0;
  private visible = true;
  private io?: IntersectionObserver;
  private ro?: ResizeObserver;

  constructor(private zone: NgZone, private host: ElementRef<HTMLElement>) {}

  ngAfterViewInit() {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const cv = this.canvas.nativeElement;
    const ctx = cv.getContext('2d');
    if (!ctx) return;
    let w = 0, h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      w = this.host.nativeElement.clientWidth; h = this.host.nativeElement.clientHeight;
      cv.width = w * dpr; cv.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const count = Math.round(this.density * Math.min(1, w / 1200) + 12);
    const ps = Array.from({ length: count }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 1.8 + 0.4,
      vy: Math.random() * 0.35 + 0.08,
      vx: (Math.random() - 0.5) * 0.15,
      a: Math.random() * 0.6 + 0.2,
      t: Math.random() * Math.PI * 2
    }));

    const draw = () => {
      this.raf = requestAnimationFrame(draw);
      if (!this.visible) return;
      ctx.clearRect(0, 0, w, h);
      for (const p of ps) {
        p.y -= p.vy; p.x += p.vx + Math.sin(p.t += 0.01) * 0.12;
        if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
        const tw = p.a * (0.6 + 0.4 * Math.sin(p.t * 3));
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
        g.addColorStop(0, `rgba(240,215,154,${tw})`);
        g.addColorStop(1, 'rgba(212,168,83,0)');
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2); ctx.fill();
      }
    };
    this.zone.runOutsideAngular(() => {
      this.io = new IntersectionObserver(([e]) => this.visible = e.isIntersecting);
      this.io.observe(this.host.nativeElement);
      this.ro = new ResizeObserver(resize);
      this.ro.observe(this.host.nativeElement);
      draw();
    });
  }

  ngOnDestroy() { cancelAnimationFrame(this.raf); this.io?.disconnect(); this.ro?.disconnect(); }
}
