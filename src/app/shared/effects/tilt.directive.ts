import { Directive, ElementRef, HostListener, Input } from '@angular/core';

/** Subtle 3D tilt that follows the pointer (desktop only). Usage: <div appTilt> */
@Directive({ selector: '[appTilt]', standalone: true })
export class TiltDirective {
  @Input() tiltMax = 6;
  private fine = typeof window !== 'undefined' && !!window.matchMedia?.('(hover: hover) and (pointer: fine)').matches
    && !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  constructor(private el: ElementRef<HTMLElement>) {}

  @HostListener('mousemove', ['$event'])
  move(e: MouseEvent) {
    if (!this.fine) return;
    const n = this.el.nativeElement, r = n.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    n.style.transform = `perspective(900px) rotateY(${x * this.tiltMax}deg) rotateX(${-y * this.tiltMax}deg) translateY(-4px)`;
    n.style.setProperty('--mx', `${(x + 0.5) * 100}%`);
    n.style.setProperty('--my', `${(y + 0.5) * 100}%`);
  }

  @HostListener('mouseleave')
  leave() { this.el.nativeElement.style.transform = ''; }
}
