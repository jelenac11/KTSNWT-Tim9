import { TestBed } from '@angular/core/testing';

import { NoAuthGuard } from './no-auth.guard';

describe('NoAuthGuard', () => {
  let guard: NoAuthGuard;

  beforeEach(() => {
<<<<<<< Updated upstream
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NoAuthGuard);
=======
    const authenticationServiceMocked = {
      isAuthenticated: jasmine.createSpy('isAuthenticated').and.returnValue(true)
    };
    const routerMocked = jasmine.createSpyObj('router', ['navigate']);
    TestBed.configureTestingModule({
      providers: [
        NoAuthGuard,
        {provide: AuthenticationService, useValue: authenticationServiceMocked},
        {provide: Router, useValue: routerMocked }
      ]
    });
>>>>>>> Stashed changes
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
<<<<<<< Updated upstream
=======

  it('canActivate() should return false', () => {
    guard = TestBed.inject(NoAuthGuard);
    router = TestBed.inject(Router);
    authenticationService = TestBed.inject(AuthenticationService);
    const val = guard.canActivate();

    expect(val).toBeFalsy();
    expect(authenticationService.isAuthenticated).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('canActivate() should return true', () => {
    const authenticationServiceMocked2 = {
      isAuthenticated: jasmine.createSpy('isAuthenticated').and.returnValue(false)
    };
    TestBed.overrideProvider(AuthenticationService, {useValue: authenticationServiceMocked2});
    guard = TestBed.inject(NoAuthGuard);
    router = TestBed.inject(Router);
    authenticationService = TestBed.inject(AuthenticationService);
    const val = guard.canActivate();

    expect(val).toBeTruthy();
    expect(authenticationService.isAuthenticated).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledTimes(0);
  });


>>>>>>> Stashed changes
});
