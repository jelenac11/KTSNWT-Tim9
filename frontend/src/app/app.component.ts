import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showNavbar: boolean = true;

  constructor(private router: Router ) {
    this.router.events.subscribe((url: any) => {
      if (this.router.url === '/sign-up' || this.router.url === '/sign-in' || this.router.url.startsWith('/confirm-registration/') || this.router.url === '/forgot-password') {
        this.showNavbar = false;
      } else {
        this.showNavbar = true;
      }
    });
  }
  
}
