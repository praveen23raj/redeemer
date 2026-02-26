import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

    ngAfterViewInit() {
     const obs = new IntersectionObserver(entries => {
       entries.forEach(e => {
         if (e.isIntersecting) {
           e.target.classList.add('visible');
           obs.unobserve(e.target);
         }
       });
     }, { threshold: 0.12 });
     document.querySelectorAll('.reveal-up,.reveal-left,.reveal-right')
       .forEach(el => obs.observe(el));
   }

}
