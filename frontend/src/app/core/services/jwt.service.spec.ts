import { getTestBed, TestBed } from '@angular/core/testing';

import { JwtService } from './jwt.service';

describe('JwtService', () => {
  let service: JwtService;
  let injector;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JwtService]
    });
    injector = getTestBed();
    service = TestBed.inject(JwtService);
    localStorage.setItem('jwtToken', JSON.stringify({
      accessToken: 'eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJzcHJpbmctc2VjdXJpdHktZXhhbXBsZSIsInN1YiI6ImVtYWlsX2FkcmVzYTFAZ21haWwuY29tIiwiYXVkIjoid2ViIiwiaWF0IjoxNjExMDE0MDk0LCJleHAiOjE2MTEwMTU4OTQsInJvbGUiOiJST0xFX0FETUlOIn0.bl85WgHa1NStDvrlxrWa3P6WO7TUMqcrDDd1WPtxVkOV0gh8Mb0kAcaPU3UzlTR0xsNAl8b08N8rLMTGoJD4HQ',
      expiresIn: 1800000
    }));
  });

  afterEach(() => {
    localStorage.removeItem('jwtToken');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getToken() should return token', () => {
    const token = service.getToken();

    expect(token.expiresIn).toEqual(1800000);
    expect(token.accessToken).toEqual('eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJzcHJpbmctc2VjdXJpdHktZXhhbXBsZSIsInN1YiI6ImVtYWlsX2FkcmVzYTFAZ21haWwuY29tIiwiYXVkIjoid2ViIiwiaWF0IjoxNjExMDE0MDk0LCJleHAiOjE2MTEwMTU4OTQsInJvbGUiOiJST0xFX0FETUlOIn0.bl85WgHa1NStDvrlxrWa3P6WO7TUMqcrDDd1WPtxVkOV0gh8Mb0kAcaPU3UzlTR0xsNAl8b08N8rLMTGoJD4HQ');
  });

  it('saveToken() should save token', () => {
    localStorage.removeItem('jwtToken');
    service.saveToken({
      accessToken: 'eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJzcHJpbmctc2VjdXJpdHktZXhhbXBsZSIsInN1YiI6ImVtYWlsX2FkcmVzYTFAZ21haWwuY29tIiwiYXVkIjoid2ViIiwiaWF0IjoxNjExMDE0MDk0LCJleHAiOjE2MTEwMTU4OTQsInJvbGUiOiJST0xFX0FETUlOIn0.bl85WgHa1NStDvrlxrWa3P6WO7TUMqcrDDd1WPtxVkOV0gh8Mb0kAcaPU3UzlTR0xsNAl8b08N8rLMTGoJD4HQ',
      expiresIn: 1800000
    });

    const token = JSON.parse(localStorage.getItem('jwtToken'));
    expect(token.expiresIn).toEqual(1800000);
    expect(token.accessToken).toEqual('eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJzcHJpbmctc2VjdXJpdHktZXhhbXBsZSIsInN1YiI6ImVtYWlsX2FkcmVzYTFAZ21haWwuY29tIiwiYXVkIjoid2ViIiwiaWF0IjoxNjExMDE0MDk0LCJleHAiOjE2MTEwMTU4OTQsInJvbGUiOiJST0xFX0FETUlOIn0.bl85WgHa1NStDvrlxrWa3P6WO7TUMqcrDDd1WPtxVkOV0gh8Mb0kAcaPU3UzlTR0xsNAl8b08N8rLMTGoJD4HQ');
  });

  it('destroyToken() should destroy token', () => {
    service.destroyToken();
    expect(localStorage.getItem('jwtToken')).toEqual(null);
  });

  it('getRole() should return ROLE_ADMIN', () => {
    const role = service.getRole();
    expect(role).toEqual('ROLE_ADMIN');
  });

  it('getEmail() should return email_adresa1@gmail.com', () => {
    const email = service.getEmail();
    expect(email).toEqual('email_adresa1@gmail.com');
  });

});
