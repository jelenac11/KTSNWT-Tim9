import { ComponentFixture, fakeAsync, TestBed, TestComponentRenderer, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { UserService } from 'src/app/core/services/user.service';
import { Snackbar } from 'src/app/shared/snackbars/snackbar/snackbar';
import { Observable, of, throwError } from 'rxjs';
import { SignUpComponent } from './sign-up.component';
import { User } from 'src/app/core/models/response/user.model';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let snackBar: Snackbar;
  let userService: UserService;

  beforeEach(async () => {
    const snackBarMocked = {
      success: jasmine.createSpy('success'),
      error: jasmine.createSpy('error')
    };
    const userServiceMocked = {
      signup: jasmine.createSpy('signup').and.returnValue(of(new Observable<User>()))
    };

    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [ SignUpComponent ],
      providers: [
        { provide: Snackbar, useValue: snackBarMocked },
        { provide: UserService, useValue: userServiceMocked }
      ]
    });
  });

  it('should create', () => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    userService = TestBed.inject(UserService);
    snackBar = TestBed.inject(Snackbar);
    expect(component).toBeTruthy();
  });

  it('should be initialized', () => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    userService = TestBed.inject(UserService);
    snackBar = TestBed.inject(Snackbar);
    component.ngOnInit();
    expect(component.registerForm).toBeDefined();
    expect(component.registerForm.invalid).toBeTruthy();
  });

  it('should be invalid form when submitted and inputs are empty', () => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    userService = TestBed.inject(UserService);
    snackBar = TestBed.inject(Snackbar);

    component.registerForm.controls.firstName.setValue('');
    component.registerForm.controls.lastName.setValue('');
    component.registerForm.controls.username.setValue('');
    component.registerForm.controls.email.setValue('');
    component.registerForm.controls.password.setValue('');
    component.onSubmit();

    expect(component.registerForm.invalid).toBeTruthy();
    expect(userService.signup).toHaveBeenCalledTimes(0);
    expect(snackBar.success).toHaveBeenCalledTimes(0);

    const firstNameErrorMsg = fixture.debugElement.query(By.css('#signup-firstname-error')).nativeElement;
    expect(firstNameErrorMsg).toBeDefined();
    expect(firstNameErrorMsg.innerHTML).toContain('First Name is required');

    const lastNameErrorMsg = fixture.debugElement.query(By.css('#signup-lastname-error')).nativeElement;
    expect(lastNameErrorMsg).toBeDefined();
    expect(lastNameErrorMsg.innerHTML).toContain('Last Name is required');

    const usernameErrorMsg = fixture.debugElement.query(By.css('#signup-username-error')).nativeElement;
    expect(usernameErrorMsg).toBeDefined();
    expect(usernameErrorMsg.innerHTML).toContain('Username is required');

    const emailErrorMsg = fixture.debugElement.query(By.css('#signup-email-error-required')).nativeElement;
    expect(emailErrorMsg).toBeDefined();
    expect(emailErrorMsg.innerHTML).toContain('Email is required');

    const passwordErrorMsg = fixture.debugElement.query(By.css('#signup-password-error-required')).nativeElement;
    expect(passwordErrorMsg).toBeDefined();
    expect(passwordErrorMsg.innerHTML).toContain('Password is required');
  });

  it('should be invalid form when submitted and first name is empty', () => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    userService = TestBed.inject(UserService);
    snackBar = TestBed.inject(Snackbar);

    component.registerForm.controls.firstName.setValue('');
    component.registerForm.controls.lastName.setValue('Cupac');
    component.registerForm.controls.username.setValue('jelenac');
    component.registerForm.controls.email.setValue('email@gmail.com');
    component.registerForm.controls.password.setValue('sifra123');
    component.onSubmit();

    expect(component.registerForm.invalid).toBeTruthy();
    expect(userService.signup).toHaveBeenCalledTimes(0);
    expect(snackBar.success).toHaveBeenCalledTimes(0);

    const firstNameErrorMsg = fixture.debugElement.query(By.css('#signup-firstname-error')).nativeElement;
    expect(firstNameErrorMsg).toBeDefined();
    expect(firstNameErrorMsg.innerHTML).toContain('First Name is required');
  });

  it('should be invalid form when submitted and last name is empty', () => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    userService = TestBed.inject(UserService);
    snackBar = TestBed.inject(Snackbar);

    component.registerForm.controls.firstName.setValue('Jelena');
    component.registerForm.controls.lastName.setValue('');
    component.registerForm.controls.username.setValue('jelenac');
    component.registerForm.controls.email.setValue('email@gmail.com');
    component.registerForm.controls.password.setValue('sifra123');
    component.onSubmit();

    expect(component.registerForm.invalid).toBeTruthy();
    expect(userService.signup).toHaveBeenCalledTimes(0);
    expect(snackBar.success).toHaveBeenCalledTimes(0);

    const lastNameErrorMsg = fixture.debugElement.query(By.css('#signup-lastname-error')).nativeElement;
    expect(lastNameErrorMsg).toBeDefined();
    expect(lastNameErrorMsg.innerHTML).toContain('Last Name is required');
  });

  it('should be invalid form when submitted and username is empty', () => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    userService = TestBed.inject(UserService);
    snackBar = TestBed.inject(Snackbar);

    component.registerForm.controls.firstName.setValue('Jelena');
    component.registerForm.controls.lastName.setValue('Cupac');
    component.registerForm.controls.username.setValue('');
    component.registerForm.controls.email.setValue('email@gmail.com');
    component.registerForm.controls.password.setValue('sifra123');
    component.onSubmit();

    expect(component.registerForm.invalid).toBeTruthy();
    expect(userService.signup).toHaveBeenCalledTimes(0);
    expect(snackBar.success).toHaveBeenCalledTimes(0);

    const usernameErrorMsg = fixture.debugElement.query(By.css('#signup-username-error')).nativeElement;
    expect(usernameErrorMsg).toBeDefined();
    expect(usernameErrorMsg.innerHTML).toContain('Username is required');
  });

  it('should be invalid form when submitted and email is empty', () => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    userService = TestBed.inject(UserService);
    snackBar = TestBed.inject(Snackbar);

    component.registerForm.controls.firstName.setValue('Jelena');
    component.registerForm.controls.lastName.setValue('Cupac');
    component.registerForm.controls.username.setValue('jelenac');
    component.registerForm.controls.email.setValue('');
    component.registerForm.controls.password.setValue('sifra123');
    component.onSubmit();

    expect(component.registerForm.invalid).toBeTruthy();
    expect(userService.signup).toHaveBeenCalledTimes(0);
    expect(snackBar.success).toHaveBeenCalledTimes(0);

    const emailErrorMsg = fixture.debugElement.query(By.css('#signup-email-error-required')).nativeElement;
    expect(emailErrorMsg).toBeDefined();
    expect(emailErrorMsg.innerHTML).toContain('Email is required');
  });

  it('should be invalid form when submitted and password is empty', () => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    userService = TestBed.inject(UserService);
    snackBar = TestBed.inject(Snackbar);

    component.registerForm.controls.firstName.setValue('Jelena');
    component.registerForm.controls.lastName.setValue('Cupac');
    component.registerForm.controls.username.setValue('jelenac');
    component.registerForm.controls.email.setValue('email@gmail.com');
    component.registerForm.controls.password.setValue('');
    component.onSubmit();

    expect(component.registerForm.invalid).toBeTruthy();
    expect(userService.signup).toHaveBeenCalledTimes(0);
    expect(snackBar.success).toHaveBeenCalledTimes(0);

    const passwordErrorMsg = fixture.debugElement.query(By.css('#signup-password-error-required')).nativeElement;
    expect(passwordErrorMsg).toBeDefined();
    expect(passwordErrorMsg.innerHTML).toContain('Password is required');
  });

  it('should be invalid form when submitted and email is not valid', () => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    userService = TestBed.inject(UserService);
    snackBar = TestBed.inject(Snackbar);

    component.registerForm.controls.firstName.setValue('Jelena');
    component.registerForm.controls.lastName.setValue('Cupac');
    component.registerForm.controls.username.setValue('jelenac');
    component.registerForm.controls.email.setValue('emailgmail.com');
    component.registerForm.controls.password.setValue('sifra123');
    component.onSubmit();
    fixture.detectChanges();

    expect(component.registerForm.invalid).toBeTruthy();
    expect(userService.signup).toHaveBeenCalledTimes(0);
    expect(snackBar.success).toHaveBeenCalledTimes(0);

    const emailErrorMsg = fixture.debugElement.query(By.css('#signup-email-error')).nativeElement;
    expect(emailErrorMsg).toBeDefined();
    expect(emailErrorMsg.innerHTML).toContain('Email is not valid');
  });

  it('should be invalid form when submitted and password is less than 6 characters long', () => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    userService = TestBed.inject(UserService);
    snackBar = TestBed.inject(Snackbar);

    component.registerForm.controls.firstName.setValue('Jelena');
    component.registerForm.controls.lastName.setValue('Cupac');
    component.registerForm.controls.username.setValue('jelenac');
    component.registerForm.controls.email.setValue('email@gmail.com');
    component.registerForm.controls.password.setValue('ss');
    component.onSubmit();
    fixture.detectChanges();

    expect(component.registerForm.invalid).toBeTruthy();
    expect(userService.signup).toHaveBeenCalledTimes(0);
    expect(snackBar.success).toHaveBeenCalledTimes(0);

    const passwordErrorMsg = fixture.debugElement.query(By.css('#signup-password-length-error')).nativeElement;
    expect(passwordErrorMsg).toBeDefined();
    expect(passwordErrorMsg.innerHTML).toContain('Password must be at least 6 characters long');
  });

  function newEvent(eventName: string, bubbles = false, cancelable = false): CustomEvent<any> {
    const evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(eventName, bubbles, cancelable, null);
    return evt;
  }

  it('should bind form fields to register form', fakeAsync(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    userService = TestBed.inject(UserService);
    snackBar = TestBed.inject(Snackbar);

    fixture.detectChanges();
    tick();

    expect(component.registerForm.value.firstName).not.toBe('Jelena');
    expect(component.registerForm.value.lastName).not.toBe('Cupac');
    expect(component.registerForm.value.username).not.toBe('jelenac');
    expect(component.registerForm.value.email).not.toBe('email@gmail.com');
    expect(component.registerForm.value.password).not.toBe('sifra123');

    const passwordInput = fixture.debugElement.query(By.css('#signup-password')).nativeElement;
    passwordInput.value = 'sifra123';
    const firstNameInput = fixture.debugElement.query(By.css('#signup-firstname')).nativeElement;
    firstNameInput.value = 'Jelena';
    const lastNameInput = fixture.debugElement.query(By.css('#signup-lastname')).nativeElement;
    lastNameInput.value = 'Cupac';
    const usernameInput = fixture.debugElement.query(By.css('#signup-username')).nativeElement;
    usernameInput.value = 'jelenac';
    const emailInput = fixture.debugElement.query(By.css('#signup-email')).nativeElement;
    emailInput.value = 'email@gmail.com';

    emailInput.dispatchEvent(newEvent('input'));
    usernameInput.dispatchEvent(newEvent('input'));
    firstNameInput.dispatchEvent(newEvent('input'));
    lastNameInput.dispatchEvent(newEvent('input'));
    passwordInput.dispatchEvent(newEvent('input'));

    expect(component.registerForm.value.password).toBe('sifra123');
    expect(component.registerForm.value.firstName).toBe('Jelena');
    expect(component.registerForm.value.lastName).toBe('Cupac');
    expect(component.registerForm.value.username).toBe('jelenac');
    expect(component.registerForm.value.email).toBe('email@gmail.com');
  }));

  it('should send actication link when submitted', fakeAsync(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    userService = TestBed.inject(UserService);
    snackBar = TestBed.inject(Snackbar);

    component.registerForm.controls.firstName.setValue('Jelena');
    component.registerForm.controls.lastName.setValue('Cupac');
    component.registerForm.controls.username.setValue('jelenac');
    component.registerForm.controls.email.setValue('email@gmail.com');
    component.registerForm.controls.password.setValue('sifra123');
    component.onSubmit();
    fixture.detectChanges();

    expect(component.registerForm.invalid).toBeFalsy();
    expect(userService.signup).toHaveBeenCalledTimes(1);
    tick();
    expect(snackBar.success).toHaveBeenCalledTimes(1);
    expect(snackBar.error).toHaveBeenCalledTimes(0);
  }));

  it('should return email already exists when submitted', fakeAsync(() => {
    const userServiceMocked2 = {
      signup: jasmine.createSpy('signup').and.returnValue(throwError({
        timestamp: 1611078300751,
        status: 409,
        error: 'Email already exists.',
        message: '',
        path: '/auth/sign-up'
      }))
    };
    TestBed.overrideProvider(UserService, {useValue: userServiceMocked2});
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    userService = TestBed.inject(UserService);
    snackBar = TestBed.inject(Snackbar);

    component.registerForm.controls.firstName.setValue('Jelena');
    component.registerForm.controls.lastName.setValue('Cupac');
    component.registerForm.controls.username.setValue('jelenac');
    component.registerForm.controls.email.setValue('existing@gmail.com');
    component.registerForm.controls.password.setValue('sifra123');
    component.onSubmit();

    expect(component.registerForm.invalid).toBeFalsy();
    expect(userService.signup).toHaveBeenCalledTimes(1);
    tick();
    expect(snackBar.error).toHaveBeenCalledWith('Email already exists.');
    expect(snackBar.success).toHaveBeenCalledTimes(0);
  }));

  it('should return username already exists when submitted', fakeAsync(() => {
    const userServiceMocked3 = {
      signup: jasmine.createSpy('signup').and.returnValue(throwError({
        timestamp: 1611078300751,
        status: 409,
        error: 'Username already exists.',
        message: '',
        path: '/auth/sign-up'
      }))
    };
    TestBed.overrideProvider(UserService, {useValue: userServiceMocked3});
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    userService = TestBed.inject(UserService);
    snackBar = TestBed.inject(Snackbar);

    component.registerForm.controls.firstName.setValue('Jelena');
    component.registerForm.controls.lastName.setValue('Cupac');
    component.registerForm.controls.username.setValue('existing');
    component.registerForm.controls.email.setValue('email@gmail.com');
    component.registerForm.controls.password.setValue('sifra123');
    component.onSubmit();

    expect(component.registerForm.invalid).toBeFalsy();
    expect(userService.signup).toHaveBeenCalledTimes(1);
    tick();
    expect(snackBar.error).toHaveBeenCalledWith('Username already exists.');
    expect(snackBar.success).toHaveBeenCalledTimes(0);
  }));

});
