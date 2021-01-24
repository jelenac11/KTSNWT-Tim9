import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserPage } from 'src/app/core/models/response/user-page.model';
import { JwtService } from 'src/app/core/services/jwt.service';
import { UserService } from 'src/app/core/services/user.service';
import { ConfirmationDialogComponent } from 'src/app/shared/dialogs/confirmation-dialog/confirmation-dialog.component';
import { Snackbar } from 'src/app/shared/snackbars/snackbar/snackbar';
import { AddAdminComponent } from '../add-admin/add-admin.component';

@Component({
  selector: 'app-users-review',
  templateUrl: './users-review.component.html',
  styleUrls: ['./users-review.component.scss']
})
export class UsersReviewComponent implements OnInit {
  clicked = 'a';
  tabs: string[] = ['Administrators', 'Registered users'];
  users: UserPage;
  page = 1;
  size = 10;
  searchValue = '';
  currentTab = 0;
  isAdmin = true;
  loggedIn = '';

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private dialog: MatDialog,
    private snackBar: Snackbar
  ) { }

  ngOnInit(): void {
    this.users = { content: [], totalElements: 0 };
    this.getUsers();
    const jwt: JwtHelperService = new JwtHelperService();
    this.loggedIn = jwt.decodeToken(this.jwtService.getToken().accessToken).sub;
  }

  getUsers(): void {
    if (!this.searchValue) {
      if (this.currentTab === 0) {
        this.userService.getUsers(this.size, this.page - 1, 'admins').subscribe((data: UserPage) => {
          const without = data.content.filter(admin => admin.email !== this.loggedIn);
          this.users = { content: without, totalElements: data.totalElements };
        });
      } else {
        this.userService.getUsers(this.size, this.page - 1, 'registered-users').subscribe((data: UserPage) => {
          this.users = data;
        });
      }
    } else {
      if (this.currentTab === 0) {
        console.log(this.searchValue);
        this.userService.searchUsers(this.size, this.page - 1, this.searchValue, 'admins').subscribe((data: UserPage) => {
          const without = data.content.filter(admin => admin.email !== this.loggedIn);
          this.users = {content: without, totalElements: data.totalElements};
        });
      } else {
        this.userService.searchUsers(this.size, this.page - 1, this.searchValue, 'registered-users').subscribe((data: UserPage) => {
          this.users = data;
        });
      }
    }
  }

  changeTab($event: MatTabChangeEvent): void {
    this.currentTab = $event.index;
    if (this.currentTab !== 0) {
      this.isAdmin = false;
    } else {
      this.isAdmin = true;
    }
    this.page = 1;
    this.getUsers();
  }

  handlePageChange($event: number): void {
    this.page = $event;
    this.getUsers();
  }

  searchChanged(value: string): void {
    this.searchValue = value;
    this.getUsers();
  }

  openDialog(id: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Are you sure you want to delete this admin?',
        buttonText: {
          ok: 'Yes',
          cancel: 'No'
        }
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.delete(id);
      }
    });
  }

  delete(id: number): void {
    this.userService.delete(id).subscribe((succ: string) => {
      this.getUsers();
      this.snackBar.success('You have successfully deleted admin!');
    }, err => {
      this.snackBar.error(err.error);
    });
  }

  addAdmin(): void {
    const dialogConfig: MatDialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.minHeight = '440px';
    dialogConfig.minWidth = '400px';
    const dialogRef = this.dialog.open(AddAdminComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.getUsers();
      }
    });
  }

}
