import { AfterViewInit, Directive, ElementRef, Input, OnDestroy } from '@angular/core';

/** Counts a number up from 0 when it scrolls into view. Usage: <span [appCountUp]="16" suffix="+"></span> */
@Directive({ selector: '[appCountUp]', standalone: true })
export class CountUpDirective implements AfterViewInit, OnDestroy {
  @Input('appCountUp') value = 0;
  @Input() suffix = '';
  @Input() duration = 1800;
  private io?: IntersectionObserver;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngAfterViewInit() {
    const node = this.el.nativeElement;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce || typeof IntersectionObserver === 'undefined') { node.textContent = this.value + this.suffix; return; }
    node.textContent = '0' + this.suffix;
    this.io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      this.io?.disconnect();
      const start = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / this.duration);
        const eased = 1 - Math.pow(1 - p, 4);
        node.textContent = Math.round(this.value * eased) + this.suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    this.io.observe(node);
  }

  ngOnDestroy() { this.io?.disconnect(); }
}
