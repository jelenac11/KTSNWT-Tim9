import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, getTestBed, TestBed, tick } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { AdminRequest } from '../models/request/admin-request.model';
import { UserRequest } from '../models/request/user-request.model';
import { UserPage } from '../models/response/user-page.model';
import { User } from '../models/response/user.model';

import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let injector;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    injector = getTestBed();
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(UserService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('signup() should return email already exists', fakeAsync(() => {
    const user: UserRequest = {
      username: 'jelenac',
      email: 'existing@gmail.com',
      password: 'sifra123',
      firstName: 'Jelena',
      lastName: 'Cupac'
    };
    const mockMessage = 'Email already exists.';
    let message: any;

    service.signup(user).subscribe(data => {
      message = data;
    });
    const req = httpMock.expectOne(`${environment.auth_url}sign-up`);
    expect(req.request.method).toBe('POST');
    req.flush(mockMessage);

    tick();
    expect(message).toEqual('Email already exists.');
  }));

  it('signup() should return email already exists', fakeAsync(() => {
    const user: UserRequest = {
      username: 'existing',
      email: 'jelenacupac99@gmail.com',
      password: 'sifra123',
      firstName: 'Jelena',
      lastName: 'Cupac'
    };
    const mockMessage = 'Username already exists.';
    let message: any;

    service.signup(user).subscribe(data => {
      message = data;
    });
    const req = httpMock.expectOne(`${environment.auth_url}sign-up`);
    expect(req.request.method).toBe('POST');
    req.flush(mockMessage);

    tick();
    expect(message).toEqual('Username already exists.');
  }));

  it('signup() should return user', fakeAsync(() => {
    const userRequest: UserRequest = {
      username: 'jelenac',
      email: 'jelenacupac99@gmail.com',
      password: 'sifra123',
      firstName: 'Jelena',
      lastName: 'Cupac'
    };
    const mockUser: User = {
      id: 1,
      username: 'jelenac',
      email: 'jelenacupac99@gmail.com',
      firstName: 'Jelena',
      lastName: 'Cupac'
    };
    let user: User;

    service.signup(userRequest).subscribe(data => {
      user = data;
    });
    const req = httpMock.expectOne(`${environment.auth_url}sign-up`);
    expect(req.request.method).toBe('POST');
    req.flush(mockUser);

    tick();
    expect(user.id).toEqual(1);
    expect(user.username).toEqual('jelenac');
    expect(user.email).toEqual('jelenacupac99@gmail.com');
    expect(user.firstName).toEqual('Jelena');
    expect(user.lastName).toEqual('Cupac');
  }));

  it('getCurrentUser() should return current user', fakeAsync(() => {
    const mockUser: User = {
      id: 1,
      username: 'jelenac',
      email: 'jelenacupac99@gmail.com',
      firstName: 'Jelena',
      lastName: 'Cupac'
    };
    let user: User;

    service.getCurrentUser().subscribe(data => {
      user = data;
    });
    const req = httpMock.expectOne(`${environment.auth_url}current-user`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUser);

    tick();
    expect(user.id).toEqual(1);
    expect(user.username).toEqual('jelenac');
    expect(user.email).toEqual('jelenacupac99@gmail.com');
    expect(user.firstName).toEqual('Jelena');
    expect(user.lastName).toEqual('Cupac');
  }));

  it('delete() should return admin doesn\'t exist', fakeAsync(() => {
    const id = 1;
    const mockMessage = 'Admin doesn\'t exist';
    let message: string;

    service.delete(id).subscribe(data => {
      message = data;
    });
    const req = httpMock.expectOne(`${environment.api_url}admins/${id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockMessage);

    tick();
    expect(message).toEqual('Admin doesn\'t exist');
  }));

  it('delete() should return admin has cultural offers, so he can\'t be deleted', fakeAsync(() => {
    const id = 1;
    const mockMessage = 'Admin has cultural offers, so he can\'t be deleted';
    let message: string;

    service.delete(id).subscribe(data => {
      message = data;
    });
    const req = httpMock.expectOne(`${environment.api_url}admins/${id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockMessage);

    tick();
    expect(message).toEqual('Admin has cultural offers, so he can\'t be deleted');
  }));

  it('delete() should return true', fakeAsync(() => {
    const id = 1;
    const mockMessage = true;
    let message: string;

    service.delete(id).subscribe(data => {
      message = data;
    });
    const req = httpMock.expectOne(`${environment.api_url}admins/${id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockMessage);

    tick();
    expect(message).toEqual('true');
  }));

  it('changeProfile() should return user not found', fakeAsync(() => {
    const userRequest: UserRequest = {
      username: 'jelenac',
      email: 'nonexisting@gmail.com',
      password: 'sifra123',
      firstName: 'Jelena',
      lastName: 'Cupac'
    };
    const mockMessage = 'User not found';
    let message: any;

    service.changeProfile(userRequest).subscribe(data => {
      message = data;
    });
    const req = httpMock.expectOne(`${environment.api_url}users/change-profile`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockMessage);

    tick();
    expect(message).toEqual('User not found');
  }));

  it('changeProfile() should return username already taken', fakeAsync(() => {
    const userRequest: UserRequest = {
      username: 'existing',
      email: 'jelenacupac99@gmail.com',
      password: 'sifra123',
      firstName: 'Jelena',
      lastName: 'Cupac'
    };
    const mockMessage = 'Username already taken';
    let message: any;

    service.changeProfile(userRequest).subscribe(data => {
      message = data;
    });
    const req = httpMock.expectOne(`${environment.api_url}users/change-profile`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockMessage);

    tick();
    expect(message).toEqual('Username already taken');
  }));

  it('changeProfile() should return changed user', fakeAsync(() => {
    const userRequest: UserRequest = {
      username: 'jelenac99',
      email: 'jelenacupac99@gmail.com',
      password: 'sifra123',
      firstName: 'Jelena',
      lastName: 'Cupac'
    };
    const mockUser: User = {
      id: 1,
      username: 'jelenac99',
      email: 'jelenacupac99@gmail.com',
      firstName: 'Jelena',
      lastName: 'Cupac'
    };
    let user: User;

    service.changeProfile(userRequest).subscribe(data => {
      user = data;
    });
    const req = httpMock.expectOne(`${environment.api_url}users/change-profile`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockUser);

    tick();
    expect(user.id).toEqual(1);
    expect(user.username).toEqual('jelenac99');
    expect(user.email).toEqual('jelenacupac99@gmail.com');
    expect(user.firstName).toEqual('Jelena');
    expect(user.lastName).toEqual('Cupac');
  }));

  it('getUsers() should return user page', fakeAsync(() => {
    const size = 1;
    const page = 0;
    const user = 'registered-users';
    const mockUserPage: UserPage = {
      content: [
        {
          id: 1,
          username: 'jelenac99',
          email: 'jelenacupac99@gmail.com',
          firstName: 'Jelena',
          lastName: 'Cupac'
        }
      ],
      totalElements: 1
    };
    let userPage: UserPage;

    service.getUsers(size, page, user).subscribe(data => {
      userPage = data;
    });

    const req = httpMock.expectOne(`${environment.api_url}${user}/by-page?size=1&page=0`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUserPage);

    tick();
    expect(userPage.totalElements).toEqual(1);
    expect(userPage.content[0].id).toEqual(1);
    expect(userPage.content[0].username).toEqual('jelenac99');
    expect(userPage.content[0].email).toEqual('jelenacupac99@gmail.com');
    expect(userPage.content[0].firstName).toEqual('Jelena');
    expect(userPage.content[0].lastName).toEqual('Cupac');
  }));

  it('searchUsers() should return user page', fakeAsync(() => {
    const size = 1;
    const page = 0;
    const user = 'registered-users';
    const searchValue = 'jelena';
    const mockUserPage: UserPage = {
      content: [
        {
          id: 1,
          username: 'jelenac99',
          email: 'jelenacupac99@gmail.com',
          firstName: 'Jelena',
          lastName: 'Cupac'
        }
      ],
      totalElements: 1
    };
    let userPage: UserPage;

    service.searchUsers(size, page, searchValue, user).subscribe(data => {
      userPage = data;
    });
    const req = httpMock.expectOne(`${environment.api_url}registered-users/search/jelena?size=1&page=0`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUserPage);

    tick();
    expect(userPage.totalElements).toEqual(1);
    expect(userPage.content[0].id).toEqual(1);
    expect(userPage.content[0].username).toEqual('jelenac99');
    expect(userPage.content[0].email).toEqual('jelenacupac99@gmail.com');
    expect(userPage.content[0].firstName).toEqual('Jelena');
    expect(userPage.content[0].lastName).toEqual('Cupac');
  }));

  it('searchUsers() should return empty user page', fakeAsync(() => {
    const size = 1;
    const page = 0;
    const user = 'registered-users';
    const searchValue = 'asdfgh';
    const mockUserPage: UserPage = {
      content: [],
      totalElements: 0
    };
    let userPage: UserPage;

    service.searchUsers(size, page, searchValue, user).subscribe(data => {
      userPage = data;
    });
    const req = httpMock.expectOne(`${environment.api_url}registered-users/search/asdfgh?size=1&page=0`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUserPage);

    tick();
    expect(userPage.totalElements).toEqual(0);
  }));

  it('addAdmin() should return user with this username already exists', fakeAsync(() => {
    const admin: AdminRequest = {
      username: 'existing',
      email: 'email@gmail.com',
      firstName: 'Nikola',
      lastName: 'Nikolic'
    };
    const mockMessage = 'User with this username already exists.';
    let message: any;

    service.addAdmin(admin).subscribe(data => {
      message = data;
    });
    const req = httpMock.expectOne(`${environment.api_url}admins`);
    expect(req.request.method).toBe('POST');
    req.flush(mockMessage);

    tick();
    expect(message).toEqual('User with this username already exists.');
  }));

  it('addAdmin() should return user with this email already exists', fakeAsync(() => {
    const admin: AdminRequest = {
      username: 'nikola',
      email: 'existing@gmail.com',
      firstName: 'Nikola',
      lastName: 'Nikolic'
    };
    const mockMessage = 'User with this email already exists.';
    let message: any;

    service.addAdmin(admin).subscribe(data => {
      message = data;
    });
    const req = httpMock.expectOne(`${environment.api_url}admins`);
    expect(req.request.method).toBe('POST');
    req.flush(mockMessage);

    tick();
    expect(message).toEqual('User with this email already exists.');
  }));

  it('addAdmin() should return added admin', fakeAsync(() => {
    const admin: AdminRequest = {
      username: 'nikola',
      email: 'nonexisting@gmail.com',
      firstName: 'Nikola',
      lastName: 'Nikolic'
    };
    const mockUser: User = {
      id: 21,
      username: 'nikola',
      email: 'nonexisting@gmail.com',
      firstName: 'Nikola',
      lastName: 'Nikolic'
    };
    let user: User;

    service.addAdmin(admin).subscribe(data => {
      user = data;
    });
    const req = httpMock.expectOne(`${environment.api_url}admins`);
    expect(req.request.method).toBe('POST');
    req.flush(mockUser);

    tick();
    expect(user.id).toEqual(21);
    expect(user.username).toEqual('nikola');
    expect(user.email).toEqual('nonexisting@gmail.com');
    expect(user.firstName).toEqual('Nikola');
    expect(user.lastName).toEqual('Nikolic');
  }));

  it('isSubscribed() should return true', fakeAsync(() => {
    const email = 'email_adresa33@gmail.com';
    const culturalOfferId = 1;
    const mockIsSub = true;
    let isSub: boolean;

    service.isSubscribed(email, culturalOfferId).subscribe(data => {
      isSub = data;
    });

    const req = httpMock.expectOne(`${environment.api_url}registered-users/is-subscibed/email_adresa33@gmail.com/1`);
    expect(req.request.method).toBe('POST');
    req.flush(mockIsSub);

    tick();
    expect(isSub).toBeTrue();
  }));

  it('isSubscribed() should return false', fakeAsync(() => {
    const email = 'email_adresa33@gmail.com';
    const culturalOfferId = 3;
    const mockIsSub = false;
    let isSub: boolean;

    service.isSubscribed(email, culturalOfferId).subscribe(data => {
      isSub = data;
    });

    const req = httpMock.expectOne(`${environment.api_url}registered-users/is-subscibed/email_adresa33@gmail.com/3`);
    expect(req.request.method).toBe('POST');
    req.flush(mockIsSub);

    tick();
    expect(isSub).toBeFalse();
  }));

});
