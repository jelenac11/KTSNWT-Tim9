import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showNavbar = true;

  constructor(
    private router: Router
  ) {
    this.router.events.subscribe((url: any) => {
      if (this.router.url === '/auth/sign-up' ||
        this.router.url === '/auth/sign-in' ||
        this.router.url.startsWith('/auth/confirm-registration/') ||
        this.router.url === '/auth/forgot-password') {
        this.showNavbar = false;
      } else {
        this.showNavbar = true;
      }
    });
  }

}
