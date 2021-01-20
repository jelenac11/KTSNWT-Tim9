import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordComponent } from './forgot-password.component';

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;

  beforeEach(async () => {
<<<<<<< Updated upstream
    await TestBed.configureTestingModule({
      declarations: [ ForgotPasswordComponent ]
    })
    .compileComponents();
=======
    const snackBarMocked = {
      success: jasmine.createSpy('success'),
      error: jasmine.createSpy('error')
    };
    const authenticationServiceMocked = {
      forgotPassword: jasmine.createSpy('forgotPassword').and.returnValue(of(new Observable<string>()))
    };

    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [ ForgotPasswordComponent ],
      providers: [
        { provide: Snackbar, useValue: snackBarMocked },
        { provide: AuthenticationService, useValue: authenticationServiceMocked }
      ]
    });
  });

  it('should create', () => {
    TestBed.compileComponents();
    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    authenticationService = TestBed.inject(AuthenticationService);
    snackBar = TestBed.inject(Snackbar);
    expect(component).toBeTruthy();
>>>>>>> Stashed changes
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
