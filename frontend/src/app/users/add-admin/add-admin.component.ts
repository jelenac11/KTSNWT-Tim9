import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminRequest } from 'src/app/core/models/request/admin-request.model';
import { UserService } from 'src/app/core/services/user.service';
import { MyErrorStateMatcher } from 'src/app/core/error-matchers/ErrorStateMatcher';
import { Snackbar } from 'src/app/shared/snackbars/snackbar/snackbar';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.scss']
})
export class AddAdminComponent implements OnInit {
  form: FormGroup;
  matcher: MyErrorStateMatcher = new MyErrorStateMatcher();

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddAdminComponent>,
    private snackBar: Snackbar,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) data
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get f(): { [key: string]: AbstractControl; } { return this.form.controls; }

  add(): void {
    if (this.form.invalid) {
      return;
    }
    const admin: AdminRequest = { email: '', username: '', lastName: '', firstName: ''};
    admin.email = this.form.value.email;
    admin.firstName = this.form.value.firstName;
    admin.lastName = this.form.value.lastName;
    admin.username = this.form.value.username;
    this.userService.addAdmin(admin).subscribe(data => {
      this.snackBar.success('Administrator added successfully.');
      this.dialogRef.close(true);
    },
    error => {
      if (error.status !== 200) {
        this.snackBar.error(error.error);
      }
    });
  }

  close(): void {
    this.dialogRef.close(false);
  }

}
