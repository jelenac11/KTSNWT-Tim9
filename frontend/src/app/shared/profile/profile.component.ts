import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserRequest } from 'src/app/core/models/request/user-request.model';
import { User } from 'src/app/core/models/response/user.model';
import { UserService } from 'src/app/core/services/user.service';
import { Snackbar } from '../snackbars/snackbar/snackbar';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  form: FormGroup;
  user: User = {email: '', username: '', firstName: '', lastName: ''};
  edit: boolean = false;

  constructor(
      private fb: FormBuilder,
      private dialogRef: MatDialogRef<ProfileComponent>,
      private snackBar: Snackbar,
      private userService: UserService,
      @Inject(MAT_DIALOG_DATA) data) { }

  ngOnInit(): void {
    this.userService.getCurrentUser()
    .subscribe(currentUser => {
      this.user = currentUser;
    });
  }

  get f() { return this.form.controls; }

  startEdit() {
    this.edit = true;
    this.form = this.fb.group({
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      username: [this.user.username, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]]
    });
    this.f['email'].disable();
  }

  save() {
    if (this.form.invalid) {
      return;
    }
    let newUser: UserRequest = { email: '', username: '', password: 'password', lastName: '', firstName: ''};
    newUser.email = this.user.email;
    newUser.firstName = this.form.value['firstName'];
    newUser.lastName = this.form.value['lastName'];
    newUser.username = this.form.value['username'];
    this.userService.changeProfile(newUser).subscribe(data => {
      this.snackBar.success("You changed account information successfully.");
      this.user = data;
      this.edit = false;
    },
    error => {
      if (error.status !== 200) {
        this.snackBar.error(error.error);
      }
    });
  }

  close() {
    this.edit = false;
    this.dialogRef.close();
  }

}
