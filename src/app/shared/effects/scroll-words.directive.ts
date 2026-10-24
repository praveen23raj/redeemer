import { AfterViewInit, Directive, ElementRef, NgZone, OnDestroy } from '@angular/core';

/**
 * Words light up one after another as the paragraph scrolls through the screen.
 * Usage: <p appScrollWords>Our church is a family...</p>
 */
@Directive({ selector: '[appScrollWords]', standalone: true })
export class ScrollWordsDirective implements AfterViewInit, OnDestroy {
  private words: HTMLElement[] = [];
  private raf = 0;
  private onScroll = () => { cancelAnimationFrame(this.raf); this.raf = requestAnimationFrame(() => this.update()); };

  constructor(private el: ElementRef<HTMLElement>, private zone: NgZone) {}

  ngAfterViewInit() {
    const root = this.el.nativeElement;
    const text = root.textContent?.replace(/\s+/g, ' ').trim() || '';
    root.setAttribute('aria-label', text);
    root.textContent = '';
    text.split(' ').forEach((w, i, arr) => {
      const s = document.createElement('span');
      s.textContent = w + (i < arr.length - 1 ? ' ' : '');
      s.className = 'sw';
      s.setAttribute('aria-hidden', 'true');
      root.appendChild(s);
      this.words.push(s);
    });
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      this.words.forEach(w => w.classList.add('on'));
      return;
    }
    this.zone.runOutsideAngular(() => {
      window.addEventListener('scroll', this.onScroll, { passive: true });
      window.addEventListener('resize', this.onScroll, { passive: true });
    });
    this.update();
  }

  private update() {
    const r = this.el.nativeElement.getBoundingClientRect();
    const vh = window.innerHeight;
    // 0 when the top hits 85% of the screen, 1 when the bottom reaches 45%
    const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.4)));
    const lit = Math.round(p * this.words.length);
    this.words.forEach((w, i) => w.classList.toggle('on', i < lit));
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.onScroll);
    cancelAnimationFrame(this.raf);
  }
}
