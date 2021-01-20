import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmRegistrationComponent } from './confirm-registration.component';

describe('ConfirmRegistrationComponent', () => {
  let component: ConfirmRegistrationComponent;
  let fixture: ComponentFixture<ConfirmRegistrationComponent>;

  beforeEach(async () => {
<<<<<<< Updated upstream
=======
    const authenticationServiceMocked = {
      confirmRegistration: jasmine.createSpy('confirmRegistration').and.returnValue(of(new Observable<string>()))
    };
>>>>>>> Stashed changes
    await TestBed.configureTestingModule({
      declarations: [ ConfirmRegistrationComponent ]
    })
    .compileComponents();
<<<<<<< Updated upstream
=======

    await TestBed.configureTestingModule({
      declarations: [ ConfirmRegistrationComponent ],
      providers: [
        { provide: AuthenticationService, useValue: authenticationServiceMocked },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: (token: string) =>  'token'  } } } }
      ]
    })
    .compileComponents();
>>>>>>> Stashed changes
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
