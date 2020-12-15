import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }

}
