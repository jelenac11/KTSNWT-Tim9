import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PasswordChangeRequest } from 'src/app/core/models/request/password-change-request.model';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { MyErrorStateMatcher } from '../../core/error-matchers/ErrorStateMatcher';
import { Snackbar } from '../../shared/snackbars/snackbar/snackbar';
import { CustomValidators } from '../../core/validators/custom-validators';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  form: FormGroup;
  submited = false;
  matcher: MyErrorStateMatcher = new MyErrorStateMatcher();
  hideOld = true;
  hideNew = true;
  hideConfirm = true;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ChangePasswordComponent>,
    private snackBar: Snackbar,
    private authenticationService: AuthenticationService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) data
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: [CustomValidators.confirmedValidator] });
  }

  get f(): { [key: string]: AbstractControl; } { return this.form.controls; }

  onSubmit(): void {
    this.submited = true;
    if (this.form.invalid) {
      return;
    }
    const passwordChange: PasswordChangeRequest = {oldPassword: '', newPassword: ''};
    passwordChange.oldPassword = this.form.value.oldPassword;
    passwordChange.newPassword = this.form.value.newPassword;
    this.authenticationService.changePassword(passwordChange).subscribe((data: string) => {
      this.snackBar.success('You changed password successfully.');
      this.submited = false;
      this.authenticationService.logout();
      this.router.navigate(['/auth/sign-in']);
      this.dialogRef.close();
    },
    error => {
      if (error.status !== 200) {
        this.snackBar.error(error.error);
      }
    });
  }

  close(): void {
    this.dialogRef.close();
  }

}
