import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { MyErrorStateMatcher } from 'src/app/core/error-matchers/ErrorStateMatcher';
import { Snackbar } from 'src/app/shared/snackbars/snackbar/snackbar';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  forgotForm: FormGroup;
  submitted = false;
  matcher: MyErrorStateMatcher = new MyErrorStateMatcher();

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: Snackbar,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.forgotForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  get f(): { [key: string]: AbstractControl; } { return this.forgotForm.controls; }

  onSubmit(): void {
    this.submitted = true;
    if (this.forgotForm.invalid) {
      return;
    }
    const email: string = this.forgotForm.value.email;
    this.authenticationService.forgotPassword(email).subscribe((data: string) => {
      this.snackBar.success('New password sent. Check your email.');
      this.forgotForm.reset();
      this.submitted = false;
      for (const control in this.forgotForm.controls) {
        if (this.forgotForm.controls.hasOwnProperty(control)) {
          this.forgotForm.controls[control].setErrors(null);
        }
      }
    },
    error => {
      if (error.status !== 200) {
        this.snackBar.error('That email address is not associated with personal user account.');
      }
    });
  }

}
