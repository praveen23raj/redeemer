import { Component, Input, NgZone, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Live countdown to the next Sunday Worship (9:30 AM – 12:30 PM, India time),
 * correct for visitors in any timezone. Shows "Live now" during the service.
 */
@Component({
  selector: 'app-countdown',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="cd" [class.cd--compact]="compact" [class.cd--live]="live">
    <ng-container *ngIf="!live; else liveTpl">
      <div class="cd__unit" *ngFor="let u of units">
        <span class="cd__num">{{ u.v }}</span><span class="cd__lbl">{{ u.l }}</span>
      </div>
    </ng-container>
    <ng-template #liveTpl>
      <span class="cd__dot"></span><span class="cd__live">Worship is happening now — come as you are</span>
    </ng-template>
  </div>`,
  styles: [`
    .cd{display:flex;gap:10px;align-items:center}
    .cd__unit{min-width:74px;padding:12px 10px 10px;border-radius:14px;text-align:center;background:rgba(246,240,228,.05);border:1px solid rgba(212,168,83,.28)}
    .cd__num{display:block;font-family:var(--font-display);font-size:38px;line-height:1;color:var(--ivory);font-variant-numeric:tabular-nums}
    .cd__lbl{display:block;margin-top:6px;font-size:10.5px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:var(--gold)}
    .cd--compact .cd__unit{min-width:58px;padding:9px 6px 7px;border-radius:12px}
    .cd--compact .cd__num{font-size:28px}
    .cd--compact .cd__lbl{font-size:9.5px}
    .cd--live{padding:12px 18px;border-radius:999px;background:rgba(47,158,107,.12);border:1px solid rgba(47,158,107,.4);color:var(--ivory);font-weight:600}
    .cd__dot{width:10px;height:10px;border-radius:50%;background:#3DD68C;box-shadow:0 0 0 0 rgba(61,214,140,.6);animation:p 1.6s infinite}
    @keyframes p{to{box-shadow:0 0 0 12px rgba(61,214,140,0)}}
    @media(max-width:420px){.cd__unit{min-width:0;flex:1}.cd__num{font-size:30px}}
  `]
})
export class CountdownComponent implements OnInit, OnDestroy {
  @Input() compact = false;
  units: { v: string; l: string }[] = [];
  live = false;
  private timer?: ReturnType<typeof setInterval>;

  constructor(private zone: NgZone) {}

  ngOnInit() {
    this.tick();
    this.timer = setInterval(() => this.zone.run(() => this.tick()), 1000);
  }

  ngOnDestroy() { if (this.timer) clearInterval(this.timer); }

  private tick() {
    const IST = 5.5 * 3600e3, DAY = 86400e3;
    const now = Date.now();
    const istMidnight = Math.floor((now + IST) / DAY) * DAY - IST;     // today 00:00 in India, as UTC ms
    const istDay = new Date(now + IST).getUTCDay();                    // 0 = Sunday
    let start = istMidnight + ((7 - istDay) % 7) * DAY + 9.5 * 3600e3; // this/next Sunday 9:30
    const end = start + 3 * 3600e3;
    if (now >= end) start += 7 * DAY;
    this.live = now >= start && now < start + 3 * 3600e3;
    const diff = Math.max(0, start - now);
    const d = Math.floor(diff / DAY), h = Math.floor(diff / 3600e3) % 24, m = Math.floor(diff / 60e3) % 60, s = Math.floor(diff / 1e3) % 60;
    const p = (n: number) => String(n).padStart(2, '0');
    this.units = [{ v: p(d), l: 'Days' }, { v: p(h), l: 'Hours' }, { v: p(m), l: 'Mins' }, { v: p(s), l: 'Secs' }];
  }
}
