import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { JwtService } from 'src/app/core/services/jwt.service';
import { UserService } from 'src/app/core/services/user.service';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authenticationService: AuthenticationService;
  let router: Router;
  let dialog: MatDialog;
  let jwtService: JwtService;
  let userService: UserService;

  beforeEach(() => {
    let matDialogRefMock = {
      open: jasmine.createSpy('open'),
    }
    let authenticationServiceMock = {
      logout: jasmine.createSpy('logout'),
    }

    let jwtServiceMock = {
      getRole: jasmine.createSpy('getRole').and.returnValue(of('ROLE_ADMIN')),
    };

    let userServiceMock = {
      getCurrentUser: jasmine.createSpy('getCurrentUser').and.returnValue(of(
        {
          id: 1,
          username: "User",
          email: "mail@mail.com",
          firstName: "User",
          lastName: "User"
        }
      )),
    }

    let routerMock = {
      navigate: jasmine.createSpy('navigate'),
    }

    TestBed.configureTestingModule({
      imports: [MatMenuModule],
      providers: [
        { provide: MatDialog, useValue: matDialogRefMock },
        { provide: AuthenticationService, useValue: authenticationServiceMock },
        { provide: JwtService, useValue: jwtServiceMock },
        { provide: UserService, useValue: userServiceMock },
        { provide: Router, useValue: routerMock },
      ],
      declarations: [HeaderComponent]
    })

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    dialog = TestBed.inject(MatDialog);
    authenticationService = TestBed.inject(AuthenticationService);
    jwtService = TestBed.inject(JwtService);
    userService = TestBed.inject(UserService);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get current user and role', () => {
    component.ngOnInit();
    expect(jwtService.getRole).toHaveBeenCalled();
    expect(userService.getCurrentUser).toHaveBeenCalled();
    expect(component.user.id).toEqual(1);
    expect(component.user.firstName).toEqual("User");
    expect(component.user.lastName).toEqual("User");
    expect(component.user.username).toEqual("User");
    expect(component.user.email).toEqual("mail@mail.com");

    fixture.whenStable()
      .then(() => {

        expect(component.role).toBe("ROLE_ADMIN");
      });
  });

  it('logout', () => {
    component.logout();
    expect(authenticationService.logout).toHaveBeenCalled();
    expect(component.role).toEqual('');
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('showProfile', () => {
    component.showProfile();
    expect(dialog.open).toHaveBeenCalled();
  });

  it('changePassword', () => {
    component.showProfile();
    expect(dialog.open).toHaveBeenCalled();
  });
});
