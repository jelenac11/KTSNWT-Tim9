import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

<<<<<<< Updated upstream
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ]
=======
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
          username: 'User',
          email: 'mail@mail.com',
          firstName: 'User',
          lastName: 'User'
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
>>>>>>> Stashed changes
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
<<<<<<< Updated upstream
=======

  it('should get current user and role', () => {
    component.ngOnInit();
    expect(jwtService.getRole).toHaveBeenCalled();
    expect(userService.getCurrentUser).toHaveBeenCalled();
    expect(component.user.id).toEqual(1);
    expect(component.user.firstName).toEqual('User');
    expect(component.user.lastName).toEqual('User');
    expect(component.user.username).toEqual('User');
    expect(component.user.email).toEqual('mail@mail.com');

    fixture.whenStable()
      .then(() => {

        expect(component.role).toBe('ROLE_ADMIN');
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
>>>>>>> Stashed changes
});
