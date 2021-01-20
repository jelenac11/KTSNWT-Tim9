import { TestBed } from '@angular/core/testing';

import { RoleGuard } from './role.guard';

describe('RoleGuard', () => {
  let guard: RoleGuard;

  beforeEach(() => {
<<<<<<< Updated upstream
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RoleGuard);
=======
    const jwtServiceMocked = {
      getToken: jasmine.createSpy('getToken').and.returnValue({
        accessToken: 'eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJzcHJpbmctc2VjdXJpdHktZXhhbXBsZSIsInN1YiI6ImVtYWlsX2FkcmVzYTFAZ21haWwuY29tIiwiYXVkIjoid2ViIiwiaWF0IjoxNjExMDE0MDk0LCJleHAiOjE2MTEwMTU4OTQsInJvbGUiOiJST0xFX0FETUlOIn0.bl85WgHa1NStDvrlxrWa3P6WO7TUMqcrDDd1WPtxVkOV0gh8Mb0kAcaPU3UzlTR0xsNAl8b08N8rLMTGoJD4HQ',
        expiresIn: 1800000
      })
    };
    const routerMocked = jasmine.createSpyObj('router', ['navigate']);
    TestBed.configureTestingModule({
      providers: [RoleGuard,  {provide: JwtService, useValue: jwtServiceMocked}, {provide: Router, useValue: routerMocked }]
    });
>>>>>>> Stashed changes
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
