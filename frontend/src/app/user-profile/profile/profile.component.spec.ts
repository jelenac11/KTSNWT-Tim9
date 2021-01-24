import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { Observable, of, throwError } from 'rxjs';
import { User } from 'src/app/core/models/response/user.model';
import { UserService } from 'src/app/core/services/user.service';
import { Snackbar } from 'src/app/shared/snackbars/snackbar/snackbar';

import { ProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let snackBar: Snackbar;
  let dialogRef: MatDialogRef<ProfileComponent>;
  let userService: UserService;

  beforeEach(async () => {
    const snackBarMocked = {
      success: jasmine.createSpy('success'),
      error: jasmine.createSpy('error')
    };
    const userServiceMocked = {
      changeProfile: jasmine.createSpy('changeProfile').and.returnValue(of(new Observable<User>())),
      getCurrentUser: jasmine.createSpy('getCurrentUser').and.returnValue(of({ email: 'email@gmail.com', username: 'jelenac', firstName: 'Jelena', lastName: 'Cupac' }))
    };
    const dialogRefMock = {
      close: jasmine.createSpy('close')
    };

    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [ ProfileComponent ],
      providers: [
        { provide: Snackbar, useValue: snackBarMocked },
        { provide: UserService, useValue: userServiceMocked },
        { provide: MatDialogRef, useValue: dialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    });
  });

  it('should create', () => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    userService = TestBed.inject(UserService);
    snackBar = TestBed.inject(Snackbar);
    dialogRef = TestBed.inject(MatDialogRef);
    expect(component).toBeTruthy();
  });

  it('should be initialized', () => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    userService = TestBed.inject(UserService);
    snackBar = TestBed.inject(Snackbar);
    dialogRef = TestBed.inject(MatDialogRef);
    component.ngOnInit();
    expect(userService.getCurrentUser).toHaveBeenCalledTimes(2);
    expect(component.user).toBeDefined();
    expect(component.user.email).toContain('email@gmail.com');
    expect(component.user.username).toContain('jelenac');
    expect(component.user.firstName).toContain('Jelena');
    expect(component.user.lastName).toContain('Cupac');

    const emailProfile = fixture.debugElement.query(By.css('#email-profile')).nativeElement;
    expect(emailProfile).toBeDefined();
    expect(emailProfile.innerHTML).toContain('email@gmail.com');

    const usernameProfile = fixture.debugElement.query(By.css('#username-profile')).nativeElement;
    expect(usernameProfile).toBeDefined();
    expect(usernameProfile.innerHTML).toContain('jelenac');

    const firstNameProfile = fixture.debugElement.query(By.css('#first-name-profile')).nativeElement;
    expect(firstNameProfile).toBeDefined();
    expect(firstNameProfile.innerHTML).toContain('Jelena');

    const lastNameProfile = fixture.debugElement.query(By.css('#last-name-profile')).nativeElement;
    expect(lastNameProfile).toBeDefined();
    expect(lastNameProfile.innerHTML).toContain('Cupac');
  });

  it('should be closed on close button', () => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    userService = TestBed.inject(UserService);
    snackBar = TestBed.inject(Snackbar);
    dialogRef = TestBed.inject(MatDialogRef);
    component.close();
    expect(dialogRef.close).toHaveBeenCalledTimes(1);
  });

  it('should initialize form on edit button', () => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    userService = TestBed.inject(UserService);
    snackBar = TestBed.inject(Snackbar);
    dialogRef = TestBed.inject(MatDialogRef);
    component.startEdit();
    expect(component.form).toBeDefined();
  });

  it('should be invalid form when submitted and inputs are empty', () => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    userService = TestBed.inject(UserService);
    snackBar = TestBed.inject(Snackbar);
    dialogRef = TestBed.inject(MatDialogRef);
    component.startEdit();

    component.form.controls.firstName.setValue('');
    component.form.controls.lastName.setValue('');
    component.form.controls.username.setValue('');
    fixture.detectChanges();
    component.save();

    expect(component.form.invalid).toBeTruthy();
    expect(userService.changeProfile).toHaveBeenCalledTimes(0);
    expect(snackBar.success).toHaveBeenCalledTimes(0);

    const firstNameErrorMsg = fixture.debugElement.query(By.css('#first-name-error')).nativeElement;
    expect(firstNameErrorMsg).toBeDefined();
    expect(firstNameErrorMsg.innerHTML).toContain('First name is required');

    const lastNameErrorMsg = fixture.debugElement.query(By.css('#change-profile-last-name')).nativeElement;
    expect(lastNameErrorMsg).toBeDefined();
    expect(lastNameErrorMsg.innerHTML).toContain('Last name is required');

    const usernameErrorMsg = fixture.debugElement.query(By.css('#change-profile-username')).nativeElement;
    expect(usernameErrorMsg).toBeDefined();
    expect(usernameErrorMsg.innerHTML).toContain('Username is required');
  });

  it('should be invalid form when submitted and username is empty', () => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    userService = TestBed.inject(UserService);
    snackBar = TestBed.inject(Snackbar);
    dialogRef = TestBed.inject(MatDialogRef);
    component.startEdit();

    component.form.controls.firstName.setValue('Jelena');
    component.form.controls.lastName.setValue('Cupac');
    component.form.controls.username.setValue('');
    fixture.detectChanges();
    component.save();

    expect(component.form.invalid).toBeTruthy();
    expect(userService.changeProfile).toHaveBeenCalledTimes(0);
    expect(snackBar.success).toHaveBeenCalledTimes(0);

    const usernameErrorMsg = fixture.debugElement.query(By.css('#change-profile-username')).nativeElement;
    expect(usernameErrorMsg).toBeDefined();
    expect(usernameErrorMsg.innerHTML).toContain('Username is required');
  });

  it('should be invalid form when submitted and first name is empty', () => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    userService = TestBed.inject(UserService);
    snackBar = TestBed.inject(Snackbar);
    dialogRef = TestBed.inject(MatDialogRef);
    component.startEdit();

    component.form.controls.firstName.setValue('');
    component.form.controls.lastName.setValue('Cupac');
    component.form.controls.username.setValue('jelenac');
    fixture.detectChanges();
    component.save();

    expect(component.form.invalid).toBeTruthy();
    expect(userService.changeProfile).toHaveBeenCalledTimes(0);
    expect(snackBar.success).toHaveBeenCalledTimes(0);

    const firstNameErrorMsg = fixture.debugElement.query(By.css('#first-name-error')).nativeElement;
    expect(firstNameErrorMsg).toBeDefined();
    expect(firstNameErrorMsg.innerHTML).toContain('First name is required');
  });

  it('should be invalid form when submitted and last name is empty', () => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    userService = TestBed.inject(UserService);
    snackBar = TestBed.inject(Snackbar);
    dialogRef = TestBed.inject(MatDialogRef);
    component.startEdit();

    component.form.controls.firstName.setValue('Jelena');
    component.form.controls.lastName.setValue('');
    component.form.controls.username.setValue('jelenac');
    fixture.detectChanges();
    component.save();

    expect(component.form.invalid).toBeTruthy();
    expect(userService.changeProfile).toHaveBeenCalledTimes(0);
    expect(snackBar.success).toHaveBeenCalledTimes(0);

    const lastNameErrorMsg = fixture.debugElement.query(By.css('#change-profile-last-name')).nativeElement;
    expect(lastNameErrorMsg).toBeDefined();
    expect(lastNameErrorMsg.innerHTML).toContain('Last name is required');
  });

  function newEvent(eventName: string, bubbles = false, cancelable = false): CustomEvent<any> {
    const evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(eventName, bubbles, cancelable, null);
    return evt;
  }

  it('should bind form fields to form', fakeAsync(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    userService = TestBed.inject(UserService);
    snackBar = TestBed.inject(Snackbar);
    dialogRef = TestBed.inject(MatDialogRef);
    component.startEdit();

    fixture.detectChanges();
    tick();

    const firstNameInput = fixture.debugElement.query(By.css('#first-name-profile-input')).nativeElement;
    firstNameInput.value = 'Jelena';
    const lastNameInput = fixture.debugElement.query(By.css('#last-name-profile-input')).nativeElement;
    lastNameInput.value = 'Cupac';
    const usernameInput = fixture.debugElement.query(By.css('#username-profile-input')).nativeElement;
    usernameInput.value = 'jelenac';

    usernameInput.dispatchEvent(newEvent('input'));
    firstNameInput.dispatchEvent(newEvent('input'));
    lastNameInput.dispatchEvent(newEvent('input'));

    expect(component.form.value.firstName).toBe('Jelena');
    expect(component.form.value.lastName).toBe('Cupac');
    expect(component.form.value.username).toBe('jelenac');
  }));

  it('should change account information succesfully when submitted', fakeAsync(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    userService = TestBed.inject(UserService);
    snackBar = TestBed.inject(Snackbar);
    dialogRef = TestBed.inject(MatDialogRef);
    component.startEdit();

    component.form.controls.firstName.setValue('Jelena2');
    component.form.controls.lastName.setValue('Cupac2');
    component.form.controls.username.setValue('jelenac2');
    fixture.detectChanges();
    component.save();

    expect(component.form.invalid).toBeFalsy();
    expect(userService.changeProfile).toHaveBeenCalledTimes(1);
    tick();
    expect(snackBar.success).toHaveBeenCalledOnceWith('You changed account information successfully.');
    expect(snackBar.error).toHaveBeenCalledTimes(0);
  }));

  it('should return username already exists when submitted', fakeAsync(() => {
    const userServiceMocked2 = {
      changeProfile: jasmine.createSpy('changeProfile').and.returnValue(throwError({
        timestamp: 1611078300751,
        status: 409,
        error: 'Username already exists.',
        message: '',
        path: '/auth/change-profile'
      })),
      getCurrentUser: jasmine.createSpy('getCurrentUser').and.returnValue(of({ email: 'email@gmail.com', username: 'jelenac', firstName: 'Jelena', lastName: 'Cupac' }))
    };
    TestBed.overrideProvider(UserService, {useValue: userServiceMocked2});
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    userService = TestBed.inject(UserService);
    snackBar = TestBed.inject(Snackbar);
    dialogRef = TestBed.inject(MatDialogRef);
    component.startEdit();

    component.form.controls.firstName.setValue('Jelena');
    component.form.controls.lastName.setValue('Cupac');
    component.form.controls.username.setValue('aleksag');
    fixture.detectChanges();
    component.save();

    expect(component.form.invalid).toBeFalsy();
    expect(userService.changeProfile).toHaveBeenCalledTimes(1);
    tick();
    expect(snackBar.error).toHaveBeenCalledOnceWith('Username already exists.');
    expect(snackBar.success).toHaveBeenCalledTimes(0);
  }));

});
