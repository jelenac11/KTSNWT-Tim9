import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CulturalOfferListComponent } from './cultural-offer/cultural-offer-list/cultural-offer-list.component';
import { CulturalOfferReviewComponent } from './cultural-offer/cultural-offer-review/cultural-offer-review.component';
import { CreateCulturalOfferComponent } from './cultural-offer/create-cultural-offer/create-cultural-offer.component'
import { HomeComponent } from './home/home/home.component';
import { CulturalOfferUpdateComponent } from './cultural-offer/cultural-offer-update/cultural-offer-update.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'cultural-offers/create', component: CreateCulturalOfferComponent},
  {path:'cultural-offers/update/:id', component: CulturalOfferUpdateComponent},
  {path:'cultural-offers/:id', component:CulturalOfferReviewComponent},
  {path:'cultural-offers', component:CulturalOfferListComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
