import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonsModule, IconsModule } from 'angular-bootstrap-md';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { ProfileComponent } from './profile/profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

@NgModule({
  declarations: [
    ProfileComponent,
    ChangePasswordComponent,
  ],
  imports: [
    CommonModule,
    IconsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ButtonsModule,
    MatDialogModule
  ],
  exports: [
    ProfileComponent,
    ChangePasswordComponent
  ]
})
export class UserProfileModule { }
