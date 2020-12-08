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

@NgModule({
  declarations: [HeaderComponent, FooterComponent, SearchComponent, MapComponent, SubscribeComponent, MoreComponent],
  imports: [
    CommonModule,
    NavbarModule,
    IconsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: environment.google_api_key
    }),
    RouterModule,
    ButtonsModule,
    NgxPaginationModule
  ],
  exports: [HeaderComponent, FooterComponent, SearchComponent, MapComponent, SubscribeComponent, MoreComponent]
})
export class SharedModule { }
