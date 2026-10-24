import { AfterViewInit, Directive, ElementRef, Input, OnDestroy } from '@angular/core';

/**
 * Cinematic headline reveal: splits the text into words that slide up one by one
 * when the element scrolls into view. Keeps inline tags like <em> and <br>.
 * Usage: <h1 appSplit>Where Faith <em>Meets Grace</em></h1>
 */
@Directive({ selector: '[appSplit]', standalone: true })
export class SplitDirective implements AfterViewInit, OnDestroy {
  @Input() splitDelay = 0;
  private io?: IntersectionObserver;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngAfterViewInit() {
    const root = this.el.nativeElement;
    let i = 0;
    const walk = (node: Node) => {
      Array.from(node.childNodes).forEach(child => {
        if (child.nodeType === Node.TEXT_NODE) {
          const parts = (child.textContent || '').split(/(\s+)/);
          const frag = document.createDocumentFragment();
          parts.forEach(part => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
            const outer = document.createElement('span');
            outer.className = 'split-word';
            const inner = document.createElement('span');
            inner.textContent = part;
            inner.style.setProperty('--i', String(i++));
            outer.appendChild(inner);
            frag.appendChild(outer);
          });
          child.replaceWith(frag);
        } else if (child.nodeType === Node.ELEMENT_NODE && (child as HTMLElement).tagName !== 'BR') {
          walk(child);
        }
      });
    };
    walk(root);
    root.setAttribute('aria-label', root.textContent?.replace(/\s+/g, ' ').trim() || '');
    root.classList.add('split-ready');
    if (this.splitDelay) root.style.setProperty('--split-delay', `${this.splitDelay}s`);

    if (typeof IntersectionObserver === 'undefined') { root.classList.add('is-visible'); return; }
    this.io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { root.classList.add('is-visible'); this.io?.disconnect(); }
    }, { threshold: 0.2 });
    this.io.observe(root);
  }

  ngOnDestroy() { this.io?.disconnect(); }
}
