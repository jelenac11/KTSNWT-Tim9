import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { ConfirmRegistrationComponent } from './confirm-registration/confirm-registration.component';
import { CardsModule, WavesModule } from 'angular-bootstrap-md';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpTokenInterceptor } from '../core/interceptors/http.token.interceptor';


@NgModule({
  declarations: [SignUpComponent, ConfirmRegistrationComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    RouterModule,
    CardsModule,
    WavesModule
  ],
  exports: [SignUpComponent, ConfirmRegistrationComponent],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true }]
})
export class AuthModule { }
