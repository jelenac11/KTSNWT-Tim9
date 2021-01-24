import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { Observable, of, throwError } from 'rxjs';
import { User } from 'src/app/core/models/response/user.model';
import { UserService } from 'src/app/core/services/user.service';
import { Snackbar } from 'src/app/shared/snackbars/snackbar/snackbar';

import { AddAdminComponent } from './add-admin.component';

describe('AddAdminComponent', () => {
  let component: AddAdminComponent;
  let fixture: ComponentFixture<AddAdminComponent>;
  let snackBar: Snackbar;
  let dialogRef: MatDialogRef<AddAdminComponent>;
  let userService: UserService;

  beforeEach(async () => {
    const snackBarMocked = {
      success: jasmine.createSpy('success'),
      error: jasmine.createSpy('error')
    };
    const userServiceMocked = {
      addAdmin: jasmine.createSpy('addAdmin').and.returnValue(of(new Observable<User>())),
    };
    const dialogRefMock = {
      close: jasmine.createSpy('close')
    };

    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [ AddAdminComponent ],
      providers: [
        { provide: Snackbar, useValue: snackBarMocked },
        { provide: UserService, useValue: userServiceMocked },
        { provide: MatDialogRef, useValue: dialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    });
  });

  it('should create', () => {
    fixture = TestBed.createComponent(AddAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    userService = TestBed.inject(UserService);
    snackBar = TestBed.inject(Snackbar);
    dialogRef = TestBed.inject(MatDialogRef);
    expect(component).toBeTruthy();
  });

  it('should be initialized', () => {
    fixture = TestBed.createComponent(AddAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    userService = TestBed.inject(UserService);
    snackBar = TestBed.inject(Snackbar);
    dialogRef = TestBed.inject(MatDialogRef);
    component.ngOnInit();
    expect(component.form).toBeDefined();
    expect(component.form.invalid).toBeTruthy();
  });

  it('should be closed on close button', () => {
    fixture = TestBed.createComponent(AddAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    userService = TestBed.inject(UserService);
    snackBar = TestBed.inject(Snackbar);
    dialogRef = TestBed.inject(MatDialogRef);
    component.close();
    expect(dialogRef.close).toHaveBeenCalledTimes(1);
  });

  function newEvent(eventName: string, bubbles = false, cancelable = false): CustomEvent<any> {
    const evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(eventName, bubbles, cancelable, null);
    return evt;
  }

  it('should bind form fields to form', fakeAsync(() => {
    fixture = TestBed.createComponent(AddAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    userService = TestBed.inject(UserService);
    snackBar = TestBed.inject(Snackbar);
    dialogRef = TestBed.inject(MatDialogRef);

    fixture.detectChanges();
    tick();

    expect(component.form.value.firstName).not.toBe('Jelena');
    expect(component.form.value.lastName).not.toBe('Cupac');
    expect(component.form.value.username).not.toBe('jelenac');
    expect(component.form.value.email).not.toBe('email@gmail.com');

    const firstNameInput = fixture.debugElement.query(By.css('#add-admin-firstname')).nativeElement;
    firstNameInput.value = 'Jelena';
    const lastNameInput = fixture.debugElement.query(By.css('#add-admin-lastname')).nativeElement;
    lastNameInput.value = 'Cupac';
    const usernameInput = fixture.debugElement.query(By.css('#add-admin-username')).nativeElement;
    usernameInput.value = 'jelenac';
    const emailInput = fixture.debugElement.query(By.css('#add-admin-email')).nativeElement;
    emailInput.value = 'email@gmail.com';

    emailInput.dispatchEvent(newEvent('input'));
    usernameInput.dispatchEvent(newEvent('input'));
    firstNameInput.dispatchEvent(newEvent('input'));
    lastNameInput.dispatchEvent(newEvent('input'));

    expect(component.form.value.firstName).toBe('Jelena');
    expect(component.form.value.lastName).toBe('Cupac');
    expect(component.form.value.username).toBe('jelenac');
    expect(component.form.value.email).toBe('email@gmail.com');
  }));

  it('should be invalid form when submitted and inputs are empty', () => {
    fixture = TestBed.createComponent(AddAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    userService = TestBed.inject(UserService);
    snackBar = TestBed.inject(Snackbar);
    dialogRef = TestBed.inject(MatDialogRef);

    component.form.controls.firstName.setValue('');
    component.form.controls.lastName.setValue('');
    component.form.controls.username.setValue('');
    component.form.controls.email.setValue('');
    component.add();

    expect(component.form.invalid).toBeTruthy();
    expect(userService.addAdmin).toHaveBeenCalledTimes(0);
    expect(snackBar.success).toHaveBeenCalledTimes(0);

    const firstNameErrorMsg = fixture.debugElement.query(By.css('#add-admin-firstname-error')).nativeElement;
    expect(firstNameErrorMsg).toBeDefined();
    expect(firstNameErrorMsg.innerHTML).toContain('First Name is required');

    const lastNameErrorMsg = fixture.debugElement.query(By.css('#add-admin-lastname-error')).nativeElement;
    expect(lastNameErrorMsg).toBeDefined();
    expect(lastNameErrorMsg.innerHTML).toContain('Last Name is required');

    const usernameErrorMsg = fixture.debugElement.query(By.css('#add-admin-username-error')).nativeElement;
    expect(usernameErrorMsg).toBeDefined();
    expect(usernameErrorMsg.innerHTML).toContain('Username is required');

    const emailErrorMsg = fixture.debugElement.query(By.css('#add-admin-email-error')).nativeElement;
    expect(emailErrorMsg).toBeDefined();
    expect(emailErrorMsg.innerHTML).toContain('Email is required');
  });

  it('should be invalid form when submitted and first name is empty', () => {
    fixture = TestBed.createComponent(AddAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    userService = TestBed.inject(UserService);
    snackBar = TestBed.inject(Snackbar);
    dialogRef = TestBed.inject(MatDialogRef);

    component.form.controls.firstName.setValue('');
    component.form.controls.lastName.setValue('Cupac');
    component.form.controls.username.setValue('jelenac');
    component.form.controls.email.setValue('email@gmail.com');
    component.add();

    expect(component.form.invalid).toBeTruthy();
    expect(userService.addAdmin).toHaveBeenCalledTimes(0);
    expect(snackBar.success).toHaveBeenCalledTimes(0);

    const firstNameErrorMsg = fixture.debugElement.query(By.css('#add-admin-firstname-error')).nativeElement;
    expect(firstNameErrorMsg).toBeDefined();
    expect(firstNameErrorMsg.innerHTML).toContain('First Name is required');
  });

  it('should be invalid form when submitted and last name is empty', () => {
    fixture = TestBed.createComponent(AddAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    userService = TestBed.inject(UserService);
    snackBar = TestBed.inject(Snackbar);
    dialogRef = TestBed.inject(MatDialogRef);

    component.form.controls.firstName.setValue('Jelena');
    component.form.controls.lastName.setValue('');
    component.form.controls.username.setValue('jelenac');
    component.form.controls.email.setValue('email@gmail.com');
    component.add();

    expect(component.form.invalid).toBeTruthy();
    expect(userService.addAdmin).toHaveBeenCalledTimes(0);
    expect(snackBar.success).toHaveBeenCalledTimes(0);

    const firstNameErrorMsg = fixture.debugElement.query(By.css('#add-admin-lastname-error')).nativeElement;
    expect(firstNameErrorMsg).toBeDefined();
    expect(firstNameErrorMsg.innerHTML).toContain('Last Name is required');
  });

  it('should be invalid form when submitted and email is empty', () => {
    fixture = TestBed.createComponent(AddAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    userService = TestBed.inject(UserService);
    snackBar = TestBed.inject(Snackbar);
    dialogRef = TestBed.inject(MatDialogRef);

    component.form.controls.firstName.setValue('Jelena');
    component.form.controls.lastName.setValue('Cupac');
    component.form.controls.username.setValue('jelenac');
    component.form.controls.email.setValue('');
    component.add();

    expect(component.form.invalid).toBeTruthy();
    expect(userService.addAdmin).toHaveBeenCalledTimes(0);
    expect(snackBar.success).toHaveBeenCalledTimes(0);

    const firstNameErrorMsg = fixture.debugElement.query(By.css('#add-admin-email-error')).nativeElement;
    expect(firstNameErrorMsg).toBeDefined();
    expect(firstNameErrorMsg.innerHTML).toContain('Email is required');
  });

  it('should be invalid form when submitted and username is empty', () => {
    fixture = TestBed.createComponent(AddAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    userService = TestBed.inject(UserService);
    snackBar = TestBed.inject(Snackbar);
    dialogRef = TestBed.inject(MatDialogRef);

    component.form.controls.firstName.setValue('Jelena');
    component.form.controls.lastName.setValue('Cupac');
    component.form.controls.username.setValue('');
    component.form.controls.email.setValue('email@gmail.com');
    component.add();

    expect(component.form.invalid).toBeTruthy();
    expect(userService.addAdmin).toHaveBeenCalledTimes(0);
    expect(snackBar.success).toHaveBeenCalledTimes(0);

    const firstNameErrorMsg = fixture.debugElement.query(By.css('#add-admin-username-error')).nativeElement;
    expect(firstNameErrorMsg).toBeDefined();
    expect(firstNameErrorMsg.innerHTML).toContain('Username is required');
  });

  it('should be invalid form when submitted and email is not valid', () => {
    fixture = TestBed.createComponent(AddAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    userService = TestBed.inject(UserService);
    snackBar = TestBed.inject(Snackbar);
    dialogRef = TestBed.inject(MatDialogRef);

    component.form.controls.firstName.setValue('Jelena');
    component.form.controls.lastName.setValue('Cupac');
    component.form.controls.username.setValue('jelenac');
    component.form.controls.email.setValue('emailgmail.com');
    fixture.detectChanges();
    component.add();

    expect(component.form.invalid).toBeTruthy();
    expect(userService.addAdmin).toHaveBeenCalledTimes(0);
    expect(snackBar.success).toHaveBeenCalledTimes(0);

    const firstNameErrorMsg = fixture.debugElement.query(By.css('#add-admin-email-invalid')).nativeElement;
    expect(firstNameErrorMsg).toBeDefined();
    expect(firstNameErrorMsg.innerHTML).toContain('Email is not valid');
  });

  it('should add administator successfully when submitted', fakeAsync(() => {
    fixture = TestBed.createComponent(AddAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    userService = TestBed.inject(UserService);
    snackBar = TestBed.inject(Snackbar);
    dialogRef = TestBed.inject(MatDialogRef);

    component.form.controls.firstName.setValue('Jelena');
    component.form.controls.lastName.setValue('Cupac');
    component.form.controls.username.setValue('jelenac');
    component.form.controls.email.setValue('email@gmail.com');
    component.add();
    fixture.detectChanges();

    expect(component.form.invalid).toBeFalsy();
    expect(userService.addAdmin).toHaveBeenCalledTimes(1);
    tick();
    expect(snackBar.success).toHaveBeenCalledOnceWith('Administrator added successfully.');
    expect(dialogRef.close).toHaveBeenCalledTimes(1);
    expect(snackBar.error).toHaveBeenCalledTimes(0);
  }));

  it('should return email already exists when submitted', fakeAsync(() => {
    const userServiceMocked2 = {
      addAdmin: jasmine.createSpy('addAdmin').and.returnValue(throwError({
        timestamp: 1611078300751,
        status: 409,
        error: 'Email already exists.',
        message: '',
        path: '/admins'
      }))
    };
    TestBed.overrideProvider(UserService, {useValue: userServiceMocked2});
    fixture = TestBed.createComponent(AddAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    userService = TestBed.inject(UserService);
    snackBar = TestBed.inject(Snackbar);
    dialogRef = TestBed.inject(MatDialogRef);

    component.form.controls.firstName.setValue('Jelena');
    component.form.controls.lastName.setValue('Cupac');
    component.form.controls.username.setValue('jelenac');
    component.form.controls.email.setValue('existing@gmail.com');
    component.add();

    expect(component.form.invalid).toBeFalsy();
    expect(userService.addAdmin).toHaveBeenCalledTimes(1);
    tick();
    expect(snackBar.error).toHaveBeenCalledWith('Email already exists.');
    expect(snackBar.success).toHaveBeenCalledTimes(0);
  }));

  it('should return username already exists when submitted', fakeAsync(() => {
    const userServiceMocked2 = {
      addAdmin: jasmine.createSpy('addAdmin').and.returnValue(throwError({
        timestamp: 1611078300751,
        status: 409,
        error: 'Username already exists.',
        message: '',
        path: '/admins'
      }))
    };
    TestBed.overrideProvider(UserService, {useValue: userServiceMocked2});
    fixture = TestBed.createComponent(AddAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    userService = TestBed.inject(UserService);
    snackBar = TestBed.inject(Snackbar);
    dialogRef = TestBed.inject(MatDialogRef);

    component.form.controls.firstName.setValue('Jelena');
    component.form.controls.lastName.setValue('Cupac');
    component.form.controls.username.setValue('aleksag');
    component.form.controls.email.setValue('email@gmail.com');
    component.add();

    expect(component.form.invalid).toBeFalsy();
    expect(userService.addAdmin).toHaveBeenCalledTimes(1);
    tick();
    expect(snackBar.error).toHaveBeenCalledWith('Username already exists.');
    expect(snackBar.success).toHaveBeenCalledTimes(0);
  }));

});
