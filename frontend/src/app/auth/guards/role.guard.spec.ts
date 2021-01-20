import { TestBed } from '@angular/core/testing';

import { RoleGuard } from './role.guard';

describe('RoleGuard', () => {
  let guard: RoleGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RoleGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
<<<<<<< Updated upstream
=======

  it('canActivate() should return true', () => {
    guard = TestBed.inject(RoleGuard);
    router = TestBed.inject(Router);
    jwtService = TestBed.inject(JwtService);

    const val = guard.canActivate(({data: { expectedRoles: 'ROLE_ADMIN'}} as any) as ActivatedRouteSnapshot);

    expect(val).toBeTruthy();
    expect(jwtService.getToken).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledTimes(0);
  });

  it('canActivate() should return false', () => {
    const jwtServiceMocked2 = {
      getToken: jasmine.createSpy('getToken').and.returnValue(null)
    };
    TestBed.overrideProvider(JwtService, {useValue: jwtServiceMocked2});
    guard = TestBed.inject(RoleGuard);
    router = TestBed.inject(Router);
    jwtService = TestBed.inject(JwtService);

    const val = guard.canActivate(({data: { expectedRoles: 'ROLE_ADMIN'}} as any) as ActivatedRouteSnapshot);

    expect(val).toBeFalsy();
    expect(jwtService.getToken).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/auth/sign-in']);
  });

>>>>>>> Stashed changes
});
