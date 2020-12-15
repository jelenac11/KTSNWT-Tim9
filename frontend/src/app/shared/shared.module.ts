import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ButtonsModule, IconsModule, NavbarModule } from 'angular-bootstrap-md';
import { SearchComponent } from './search/search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MapComponent } from './map/map.component';
import { AgmCoreModule } from '@agm/core';
import { RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment';
import { NgxPaginationModule } from 'ngx-pagination';
import { ImageModalComponent } from './image-modal/image-modal.component';
import { LightboxModule } from 'ngx-lightbox';
import { ConfirmationDialogComponent } from './dialogs/confirmation-dialog/confirmation-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { Snackbar } from './snackbars/snackbar/snackbar';
import { ProfileComponent } from './profile/profile.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SearchComponent,
    MapComponent,
    ImageModalComponent,
    ConfirmationDialogComponent,
    ProfileComponent
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
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
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
    ImageModalComponent,
    ConfirmationDialogComponent,
    ProfileComponent
  ],
  providers: [Snackbar]
})
export class SharedModule { }
