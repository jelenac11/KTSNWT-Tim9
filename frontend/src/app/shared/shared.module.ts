import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ButtonsModule, IconsModule, NavbarModule } from 'angular-bootstrap-md';
import { SearchComponent } from './buttons/search/search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MapComponent } from './map/map.component';
import { AgmCoreModule } from '@agm/core';
import { SubscribeComponent } from './buttons/subscribe/subscribe.component';
import { MoreComponent } from './buttons/more/more.component';
import { RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment';
import { NgxPaginationModule } from 'ngx-pagination';
import { ImageModalComponent } from './image-modal/image-modal.component';
import { LightboxModule } from 'ngx-lightbox';
import { CreateCulturalOfferComponent } from './buttons/create-cultural-offer/create-cultural-offer.component';
import { CreateComponent } from './buttons/create/create.component';
import { ConfirmationDialogComponent } from './dialogs/confirmation-dialog/confirmation-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { Snackbar } from './snackbars/snackbar/snackbar';
import { UpdateComponent } from './buttons/update/update.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SearchComponent,
    MapComponent,
    SubscribeComponent,
    MoreComponent,
    ImageModalComponent,
    CreateCulturalOfferComponent,
    CreateComponent,
    ConfirmationDialogComponent,
    UpdateComponent
  ],
  imports: [
    CommonModule,
    NavbarModule,
    IconsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: environment.google_api_key,
      libraries: ['places'],
      language: 'en'
    }),
    RouterModule,
    ButtonsModule,
    NgxPaginationModule,
    LightboxModule,
    MatDialogModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SearchComponent,
    MapComponent,
    SubscribeComponent,
    MoreComponent,
    ImageModalComponent,
    CreateCulturalOfferComponent,
    CreateComponent,
    ConfirmationDialogComponent,
    UpdateComponent
  ],
  providers: [Snackbar]
})
export class SharedModule { }
