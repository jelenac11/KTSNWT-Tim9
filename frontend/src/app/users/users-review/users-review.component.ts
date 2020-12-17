import { getMultipleValuesInSingleSelectionError } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserPage } from 'src/app/core/models/response/user-page.model';
import { JwtService } from 'src/app/core/services/jwt.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-users-review',
  templateUrl: './users-review.component.html',
  styleUrls: ['./users-review.component.scss']
})
export class UsersReviewComponent implements OnInit {

  clicked: string = 'a';

  tabs: string[] = ['Admins', 'Registered users'];

  users: UserPage;

  page: number = 1;

  size: number = 10;

  searchValue: string = '';

  currentTab: number = 0;

  isAdmin: boolean = true;

  loggedIn: string = '';

  constructor(private userService: UserService, private jwtService: JwtService) { }

  ngOnInit(): void {
    this.users = {content: [], totalElements: 0};
    this.getUsers();
    const jwt: JwtHelperService = new JwtHelperService();
    this.loggedIn = jwt.decodeToken(this.jwtService.getToken().accessToken)['sub'];
    console.log(this.loggedIn);
  }

  getUsers() {
    if (!this.searchValue) {
      if (this.currentTab === 0) {
        this.userService.getUsers(this.size, this.page - 1, 'admins').subscribe(data => {
          let without = data.content.filter(admin => admin.email !== this.loggedIn);
          this.users = {content:without, totalElements: data.totalElements}
        });
      } else {
        this.userService.getUsers(this.size, this.page - 1, 'registered-users').subscribe(data => {
          this.users = data;
        });
      }
    } else {
      if (this.currentTab === 0) {
        console.log(this.searchValue);
        this.userService.searchUsers(this.size, this.page - 1, this.searchValue, 'admins').subscribe(data => {
          let without = data.content.filter(admin => admin.email !== this.loggedIn);
          this.users = {content:without, totalElements: data.totalElements}
        });
      } else {
        this.userService.searchUsers(this.size, this.page - 1, this.searchValue, 'registered-users').subscribe(data => {
          this.users = data;
        });
      }
    }
  }

  changeTab($event: MatTabChangeEvent) {
    this.currentTab = $event.index;
    if (this.currentTab !== 0) {
      this.isAdmin = false;
    } else {
      this.isAdmin = true;
    }
    this.getUsers();
    
  }

  handlePageChange($event: number) {
    this.page = $event;
    this.getUsers();
  }

  searchChanged(value: string) {
    this.searchValue = value;
    this.getUsers();
  };
}
