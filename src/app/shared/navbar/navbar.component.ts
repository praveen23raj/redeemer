import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  scrolled = false;
  menuOpen = false;

  links = [
    { path: '/', label: 'Home', exact: true },
    { path: '/about', label: 'About', exact: false },
    { path: '/ministries', label: 'Ministries', exact: false },
    // { path: '/sermons', label: 'Sermons', exact: false },
    { path: '/leadership', label: 'Leadership', exact: false },
    { path: '/contact', label: 'Contact', exact: false }
  ];

  constructor(router: Router) {
    // close the mobile menu after every navigation
    router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(() => this.setMenu(false));
  }

  @HostListener('window:scroll')
  onScroll() { this.scrolled = window.scrollY > 20; }

  @HostListener('document:keydown.escape')
  onEsc() { if (this.menuOpen) this.setMenu(false); }

  @HostListener('window:resize')
  onResize() { if (window.innerWidth > 980 && this.menuOpen) this.setMenu(false); }

  toggleMenu() { this.setMenu(!this.menuOpen); }

  closeMenu() { this.setMenu(false); }

  private setMenu(open: boolean) {
    this.menuOpen = open;
    document.body.style.overflow = open ? 'hidden' : '';
  }
}
