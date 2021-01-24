import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmRegistrationComponent } from './confirm-registration.component';

describe('ConfirmRegistrationComponent', () => {
  let component: ConfirmRegistrationComponent;
  let fixture: ComponentFixture<ConfirmRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
<<<<<<< Updated upstream
      declarations: [ ConfirmRegistrationComponent ]
    })
    .compileComponents();
=======
      declarations: [ ConfirmRegistrationComponent ],
      providers: [
        { provide: AuthenticationService, useValue: authenticationServiceMocked },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: (token: string) =>  'token'  } } } }
      ]
    });
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
