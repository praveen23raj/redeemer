import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IconComponent } from '../icon/icon.component';
import { CountdownComponent } from '../effects/countdown.component';
import { RevealDirective } from '../reveal/reveal.directive';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule, IconComponent, CountdownComponent, RevealDirective],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  year = new Date().getFullYear();

  // Social links — replace '#' with the real page URLs when available
  socials = [
    { label: 'Facebook', href: '#', svg: 'fb' },
    { label: 'Twitter / X', href: '#', svg: 'x' },
    { label: 'Instagram', href: '#', svg: 'ig' },
    { label: 'YouTube', href: '#', svg: 'yt' }
  ];

  leaders = [
    { role: 'Evangelist', name: 'Evan. Prakash', tel: '+919980338541', phone: '99803 38541' },
    { role: 'Evangelist', name: 'Evan. Krupananda', tel: '+919739180776', phone: '97391 80776' },
    { role: 'Pastor', name: 'Pastor. Seleena Karunakaran', tel: '+919945392964', phone: '99453 92964' }
  ];
}
