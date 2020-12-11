import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarRatingModule } from 'ngx-bar-rating';
import { SharedModule } from '../shared/shared.module';
import { BadgeModule, ButtonsModule, CardsModule, IconsModule } from 'angular-bootstrap-md';
import { CulturalOfferReviewComponent } from './cultural-offer-review/cultural-offer-review.component';
import { CulturalOfferListComponent } from './cultural-offer-list/cultural-offer-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
import { AgmCoreModule } from '@agm/core';
import { environment } from 'src/environments/environment';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CulturalOfferFormComponent } from './cultural-offer-form/cultural-offer-form.component';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [CulturalOfferReviewComponent, CulturalOfferListComponent, CulturalOfferFormComponent],
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
    RouterModule,
    ButtonsModule,
    IconsModule

  ],
  exports: [CulturalOfferReviewComponent, CulturalOfferListComponent, CulturalOfferFormComponent]
})
export class CulturalOfferModule { }
