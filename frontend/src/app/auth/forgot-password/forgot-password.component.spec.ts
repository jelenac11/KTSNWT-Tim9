import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of, throwError } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { Snackbar } from 'src/app/shared/snackbars/snackbar/snackbar';

import { ForgotPasswordComponent } from './forgot-password.component';

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;
  let snackBar: Snackbar;
  let authenticationService: AuthenticationService;

  beforeEach(async () => {
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
    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    authenticationService = TestBed.inject(AuthenticationService);
    snackBar = TestBed.inject(Snackbar);
    expect(component).toBeTruthy();
  });

  it('should be initialized', () => {
    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    authenticationService = TestBed.inject(AuthenticationService);
    snackBar = TestBed.inject(Snackbar);
    component.ngOnInit();
    expect(component.forgotForm).toBeDefined();
    expect(component.forgotForm.invalid).toBeTruthy();
  });

  it('should be invalid form when submitted and email is empty', () => {
    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    authenticationService = TestBed.inject(AuthenticationService);
    snackBar = TestBed.inject(Snackbar);

    component.forgotForm.controls.email.setValue('');
    component.onSubmit();

    expect(component.forgotForm.invalid).toBeTruthy();
    expect(authenticationService.forgotPassword).toHaveBeenCalledTimes(0);
    expect(snackBar.success).toHaveBeenCalledTimes(0);

    const emailErrorMsg = fixture.debugElement.query(By.css('#forgot-email-error')).nativeElement;
    expect(emailErrorMsg).toBeDefined();
    expect(emailErrorMsg.innerHTML).toContain('Email is required');
  });

  it('should be invalid form when submitted and email is not valid', () => {
    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    authenticationService = TestBed.inject(AuthenticationService);
    snackBar = TestBed.inject(Snackbar);

    component.forgotForm.controls.email.setValue('emailgmail.com');
    component.onSubmit();
    fixture.detectChanges();

    expect(component.forgotForm.invalid).toBeTruthy();
    expect(authenticationService.forgotPassword).toHaveBeenCalledTimes(0);
    expect(snackBar.success).toHaveBeenCalledTimes(0);

    const emailErrorMsg = fixture.debugElement.query(By.css('#forgot-email-invalid')).nativeElement;
    expect(emailErrorMsg).toBeDefined();
    expect(emailErrorMsg.innerHTML).toContain('Email is not valid');
  });

  function newEvent(eventName: string, bubbles = false, cancelable = false): CustomEvent<any> {
    const evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(eventName, bubbles, cancelable, null);
    return evt;
  }

  it('should bind form fields to forgot form', fakeAsync(() => {
    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    authenticationService = TestBed.inject(AuthenticationService);
    snackBar = TestBed.inject(Snackbar);

    fixture.detectChanges();
    tick();

    expect(component.forgotForm.value.email).not.toBe('email@gmail.com');

    const emailInput = fixture.debugElement.query(By.css('#email-address')).nativeElement;
    emailInput.value = 'email@gmail.com';

    emailInput.dispatchEvent(newEvent('input'));

    expect(component.forgotForm.value.email).toBe('email@gmail.com');
  }));

  it('should send new password when submitted', fakeAsync(() => {
    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    authenticationService = TestBed.inject(AuthenticationService);
    snackBar = TestBed.inject(Snackbar);

    component.forgotForm.controls.email.setValue('email@gmail.com');
    component.onSubmit();

    fixture.detectChanges();

    expect(component.forgotForm.invalid).toBeFalsy();
    expect(authenticationService.forgotPassword).toHaveBeenCalledTimes(1);
    tick();
    expect(snackBar.success).toHaveBeenCalledTimes(1);
    expect(snackBar.error).toHaveBeenCalledTimes(0);
  }));

  it('should return email address is not associated with user account when submitted', fakeAsync(() => {
    const authenticationServiceMocked2 = {
      forgotPassword: jasmine.createSpy('forgotPassword').and.returnValue(throwError({
        status: 400,
        error: 'That email address is not associated with personal user account.',
        message: '',
        path: '/auth/forgot-password'
      }))
    };
    TestBed.overrideProvider(AuthenticationService, {useValue: authenticationServiceMocked2});
    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    authenticationService = TestBed.inject(AuthenticationService);
    snackBar = TestBed.inject(Snackbar);

    component.forgotForm.controls.email.setValue('non_existing@gmail.com');
    component.onSubmit();

    expect(component.forgotForm.invalid).toBeFalsy();
    expect(authenticationService.forgotPassword).toHaveBeenCalledTimes(1);
    tick();
    expect(snackBar.error).toHaveBeenCalledWith('That email address is not associated with personal user account.');
    expect(snackBar.success).toHaveBeenCalledTimes(0);
  }));

});
