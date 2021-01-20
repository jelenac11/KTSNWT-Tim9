import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarRatingModule } from 'ngx-bar-rating';
import { SharedModule } from '../shared/shared.module';
import { BadgeModule, ButtonsModule, CardsModule, IconsModule } from 'angular-bootstrap-md';
import { CulturalOfferReviewComponent } from './cultural-offer-review/cultural-offer-review.component';
import { CulturalOfferListComponent } from './cultural-offer-list/cultural-offer-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { environment } from 'src/environments/environment';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CulturalOfferFormComponent } from './cultural-offer-form/cultural-offer-form.component';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { CulturalOfferRoutingModule } from './cultural-offer-routing.module';
import { MatInputModule } from '@angular/material/input';

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
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    GooglePlaceModule,
    RouterModule,
    ButtonsModule,
    IconsModule,
    MatFormFieldModule,
    MatSelectModule,
    CulturalOfferRoutingModule,
    MatInputModule
  ],
  exports: [CulturalOfferReviewComponent, CulturalOfferListComponent, CulturalOfferFormComponent]
})
export class CulturalOfferModule { }
