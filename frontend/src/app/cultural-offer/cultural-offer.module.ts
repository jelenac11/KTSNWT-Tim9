import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarRatingModule } from 'ngx-bar-rating';
import { SharedModule } from '../shared/shared.module';
import { BadgeModule, ButtonsModule, CardsModule } from 'angular-bootstrap-md';
import { CulturalOfferReviewComponent } from './cultural-offer-review/cultural-offer-review.component';
import { CulturalOfferListComponent } from './cultural-offer-list/cultural-offer-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
import { AgmCoreModule } from '@agm/core';
import { environment } from 'src/environments/environment';
import { MatDialogModule } from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { CreateCulturalOfferComponent } from './create-cultural-offer/create-cultural-offer.component';
import { CulturalOfferUpdateComponent } from './cultural-offer-update/cultural-offer-update.component';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [CulturalOfferReviewComponent, CulturalOfferListComponent, CreateCulturalOfferComponent, CulturalOfferUpdateComponent],
  imports: [
    CommonModule,
    BarRatingModule,
    SharedModule,
    CardsModule,
    BadgeModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: environment.google_api_key,
      libraries: ['places'],
      language: 'en'
    }),
    MatGoogleMapsAutocompleteModule,
    ButtonsModule,
    MatDialogModule,
    MatSnackBarModule,
    GooglePlaceModule,
    BrowserModule,
    
  ],
  exports: [CulturalOfferReviewComponent, CulturalOfferListComponent, CreateCulturalOfferComponent,CulturalOfferUpdateComponent]
})
export class CulturalOfferModule { }
