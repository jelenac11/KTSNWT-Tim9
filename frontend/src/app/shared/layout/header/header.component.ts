import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/response/user.model';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { JwtService } from 'src/app/core/services/jwt.service';
import { UserService } from 'src/app/core/services/user.service';
import { ChangePasswordComponent } from '../../../user-profile/change-password/change-password.component';
import { ProfileComponent } from '../../../user-profile/profile/profile.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  role = '';
  user: User = { email: '', username: '', firstName: '', lastName: '' };

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private dialog: MatDialog,
    private jwtService: JwtService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.role = this.jwtService.getRole();
    if (this.role) {
      this.userService.getCurrentUser().subscribe((currentUser: User) => {
        this.user = currentUser;
      });
    }
  }

  logout(): void {
    this.authenticationService.logout();
    this.role = '';
    this.router.navigate(['/']);
  }

  showProfile(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.minHeight = '440px';
    dialogConfig.minWidth = '400px';
    const dialogProfile = this.dialog.open(ProfileComponent, dialogConfig);
    dialogProfile.afterClosed().subscribe((confirmed: boolean) => {
      if (this.role) {
        this.userService.getCurrentUser().subscribe((currentUser: User) => {
          this.user = currentUser;
        });
      }
    });
  }

  changePassword(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.minWidth = '320px';
    this.dialog.open(ChangePasswordComponent, dialogConfig);
  }

}
