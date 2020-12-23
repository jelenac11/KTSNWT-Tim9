import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CulturalOfferService } from './services/cultural-offer.service';
import { CategoryService } from './services/category.service';
import { ApiService } from './services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './services/user.service';
import { AuthenticationService } from './services/authentication.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    ApiService,
    CulturalOfferService,
    CategoryService,
    UserService,
    AuthenticationService,
  ],
  exports: []
})
export class CoreModule { }
