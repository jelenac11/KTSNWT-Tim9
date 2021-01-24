import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserRequest } from 'src/app/core/models/request/user-request.model';
import { UserService } from 'src/app/core/services/user.service';
import { MyErrorStateMatcher } from 'src/app/core/error-matchers/ErrorStateMatcher';
import { Snackbar } from 'src/app/shared/snackbars/snackbar/snackbar';
import { User } from 'src/app/core/models/response/user.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  hidePassword = true;
  matcher: MyErrorStateMatcher = new MyErrorStateMatcher();

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: Snackbar,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f(): { [key: string]: AbstractControl; } { return this.registerForm.controls; }

  onSubmit(): void {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    const newUser: UserRequest = { email: '', username: '', password: '', lastName: '', firstName: ''};
    newUser.email = this.registerForm.value.email;
    newUser.password = this.registerForm.value.password;
    newUser.firstName = this.registerForm.value.firstName;
    newUser.lastName = this.registerForm.value.lastName;
    newUser.username = this.registerForm.value.username;
    this.userService.signup(newUser).subscribe((data: User) => {
      this.snackBar.success('Activation link sent. Check your email.');
      this.submitted = false;
      this.registerForm.reset();
      for (const control in this.registerForm.controls) {
        if (this.registerForm.controls.hasOwnProperty(control)) {
          this.registerForm.controls[control].setErrors(null);
        }
      }
    },
    error => {
      if (error.status !== 200) {
        this.snackBar.error(error.error);
      }
    });
  }

}
