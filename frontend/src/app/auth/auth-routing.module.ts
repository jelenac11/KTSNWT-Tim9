import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmRegistrationComponent } from './confirm-registration/confirm-registration.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { NoAuthGuard } from './guards/no-auth.guard';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
    {
        path: 'sign-up',
        component: SignUpComponent,
        canActivate: [NoAuthGuard]
    },
    {
        path: 'confirm-registration/:token',
        component: ConfirmRegistrationComponent,
        canActivate: [NoAuthGuard]
    },
    {
        path: 'sign-in',
        component: SignInComponent,
        canActivate: [NoAuthGuard]
    },
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        canActivate: [NoAuthGuard]
    },
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })

export class AuthRoutingModule { }
