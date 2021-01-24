import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PasswordChangeRequest } from 'src/app/core/models/request/password-change-request.model';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { MyErrorStateMatcher } from '../ErrorStateMatcher';
import { Snackbar } from '../snackbars/snackbar/snackbar';
import { CustomValidators } from '../validators/custom-validators';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  form: FormGroup;
  submited: boolean = false;
  matcher: MyErrorStateMatcher = new MyErrorStateMatcher();
  hideOld: boolean = true;
  hideNew: boolean = true;
  hideConfirm: boolean = true;

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

  get f() { return this.form.controls; }

  onSubmit(): void {
    this.submited = true;
    if (this.form.invalid) {
      return;
    }
<<<<<<< Updated upstream:frontend/src/app/shared/change-password/change-password.component.ts
    let passwordChange: PasswordChangeRequest = {oldPassword: '', newPassword: ''};
    passwordChange.oldPassword = this.form.value['oldPassword'];
    passwordChange.newPassword = this.form.value['newPassword'];
    this.authenticationService.changePassword(passwordChange).subscribe(data => {
      this.snackBar.success("You changed password successfully.");
=======
    const passwordChange: PasswordChangeRequest = {oldPassword: '', newPassword: ''};
    passwordChange.oldPassword = this.form.value.oldPassword;
    passwordChange.newPassword = this.form.value.newPassword;
    this.authenticationService.changePassword(passwordChange).subscribe((data: string) => {
      this.snackBar.success('You changed password successfully.');
>>>>>>> Stashed changes:frontend/src/app/user-profile/change-password/change-password.component.ts
      this.submited = false;
      this.authenticationService.logout();
      this.router.navigate(['/sign-in']);
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
