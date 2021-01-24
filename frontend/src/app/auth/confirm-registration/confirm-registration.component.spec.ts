import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

import { ConfirmRegistrationComponent } from './confirm-registration.component';

describe('ConfirmRegistrationComponent', () => {
  let component: ConfirmRegistrationComponent;
  let fixture: ComponentFixture<ConfirmRegistrationComponent>;
  let authenticationService: AuthenticationService;
  let route: ActivatedRoute;

  beforeEach(async () => {
    const authenticationServiceMocked = {
      confirmRegistration: jasmine.createSpy('confirmRegistration').and.returnValue(of(new Observable<string>()))
    };

    await TestBed.configureTestingModule({
      declarations: [ ConfirmRegistrationComponent ],
      providers: [
        { provide: AuthenticationService, useValue: authenticationServiceMocked },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: (token: string) =>  'token'  } } } }
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    authenticationService = TestBed.inject(AuthenticationService);
    route = TestBed.inject(ActivatedRoute);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be initialized', () => {
    component.ngOnInit();
    expect(authenticationService.confirmRegistration).toHaveBeenCalledWith('token');
  });

});
