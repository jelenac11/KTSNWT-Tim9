import { TestBed } from '@angular/core/testing';

import { NoAuthGuard } from './no-auth.guard';

describe('NoAuthGuard', () => {
  let guard: NoAuthGuard;

  beforeEach(() => {
<<<<<<< Updated upstream
    TestBed.configureTestingModule({});
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
  });

  it('should be created', () => {
>>>>>>> Stashed changes
    guard = TestBed.inject(NoAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
