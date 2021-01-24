import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
<<<<<<< Updated upstream

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ]
    })
    .compileComponents();
  });
=======
  let authenticationService: AuthenticationService;
  let router: Router;
  let dialog: MatDialog;
  let jwtService: JwtService;
  let userService: UserService;
  let dialogRef: MatDialogRef<{}>;

  beforeEach(() => {
    const matDialogRefMock = {
      open: jasmine.createSpy('open').and.returnValue(dialogRef),
    };
    const authenticationServiceMock = {
      logout: jasmine.createSpy('logout'),
    };

    const jwtServiceMock = {
      getRole: jasmine.createSpy('getRole').and.returnValue(of('ROLE_ADMIN')),
    };
    const dialogRefMocked = {
      afterClosed: jasmine.createSpy('afterClosed').and.returnValue(of(true))
    };
    const userServiceMock = {
      getCurrentUser: jasmine.createSpy('getCurrentUser').and.returnValue(of(
        {
          id: 1,
          username: 'User',
          email: 'mail@mail.com',
          firstName: 'User',
          lastName: 'User'
        }
      )),
    };

    const routerMock = {
      navigate: jasmine.createSpy('navigate'),
    };

    TestBed.configureTestingModule({
      imports: [MatMenuModule],
      providers: [
        { provide: MatDialog, useValue: matDialogRefMock },
        { provide: AuthenticationService, useValue: authenticationServiceMock },
        { provide: JwtService, useValue: jwtServiceMock },
        { provide: UserService, useValue: userServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: MatDialogRef, useValue: dialogRefMocked}
      ],
      declarations: [HeaderComponent]
    });
>>>>>>> Stashed changes

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
<<<<<<< Updated upstream
=======
    dialog = TestBed.inject(MatDialog);
    authenticationService = TestBed.inject(AuthenticationService);
    jwtService = TestBed.inject(JwtService);
    userService = TestBed.inject(UserService);
    router = TestBed.inject(Router);
    dialogRef = TestBed.inject(MatDialogRef);
>>>>>>> Stashed changes
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
  });

  it('logout', () => {
    component.logout();
    expect(authenticationService.logout).toHaveBeenCalled();
    expect(component.role).toEqual('');
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

>>>>>>> Stashed changes
});
