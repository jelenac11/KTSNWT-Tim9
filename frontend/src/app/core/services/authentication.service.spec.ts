import { HttpClient } from '@angular/common/http';
import { getTestBed, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {fakeAsync, tick} from '@angular/core/testing';
import { AuthenticationService } from './authentication.service';
import { UserLogin } from '../models/request/user-login-request.models';
import { PasswordChangeRequest } from '../models/request/password-change-request.model';
import { UserTokenState } from '../models/response/user-token-state.model';
import { JwtService } from './jwt.service';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let injector;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let jwtService: JwtService;

  beforeEach(() => {
    const jwtServiceMock = {
      destroyToken: jasmine.createSpy('destroyToken'),
      getToken: jasmine.createSpy('getToken')
        .and.returnValue(of('asdftgbyhfnuj')),
      getRole: jasmine.createSpy('getRole')
        .and.returnValue(of('ADMIN')),
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthenticationService,  {provide: JwtService, useValue: jwtServiceMock }]
    });
    injector = getTestBed();
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(AuthenticationService);
    jwtService = TestBed.inject(JwtService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('confirmRegistration() should return token does not exist', fakeAsync(() => {
    const token = 'wrong_token_asdfghjkl';
    let message: string;
    const mockMessage = 'Token doesn\'t exist.';
    let status: number;
    service.confirmRegistration(token).subscribe(data => {
      message = JSON.parse(data).statusText;
      status = JSON.parse(data).status;
    });

    const req = httpMock.expectOne(`${environment.auth_url}confirm-registration/${token}`);
    expect(req.request.method).toBe('GET');
    req.flush({
      status: 404,
      statusText: mockMessage
    });

    tick();
    expect(message).toEqual('Token doesn\'t exist.');
    expect(status).toEqual(404);
  }));

  it('confirmRegistration() should return account activated', fakeAsync(() => {
    const token = 'adsrf2134vxsahneuijfer748594';
    let message: string;
    const mockMessage = 'Account activated.';
    let status: number;
    service.confirmRegistration(token).subscribe(data => {
      message = JSON.parse(data).statusText;
      status = JSON.parse(data).status;
    });

    const req = httpMock.expectOne(`${environment.auth_url}confirm-registration/${token}`);
    expect(req.request.method).toBe('GET');
    req.flush({
      status: 200,
      statusText: mockMessage
    });

    tick();
    expect(message).toEqual('Account activated.');
    expect(status).toEqual(200);
  }));

  it('login() should return incorrect email or password', fakeAsync(() => {
    const user: UserLogin = { email: 'email_adresa1@gmail.com', password: 'sifra143'};
    let message: any;
    const mockMessage = 'Incorrect email or password.';
    service.login(user).subscribe(data => {
      message = data;
    });

    const req = httpMock.expectOne(`${environment.auth_url}login`);
    expect(req.request.method).toBe('POST');
    req.flush(mockMessage);

    tick();
    expect(message).toEqual('Incorrect email or password.');
  }));

  it('login() should return account not activated', fakeAsync(() => {
    const user: UserLogin = { email: 'email_adresa11@gmail.com', password: 'sifra123'};
    let message: any;
    const mockMessage = 'Account not activated.';
    service.login(user).subscribe(data => {
      message = data;
    });

    const req = httpMock.expectOne(`${environment.auth_url}login`);
    expect(req.request.method).toBe('POST');
    req.flush(mockMessage);

    tick();
    expect(message).toEqual('Account not activated.');
  }));

  it('login() should return jwt token', fakeAsync(() => {
    const user: UserLogin = { email: 'email_adresa1@gmail.com', password: 'sifra123'};
    let token: UserTokenState;
    const mockToken: UserTokenState = {
      accessToken: 'asedrftgyhujsdrftgyhuji',
      expiresIn: 1235678
    };
    service.login(user).subscribe(data => {
      token = data;
    });

    const req = httpMock.expectOne(`${environment.auth_url}login`);
    expect(req.request.method).toBe('POST');
    req.flush(mockToken);

    tick();

    expect(token.accessToken).toEqual('asedrftgyhujsdrftgyhuji');
    expect(token.expiresIn).toEqual(1235678);
  }));

  it('forgotPassword() should return user with given email does not exist', fakeAsync(() => {
    const email = 'email_adresa111@gmail.com';
    let message: string;
    const mockMessage = 'User with given email doesn\'t exist';
    let status: number;
    service.forgotPassword(email).subscribe(data => {
      message = JSON.parse(data).statusText;
      status = JSON.parse(data).status;
    });

    const req = httpMock.expectOne(`${environment.auth_url}forgot-password`);
    expect(req.request.method).toBe('POST');
    req.flush({
      status: 404,
      statusText: mockMessage
    });

    tick();
    expect(message).toEqual('User with given email doesn\'t exist');
    expect(status).toEqual(404);
  }));

  it('forgotPassword() should return password reset successfully', fakeAsync(() => {
    const email = 'email_adresa1@gmail.com';
    let message: string;
    const mockMessage = 'Password reset successfully.';
    let status: number;
    service.forgotPassword(email).subscribe(data => {
      message = JSON.parse(data).statusText;
      status = JSON.parse(data).status;
    });

    const req = httpMock.expectOne(`${environment.auth_url}forgot-password`);
    expect(req.request.method).toBe('POST');
    req.flush({
      status: 200,
      statusText: mockMessage
    });

    tick();
    expect(message).toEqual('Password reset successfully.');
    expect(status).toEqual(200);
  }));

  it('changePassword() should return incorrect old password', fakeAsync(() => {
    const passwordRequest: PasswordChangeRequest = { oldPassword: 'sifra124', newPassword: 'sifra125'};
    let message: string;
    const mockMessage = 'Incorrect old password';
    let status: number;
    service.changePassword(passwordRequest).subscribe(data => {
      message = JSON.parse(data).statusText;
      status = JSON.parse(data).status;
    });

    const req = httpMock.expectOne(`${environment.auth_url}change-password`);
    expect(req.request.method).toBe('POST');
    req.flush({
      status: 400,
      statusText: mockMessage
    });

    tick();
    expect(message).toEqual('Incorrect old password');
    expect(status).toEqual(400);
  }));

  it('changePassword() should return password changed successfully', fakeAsync(() => {
    const passwordRequest: PasswordChangeRequest = { oldPassword: 'sifra123', newPassword: 'sifra125'};
    let message: string;
    const mockMessage = 'Password changed successfully';
    let status: number;
    service.changePassword(passwordRequest).subscribe(data => {
      message = JSON.parse(data).statusText;
      status = JSON.parse(data).status;
    });

    const req = httpMock.expectOne(`${environment.auth_url}change-password`);
    expect(req.request.method).toBe('POST');
    req.flush({
      status: 200,
      statusText: mockMessage
    });

    tick();
    expect(message).toEqual('Password changed successfully');
    expect(status).toEqual(200);
  }));

  it('logout() should call destroyToken', fakeAsync(() => {
    service.logout();

    expect(jwtService.destroyToken).toHaveBeenCalledTimes(1);
  }));

  it('isAuthenticated() should call getToken', fakeAsync(() => {
    service.isAuthenticated();

    expect(jwtService.getToken).toHaveBeenCalledTimes(1);
  }));

  it('getRole() should call getRole', fakeAsync(() => {
    service.getRole();

    expect(jwtService.getRole).toHaveBeenCalledTimes(1);
  }));

});
