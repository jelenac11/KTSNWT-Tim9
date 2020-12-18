import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CulturalOfferListComponent } from './cultural-offer/cultural-offer-list/cultural-offer-list.component';
import { CulturalOfferReviewComponent } from './cultural-offer/cultural-offer-review/cultural-offer-review.component';
import { HomeComponent } from './home/home/home.component';
import { CulturalOfferFormComponent } from './cultural-offer/cultural-offer-form/cultural-offer-form.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { ConfirmRegistrationComponent } from './auth/confirm-registration/confirm-registration.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { NoAuthGuard } from './auth/guards/no-auth.guard';
import { RoleGuard } from './auth/guards/role.guard';
import { UsersReviewComponent } from './users/users-review/users-review.component';
import { CommentsReviewComponent } from './comments/comments-review/comments-review.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {
    path:'cultural-offers/create', 
    component: CulturalOfferFormComponent,
    canActivate: [RoleGuard], 
    data: { 
      expectedRoles: 'ROLE_ADMIN'
    }
  },
  {
    path:'cultural-offers/update/:id',
    component: CulturalOfferFormComponent,
    canActivate: [RoleGuard], 
    data: { 
      expectedRoles: 'ROLE_ADMIN'
    }
  },
  { 
    path:'cultural-offers/:id', 
    component: CulturalOfferReviewComponent,
    children: [
      {
        path: 'comments',
        component: CommentsReviewComponent
      }
    ]
  },
  {
    path:'cultural-offers', 
    component: CulturalOfferListComponent
  },
  {
    path:'sign-up',
    component: SignUpComponent,
    canActivate: [NoAuthGuard]
  },
  {
    path:'confirm-registration/:token',
    component: ConfirmRegistrationComponent,
    canActivate: [NoAuthGuard]
  },
  {
    path:'sign-in',
    component: SignInComponent,
    canActivate: [NoAuthGuard]
  },
  {
    path:'forgot-password',
    component: ForgotPasswordComponent,
    canActivate: [NoAuthGuard]
  },
  {
    path:'users',
    component: UsersReviewComponent,
   //canActivate: [NoAuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
