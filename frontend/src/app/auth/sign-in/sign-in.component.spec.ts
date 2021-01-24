import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInComponent } from './sign-in.component';

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
<<<<<<< Updated upstream
      declarations: [ SignInComponent ]
    })
    .compileComponents();
=======
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [ SignInComponent ],
      providers: [
        { provide: AuthenticationService, useValue: authenticationServiceMocked },
        { provide: Router, useValue: routerMocked },
        { provide: Snackbar, useValue: snackBarMocked },
        { provide: JwtService, useValue: jwtServiceMocked }
      ]
    });
>>>>>>> Stashed changes
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
