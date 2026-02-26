import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  ngAfterViewInit() {
    this.checkSections();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.checkSections();
  }

  checkSections() {
    const sections = document.querySelectorAll('.fade-section');

    sections.forEach((section: any) => {
      const position = section.getBoundingClientRect().top;
      const screenHeight = window.innerHeight;

      if (position < screenHeight - 100) {
        section.classList.add('visible');
      }
    });
  }
}
