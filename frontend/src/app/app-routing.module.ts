import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CulturalOfferListComponent } from './cultural-offer/cultural-offer-list/cultural-offer-list.component';
import { CulturalOfferReviewComponent } from './cultural-offer/cultural-offer-review/cultural-offer-review.component';
import { HomeComponent } from './home/home/home.component';
import { CulturalOfferFormComponent } from './cultural-offer/cultural-offer-form/cultural-offer-form.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { ConfirmRegistrationComponent } from './auth/confirm-registration/confirm-registration.component';
const routes: Routes = [
  {path:'', component: HomeComponent},
  {
    path:'cultural-offers/create', 
    component: CulturalOfferFormComponent,
  },
  {
    path:'cultural-offers/update/:id',
    component: CulturalOfferFormComponent,
  },
  {path:'cultural-offers/:id', component: CulturalOfferReviewComponent},
  {path:'cultural-offers', component: CulturalOfferListComponent},
  {
    path:'sign-up',
    component: SignUpComponent,
  },
  {
    path:'confirm-registration/:token',
    component: ConfirmRegistrationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
