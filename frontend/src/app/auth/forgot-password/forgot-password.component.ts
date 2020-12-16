import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { MyErrorStateMatcher } from 'src/app/shared/ErrorStateMatcher';
import { Snackbar } from 'src/app/shared/snackbars/snackbar/snackbar';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgotForm: FormGroup;
  submitted = false;
  matcher : MyErrorStateMatcher = new MyErrorStateMatcher();

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

  get f() { return this.forgotForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.forgotForm.invalid) {
      return;
    }
    let email: string = this.forgotForm.value['email'];
    this.authenticationService.forgot_password(email).subscribe(data => {
      this.snackBar.success("New password sent. Check your email.");
      this.forgotForm.reset();
      this.submitted = false;
    },
    error => {
      if (error.status !== 200) {
        this.snackBar.error("That email address is not associated with personal user account.");
      }
    });
  }

}
