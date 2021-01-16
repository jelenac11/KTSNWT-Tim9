import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ConfirmRegistrationComponent } from './confirm-registration/confirm-registration.component';
import { CardsModule, WavesModule } from 'angular-bootstrap-md';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpTokenInterceptor } from '../core/interceptors/http.token.interceptor';
import { RoleGuard } from './guards/role.guard';
import { NoAuthGuard } from './guards/no-auth.guard';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [SignUpComponent, ConfirmRegistrationComponent, SignInComponent, ForgotPasswordComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    CardsModule,
    WavesModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    AuthRoutingModule
  ],
  exports: [SignUpComponent, ConfirmRegistrationComponent, SignInComponent, ForgotPasswordComponent],
  providers: [RoleGuard, NoAuthGuard, { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true }]
})
export class AuthModule { }
