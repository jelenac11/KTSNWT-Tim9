import { DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { NgxPaginationModule } from 'ngx-pagination';
import { Observable, of } from 'rxjs';
import { UserPage } from 'src/app/core/models/response/user-page.model';
import { User } from 'src/app/core/models/response/user.model';
import { JwtService } from 'src/app/core/services/jwt.service';
import { UserService } from 'src/app/core/services/user.service';
import { ConfirmationDialogComponent } from 'src/app/shared/dialogs/confirmation-dialog/confirmation-dialog.component';
import { Snackbar } from 'src/app/shared/snackbars/snackbar/snackbar';

import { UsersReviewComponent } from './users-review.component';

describe('UsersReviewComponent', () => {
  let component: UsersReviewComponent;
  let fixture: ComponentFixture<UsersReviewComponent>;
  let userService: UserService;
  let jwtService: JwtService;
  let dialog: MatDialog;
  let snackBar: Snackbar;
  let dialogRef: MatDialogRef<ConfirmationDialogComponent>;

  beforeEach(async () => {
    const userPage: UserPage = {
      content: [
        {
          id: 1,
          username: 'admin 1',
          email: 'email1@gmail.com',
          firstName: 'Admin1',
          lastName: 'Admin1'
        },
        {
          id: 2,
          username: 'admin 2',
          email: 'email2@gmail.com',
          firstName: 'Admin2',
          lastName: 'Admin2'
        }
      ],
      totalElements: 2,
    };

    const searchPage: UserPage = {
      content: [
        {
          id: 1,
          username: 'admin 1',
          email: 'email1@gmail.com',
          firstName: 'Admin1',
          lastName: 'Admin1'
        },
      ],
      totalElements: 1
    };
    const snackBarMocked = {
      success: jasmine.createSpy('success'),
      error: jasmine.createSpy('error')
    };
    const dialogMocked = {
      open: jasmine.createSpy('open').and.returnValue(dialogRef),
      afterClosed: jasmine.createSpy('afterClosed').and.returnValue(of(true))
    };
    const dialogRefMocked = {
      afterClosed: jasmine.createSpy('afterClosed').and.returnValue(of(true))
    };
    const jwtServiceMocked = {
      getToken: jasmine.createSpy('getToken').and.returnValue({
        accessToken: 'eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJzcHJpbmctc2VjdXJpdHktZXhhbXBsZSIsInN1YiI6ImVtYWlsX2FkcmVzYTFAZ21haWwuY29tIiwiYXVkIjoid2ViIiwiaWF0IjoxNjExMDE0MDk0LCJleHAiOjE2MTEwMTU4OTQsInJvbGUiOiJST0xFX0FETUlOIn0.bl85WgHa1NStDvrlxrWa3P6WO7TUMqcrDDd1WPtxVkOV0gh8Mb0kAcaPU3UzlTR0xsNAl8b08N8rLMTGoJD4HQ',
        expiresIn: 1800000
      })
    };
    const userServiceMocked = {
      signup: jasmine.createSpy('signup').and.returnValue(of(new Observable<User>())),
      delete: jasmine.createSpy('delete').and.returnValue(of(true)),
      getUsers: jasmine.createSpy('getUsers').and.returnValue(of(userPage)),
      searchUsers: jasmine.createSpy('searchUsers').and.returnValue(of(searchPage))
    };

    await TestBed.configureTestingModule({
      imports: [NgxPaginationModule],
      declarations: [ UsersReviewComponent ],
      providers: [
        { provide: UserService, useValue: userServiceMocked },
        { provide: Snackbar, useValue: snackBarMocked },
        { provide: JwtService, useValue: jwtServiceMocked },
        { provide: MatDialog, useValue: dialogMocked},
        { provide: MatDialogRef, useValue: dialogRefMocked}
      ],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    jwtService = TestBed.inject(JwtService);
    userService = TestBed.inject(UserService);
    snackBar = TestBed.inject(Snackbar);
    dialog = TestBed.inject(MatDialog);
    dialogRef = TestBed.inject(MatDialogRef);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch all users and get token on init', fakeAsync(() => {
    component.ngOnInit();

    expect(userService.getUsers).toHaveBeenCalledWith(10, 0, 'admins');

    tick();

    expect(component.users.totalElements).toEqual(2);

    expect(component.users.content[0].id).toEqual(1);
    expect(component.users.content[0].username).toEqual('admin 1');
    expect(component.users.content[0].email).toEqual('email1@gmail.com');
    expect(component.users.content[0].firstName).toEqual('Admin1');
    expect(component.users.content[0].lastName).toEqual('Admin1');

    expect(component.users.content[1].id).toEqual(2);
    expect(component.users.content[1].username).toEqual('admin 2');
    expect(component.users.content[1].email).toEqual('email2@gmail.com');
    expect(component.users.content[1].firstName).toEqual('Admin2');
    expect(component.users.content[1].lastName).toEqual('Admin2');

    expect(jwtService.getToken).toHaveBeenCalled();

    expect(component.loggedIn).toEqual('email_adresa1@gmail.com');

    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const userRows: DebugElement[] = fixture.debugElement.queryAll(By.css('table tr'));
    expect(userRows.length).toBe(4);

    expect(userRows[0].childNodes[0].nativeNode.innerHTML).toEqual('1');
    expect(userRows[0].childNodes[1].nativeNode.innerHTML).toEqual('email1@gmail.com');
    expect(userRows[0].childNodes[2].nativeNode.innerHTML).toEqual('admin 1');
    expect(userRows[0].childNodes[3].nativeNode.innerHTML).toEqual('Admin1');
    expect(userRows[0].childNodes[4].nativeNode.innerHTML).toEqual('Admin1');

    expect(userRows[1].childNodes[0].nativeNode.innerHTML).toEqual('2');
    expect(userRows[1].childNodes[1].nativeNode.innerHTML).toEqual('email2@gmail.com');
    expect(userRows[1].childNodes[2].nativeNode.innerHTML).toEqual('admin 2');
    expect(userRows[1].childNodes[3].nativeNode.innerHTML).toEqual('Admin2');
    expect(userRows[1].childNodes[4].nativeNode.innerHTML).toEqual('Admin2');
  }));

  it('should fetch all users', fakeAsync(() => {
    component.getUsers();

    expect(component.searchValue).toEqual('');
    expect(userService.getUsers).toHaveBeenCalledWith(10, 0, 'admins');
    tick();

    expect(component.users.totalElements).toEqual(2);

    expect(component.users.content[0].id).toEqual(1);
    expect(component.users.content[0].username).toEqual('admin 1');
    expect(component.users.content[0].email).toEqual('email1@gmail.com');
    expect(component.users.content[0].firstName).toEqual('Admin1');
    expect(component.users.content[0].lastName).toEqual('Admin1');

    expect(component.users.content[1].id).toEqual(2);
    expect(component.users.content[1].username).toEqual('admin 2');
    expect(component.users.content[1].email).toEqual('email2@gmail.com');
    expect(component.users.content[1].firstName).toEqual('Admin2');
    expect(component.users.content[1].lastName).toEqual('Admin2');

    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const userRows: DebugElement[] = fixture.debugElement.queryAll(By.css('table tr'));
    expect(userRows.length).toBe(4);

    expect(userRows[0].childNodes[0].nativeNode.innerHTML).toEqual('1');
    expect(userRows[0].childNodes[1].nativeNode.innerHTML).toEqual('email1@gmail.com');
    expect(userRows[0].childNodes[2].nativeNode.innerHTML).toEqual('admin 1');
    expect(userRows[0].childNodes[3].nativeNode.innerHTML).toEqual('Admin1');
    expect(userRows[0].childNodes[4].nativeNode.innerHTML).toEqual('Admin1');

    expect(userRows[1].childNodes[0].nativeNode.innerHTML).toEqual('2');
    expect(userRows[1].childNodes[1].nativeNode.innerHTML).toEqual('email2@gmail.com');
    expect(userRows[1].childNodes[2].nativeNode.innerHTML).toEqual('admin 2');
    expect(userRows[1].childNodes[3].nativeNode.innerHTML).toEqual('Admin2');
    expect(userRows[1].childNodes[4].nativeNode.innerHTML).toEqual('Admin2');
  }));

  it('changeTab', fakeAsync(() => {
    const tabs: DebugElement[] = fixture.debugElement.queryAll(By.css('mat-tab'));
    component.changeTab({index : 0, tab: tabs[0].nativeNode});

    expect(component.isAdmin).toEqual(true);
    expect(userService.getUsers).toHaveBeenCalledWith(10, 0, 'admins');

    tick();

    expect(component.users.totalElements).toEqual(2);
    expect(component.users.content[0].id).toEqual(1);
    expect(component.users.content[0].username).toEqual('admin 1');
    expect(component.users.content[0].email).toEqual('email1@gmail.com');
    expect(component.users.content[0].firstName).toEqual('Admin1');
    expect(component.users.content[0].lastName).toEqual('Admin1');

    expect(component.users.content[1].id).toEqual(2);
    expect(component.users.content[1].username).toEqual('admin 2');
    expect(component.users.content[1].email).toEqual('email2@gmail.com');
    expect(component.users.content[1].firstName).toEqual('Admin2');
    expect(component.users.content[1].lastName).toEqual('Admin2');

    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const userRows: DebugElement[] = fixture.debugElement.queryAll(By.css('table tr'));
    expect(userRows.length).toBe(4);

    expect(userRows[0].childNodes[0].nativeNode.innerHTML).toEqual('1');
    expect(userRows[0].childNodes[1].nativeNode.innerHTML).toEqual('email1@gmail.com');
    expect(userRows[0].childNodes[2].nativeNode.innerHTML).toEqual('admin 1');
    expect(userRows[0].childNodes[3].nativeNode.innerHTML).toEqual('Admin1');
    expect(userRows[0].childNodes[4].nativeNode.innerHTML).toEqual('Admin1');

    expect(userRows[1].childNodes[0].nativeNode.innerHTML).toEqual('2');
    expect(userRows[1].childNodes[1].nativeNode.innerHTML).toEqual('email2@gmail.com');
    expect(userRows[1].childNodes[2].nativeNode.innerHTML).toEqual('admin 2');
    expect(userRows[1].childNodes[3].nativeNode.innerHTML).toEqual('Admin2');
    expect(userRows[1].childNodes[4].nativeNode.innerHTML).toEqual('Admin2');
  }));

  it('handlePageChange', fakeAsync(() => {
    component.handlePageChange(1);

    expect(component.page).toEqual(1);
    expect(userService.getUsers).toHaveBeenCalledWith(10, 0, 'admins');

    tick();

    expect(component.users.totalElements).toEqual(2);
    expect(component.users.content[0].id).toEqual(1);
    expect(component.users.content[0].username).toEqual('admin 1');
    expect(component.users.content[0].email).toEqual('email1@gmail.com');
    expect(component.users.content[0].firstName).toEqual('Admin1');
    expect(component.users.content[0].lastName).toEqual('Admin1');

    expect(component.users.content[1].id).toEqual(2);
    expect(component.users.content[1].username).toEqual('admin 2');
    expect(component.users.content[1].email).toEqual('email2@gmail.com');
    expect(component.users.content[1].firstName).toEqual('Admin2');
    expect(component.users.content[1].lastName).toEqual('Admin2');

    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const userRows: DebugElement[] = fixture.debugElement.queryAll(By.css('table tr'));
    expect(userRows.length).toBe(4);

    expect(userRows[0].childNodes[0].nativeNode.innerHTML).toEqual('1');
    expect(userRows[0].childNodes[1].nativeNode.innerHTML).toEqual('email1@gmail.com');
    expect(userRows[0].childNodes[2].nativeNode.innerHTML).toEqual('admin 1');
    expect(userRows[0].childNodes[3].nativeNode.innerHTML).toEqual('Admin1');
    expect(userRows[0].childNodes[4].nativeNode.innerHTML).toEqual('Admin1');

    expect(userRows[1].childNodes[0].nativeNode.innerHTML).toEqual('2');
    expect(userRows[1].childNodes[1].nativeNode.innerHTML).toEqual('email2@gmail.com');
    expect(userRows[1].childNodes[2].nativeNode.innerHTML).toEqual('admin 2');
    expect(userRows[1].childNodes[3].nativeNode.innerHTML).toEqual('Admin2');
    expect(userRows[1].childNodes[4].nativeNode.innerHTML).toEqual('Admin2');
  }));

  it('should fetch all users by search value', fakeAsync(() => {
    component.searchChanged('1');

    expect(component.searchValue).toEqual('1');
    expect(userService.searchUsers).toHaveBeenCalledWith(10, 0, '1', 'admins');
    tick();

    expect(component.users.totalElements).toEqual(1);
    expect(component.users.content[0].id).toEqual(1);
    expect(component.users.content[0].username).toEqual('admin 1');
    expect(component.users.content[0].email).toEqual('email1@gmail.com');
    expect(component.users.content[0].firstName).toEqual('Admin1');
    expect(component.users.content[0].lastName).toEqual('Admin1');

    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const userRows: DebugElement[] = fixture.debugElement.queryAll(By.css('table tr'));
    expect(userRows.length).toBe(2);

    expect(userRows[0].childNodes[0].nativeNode.innerHTML).toEqual('1');
    expect(userRows[0].childNodes[1].nativeNode.innerHTML).toEqual('email1@gmail.com');
    expect(userRows[0].childNodes[2].nativeNode.innerHTML).toEqual('admin 1');
    expect(userRows[0].childNodes[3].nativeNode.innerHTML).toEqual('Admin1');
    expect(userRows[0].childNodes[4].nativeNode.innerHTML).toEqual('Admin1');

  }));

  it('openDialog', () => {
    component.openDialog(2);

    expect(dialog.open).toHaveBeenCalled();
  });

  it('should delete admin', fakeAsync(() => {
    component.delete(2);

    expect(userService.delete).toHaveBeenCalledOnceWith(2);

    tick();

    expect(userService.getUsers).toHaveBeenCalled();
    expect(snackBar.success).toHaveBeenCalledOnceWith('You have successfully deleted admin!');
  }));

  it('should delete admin', fakeAsync(() => {
    component.delete(2);

    expect(userService.delete).toHaveBeenCalledOnceWith(2);

    tick();

    expect(userService.getUsers).toHaveBeenCalled();
    expect(snackBar.success).toHaveBeenCalledOnceWith('You have successfully deleted admin!');
  }));


});
