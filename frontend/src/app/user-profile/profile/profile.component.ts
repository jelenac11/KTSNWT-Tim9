import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserRequest } from 'src/app/core/models/request/user-request.model';
import { User } from 'src/app/core/models/response/user.model';
import { UserService } from 'src/app/core/services/user.service';
import { MyErrorStateMatcher } from '../../core/error-matchers/ErrorStateMatcher';
import { Snackbar } from '../../shared/snackbars/snackbar/snackbar';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  form: FormGroup;
  user: User = {email: '', username: '', firstName: '', lastName: ''};
  edit = false;
  matcher: MyErrorStateMatcher = new MyErrorStateMatcher();

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ProfileComponent>,
    private snackBar: Snackbar,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) data
  ) { }

  ngOnInit(): void {
    this.userService.getCurrentUser()
    .subscribe((currentUser: User) => {
      this.user = currentUser;
    });
  }

  get f(): { [key: string]: AbstractControl; } { return this.form.controls; }

  startEdit(): void {
    this.edit = true;
    this.form = this.fb.group({
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      username: [this.user.username, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]]
    });
    this.f.email.disable();
  }

  save(): void {
    if (this.form.invalid) {
      return;
    }
    const newUser: UserRequest = { email: '', username: '', password: 'password', lastName: '', firstName: ''};
    newUser.email = this.user.email;
    newUser.firstName = this.form.value.firstName;
    newUser.lastName = this.form.value.lastName;
    newUser.username = this.form.value.username;
    this.userService.changeProfile(newUser).subscribe((data: User) => {
      this.snackBar.success('You changed account information successfully.');
      this.user = data;
      this.edit = false;
      this.close();
    },
    error => {
      if (error.status !== 200) {
        this.snackBar.error(error.error);
      }
    });
  }

  close(): void {
    this.edit = false;
    this.dialogRef.close();
  }

}
