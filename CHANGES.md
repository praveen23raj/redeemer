# Changes (based on your original src)

Only these files changed. Everything else is exactly as you had it.

1. **Mobile scrolling fix** (`src/styles.css`)
   - Both `html` and `body` had `height: 100%` plus `overflow-x: hidden`.
   - That made `<body>` its own scroll box instead of the page. On phones, scrolling got stuck or felt broken, and scroll-based effects never fired.
   - Fixed: the page now scrolls normally.
2. **New navbar (updated)** (`src/app/shared/navbar/*`)
   - Same dark-glass and gold style. The logo is now two lines (Redeemer / Evangelical Prayer House) with a cross badge, so it never wraps.
   - New "Plan a Visit" button, and the bar darkens as you scroll.
   - On mobile (980 px and below): a hamburger opens a slide-in menu with all the links, plus Plan a Visit, Call and Directions buttons.
   - The menu closes on link tap, the ✕ button, tapping outside, or Esc.
3. **Home hero** (`src/app/pages/home/home.component.*`, `src/assets/image/church-building.webp`)
   - Your church building replaces the stock concert photo.
   - Desktop: text on the left, building on the right with a slow zoom.
   - Mobile: building on top, text below it.
   - New "Our Church · Gunjurpalya" location tag.
   - "Join Us This Sunday" now opens the Contact page.
4. **Small fixes**
   - Each new page opens at the top (`app.config.ts`).
   - Closing a leadership profile no longer leaves sideways scrolling (`leadership.component.ts`).
   - Google Fonts now load from `index.html`, so the navbar fonts work on every page.

## Update 2
- **Navbar:** redesigned as a modern floating glass capsule. Pill-style links, with the active page highlighted in gold. Clean Inter font. "Plan a Visit →" button. The bar shrinks as you scroll. The mobile menu is a rounded slide-in panel.
- **Home hero:** the FULL church photo is shown, with nothing cropped. On desktop it sits on the right; on mobile it sits on top, with the text below.
- **About page (mobile):** the hero had a fixed height, so "Glorifying God • Serving People • Transforming Lives" overflowed. It now grows with its content.
