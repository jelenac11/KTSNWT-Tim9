import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { Snackbar } from 'src/app/shared/snackbars/snackbar/snackbar';

import { ChangePasswordComponent } from './change-password.component';

describe('ChangePasswordComponent', () => {
  let component: ChangePasswordComponent;
  let fixture: ComponentFixture<ChangePasswordComponent>;
  let snackBar: Snackbar;
  let dialogRef: MatDialogRef<ChangePasswordComponent>;
  let authenticationService: AuthenticationService;
  let router: Router;

  beforeEach(async () => {
    const snackBarMocked = {
      success: jasmine.createSpy('success'),
      error: jasmine.createSpy('error')
    };
    const authenticationServiceMocked = {
      changePassword: jasmine.createSpy('changePassword').and.returnValue(of(new Observable<string>())),
      logout: jasmine.createSpy('logout')
    };
    const dialogRefMock = {
      close: jasmine.createSpy('close')
    };
    const routerMock = {
      navigate: jasmine.createSpy('navigate')
    };

    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [ ChangePasswordComponent ],
      providers: [
        { provide: Snackbar, useValue: snackBarMocked },
        { provide: AuthenticationService, useValue: authenticationServiceMocked },
        { provide: MatDialogRef, useValue: dialogRefMock },
        { provide: Router, useValue: routerMock },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    });
  });

  it('should create', () => {
    fixture = TestBed.createComponent(ChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    authenticationService = TestBed.inject(AuthenticationService);
    snackBar = TestBed.inject(Snackbar);
    dialogRef = TestBed.inject(MatDialogRef);
    router = TestBed.inject(Router);
    expect(component).toBeTruthy();
  });

  it('should be initialized', () => {
    fixture = TestBed.createComponent(ChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    authenticationService = TestBed.inject(AuthenticationService);
    snackBar = TestBed.inject(Snackbar);
    dialogRef = TestBed.inject(MatDialogRef);
    router = TestBed.inject(Router);
    component.ngOnInit();
    expect(component.form).toBeDefined();
    expect(component.form.invalid).toBeTruthy();
  });

  it('should be closed on close button', () => {
    fixture = TestBed.createComponent(ChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    authenticationService = TestBed.inject(AuthenticationService);
    snackBar = TestBed.inject(Snackbar);
    dialogRef = TestBed.inject(MatDialogRef);
    router = TestBed.inject(Router);
    component.close();
    expect(dialogRef.close).toHaveBeenCalledTimes(1);
  });

  function newEvent(eventName: string, bubbles = false, cancelable = false): CustomEvent<any> {
    const evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(eventName, bubbles, cancelable, null);
    return evt;
  }

  it('should bind form fields to form', fakeAsync(() => {
    fixture = TestBed.createComponent(ChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    authenticationService = TestBed.inject(AuthenticationService);
    snackBar = TestBed.inject(Snackbar);
    dialogRef = TestBed.inject(MatDialogRef);
    router = TestBed.inject(Router);

    fixture.detectChanges();
    tick();

    expect(component.form.value.oldPassword).not.toBe('sifra123');
    expect(component.form.value.newPassword).not.toBe('novasifra');
    expect(component.form.value.confirmPassword).not.toBe('novasifra');

    const oldPasswordInput = fixture.debugElement.query(By.css('#old-password')).nativeElement;
    oldPasswordInput.value = 'sifra123';
    const newPasswordInput = fixture.debugElement.query(By.css('#new-password')).nativeElement;
    newPasswordInput.value = 'novasifra';
    const confirmPasswordInput = fixture.debugElement.query(By.css('#confirm-password')).nativeElement;
    confirmPasswordInput.value = 'novasifra';

    oldPasswordInput.dispatchEvent(newEvent('input'));
    newPasswordInput.dispatchEvent(newEvent('input'));
    confirmPasswordInput.dispatchEvent(newEvent('input'));

    expect(component.form.value.oldPassword).toBe('sifra123');
    expect(component.form.value.newPassword).toBe('novasifra');
    expect(component.form.value.confirmPassword).toBe('novasifra');
  }));

  it('should be invalid form when submitted and inputs are empty', () => {
    fixture = TestBed.createComponent(ChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    authenticationService = TestBed.inject(AuthenticationService);
    snackBar = TestBed.inject(Snackbar);
    dialogRef = TestBed.inject(MatDialogRef);
    router = TestBed.inject(Router);

    component.form.controls.oldPassword.setValue('');
    component.form.controls.newPassword.setValue('');
    component.form.controls.confirmPassword.setValue('');
    fixture.detectChanges();
    component.onSubmit();

    expect(component.form.invalid).toBeTruthy();
    expect(authenticationService.changePassword).toHaveBeenCalledTimes(0);
    expect(snackBar.success).toHaveBeenCalledTimes(0);

    const oldPasswordErrorMsg = fixture.debugElement.query(By.css('#old-password-error')).nativeElement;
    expect(oldPasswordErrorMsg).toBeDefined();
    expect(oldPasswordErrorMsg.innerHTML).toContain('Old password is required');

    const newPasswordErrorMsg = fixture.debugElement.query(By.css('#new-password-error')).nativeElement;
    expect(newPasswordErrorMsg).toBeDefined();
    expect(newPasswordErrorMsg.innerHTML).toContain('New password is required');
  });

  it('should be invalid form when submitted and old password is empty', () => {
    fixture = TestBed.createComponent(ChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    authenticationService = TestBed.inject(AuthenticationService);
    snackBar = TestBed.inject(Snackbar);
    dialogRef = TestBed.inject(MatDialogRef);
    router = TestBed.inject(Router);

    component.form.controls.oldPassword.setValue('');
    component.form.controls.newPassword.setValue('novasifra');
    component.form.controls.confirmPassword.setValue('novasifra');
    fixture.detectChanges();
    component.onSubmit();

    expect(component.form.invalid).toBeTruthy();
    expect(authenticationService.changePassword).toHaveBeenCalledTimes(0);
    expect(snackBar.success).toHaveBeenCalledTimes(0);

    const oldPasswordErrorMsg = fixture.debugElement.query(By.css('#old-password-error')).nativeElement;
    expect(oldPasswordErrorMsg).toBeDefined();
    expect(oldPasswordErrorMsg.innerHTML).toContain('Old password is required');
  });

  it('should be invalid form when submitted and new password is empty', () => {
    fixture = TestBed.createComponent(ChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    authenticationService = TestBed.inject(AuthenticationService);
    snackBar = TestBed.inject(Snackbar);
    dialogRef = TestBed.inject(MatDialogRef);
    router = TestBed.inject(Router);

    component.form.controls.oldPassword.setValue('sifra123');
    component.form.controls.newPassword.setValue('');
    component.form.controls.confirmPassword.setValue('novasifra');
    fixture.detectChanges();
    component.onSubmit();

    expect(component.form.invalid).toBeTruthy();
    expect(authenticationService.changePassword).toHaveBeenCalledTimes(0);
    expect(snackBar.success).toHaveBeenCalledTimes(0);

    const newPasswordErrorMsg = fixture.debugElement.query(By.css('#new-password-error')).nativeElement;
    expect(newPasswordErrorMsg).toBeDefined();
    expect(newPasswordErrorMsg.innerHTML).toContain('New password is required');

    const confirmPasswordErrorMsg = fixture.debugElement.query(By.css('#no-match')).nativeElement;
    expect(confirmPasswordErrorMsg).toBeDefined();
    expect(confirmPasswordErrorMsg.innerHTML).toContain('New password and confirmed password don\'t match');
  });

  it('should be invalid form when submitted and new password is short', () => {
    fixture = TestBed.createComponent(ChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    authenticationService = TestBed.inject(AuthenticationService);
    snackBar = TestBed.inject(Snackbar);
    dialogRef = TestBed.inject(MatDialogRef);
    router = TestBed.inject(Router);

    component.form.controls.oldPassword.setValue('sifra123');
    component.form.controls.newPassword.setValue('sifra');
    component.form.controls.confirmPassword.setValue('novasifra');
    fixture.detectChanges();
    component.onSubmit();

    expect(component.form.invalid).toBeTruthy();
    expect(authenticationService.changePassword).toHaveBeenCalledTimes(0);
    expect(snackBar.success).toHaveBeenCalledTimes(0);

    const newPasswordErrorMsg = fixture.debugElement.query(By.css('#six-characters')).nativeElement;
    expect(newPasswordErrorMsg).toBeDefined();
    expect(newPasswordErrorMsg.innerHTML).toContain('New password must be at least 6 characters long');

    const confirmPasswordErrorMsg = fixture.debugElement.query(By.css('#no-match')).nativeElement;
    expect(confirmPasswordErrorMsg).toBeDefined();
    expect(confirmPasswordErrorMsg.innerHTML).toContain('New password and confirmed password don\'t match');
  });

  it('should be invalid form when submitted and new and confirmed password dont match', () => {
    fixture = TestBed.createComponent(ChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    authenticationService = TestBed.inject(AuthenticationService);
    snackBar = TestBed.inject(Snackbar);
    dialogRef = TestBed.inject(MatDialogRef);
    router = TestBed.inject(Router);

    component.form.controls.oldPassword.setValue('sifra123');
    component.form.controls.newPassword.setValue('novasifra1');
    component.form.controls.confirmPassword.setValue('novasifra2');
    fixture.detectChanges();
    component.onSubmit();

    expect(component.form.invalid).toBeTruthy();
    expect(authenticationService.changePassword).toHaveBeenCalledTimes(0);
    expect(snackBar.success).toHaveBeenCalledTimes(0);

    const confirmPasswordErrorMsg = fixture.debugElement.query(By.css('#no-match')).nativeElement;
    expect(confirmPasswordErrorMsg).toBeDefined();
    expect(confirmPasswordErrorMsg.innerHTML).toContain('New password and confirmed password don\'t match');
  });

  it('should change password succesfully when submitted', fakeAsync(() => {
    fixture = TestBed.createComponent(ChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    authenticationService = TestBed.inject(AuthenticationService);
    snackBar = TestBed.inject(Snackbar);
    dialogRef = TestBed.inject(MatDialogRef);

    component.form.controls.oldPassword.setValue('sifra123');
    component.form.controls.newPassword.setValue('novasifra');
    component.form.controls.confirmPassword.setValue('novasifra');
    fixture.detectChanges();
    component.onSubmit();

    expect(component.form.invalid).toBeFalsy();
    expect(authenticationService.changePassword).toHaveBeenCalledTimes(1);
    tick();
    expect(snackBar.success).toHaveBeenCalledOnceWith('You changed password successfully.');
    expect(dialogRef.close).toHaveBeenCalledTimes(1);
    expect(snackBar.error).toHaveBeenCalledTimes(0);
    expect(authenticationService.logout).toHaveBeenCalledTimes(1);
  }));

  it('should return incorrect old password when submitted', fakeAsync(() => {
    const authencicationServiceMocked2 = {
      changePassword: jasmine.createSpy('changePassword').and.returnValue(throwError({
        timestamp: 1611078300751,
        status: 400,
        error: 'Incorrect old password',
        message: '',
        path: '/auth/change-password'
      })),
      logout: jasmine.createSpy('logout')
    };
    TestBed.overrideProvider(AuthenticationService, {useValue: authencicationServiceMocked2});
    fixture = TestBed.createComponent(ChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    authenticationService = TestBed.inject(AuthenticationService);
    snackBar = TestBed.inject(Snackbar);
    dialogRef = TestBed.inject(MatDialogRef);
    router = TestBed.inject(Router);

    component.form.controls.oldPassword.setValue('sifra123');
    component.form.controls.newPassword.setValue('novasifra');
    component.form.controls.confirmPassword.setValue('novasifra');
    fixture.detectChanges();
    component.onSubmit();

    expect(component.form.invalid).toBeFalsy();
    expect(authenticationService.changePassword).toHaveBeenCalledTimes(1);
    tick();
    expect(snackBar.success).toHaveBeenCalledTimes(0);
    expect(router.navigate).toHaveBeenCalledTimes(0);
    expect(dialogRef.close).toHaveBeenCalledTimes(0);
    expect(snackBar.error).toHaveBeenCalledOnceWith('Incorrect old password');
    expect(authenticationService.logout).toHaveBeenCalledTimes(0);
  }));

});
