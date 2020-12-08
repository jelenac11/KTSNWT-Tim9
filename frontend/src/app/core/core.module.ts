import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CulturalOfferService } from './services/cultural-offer.service';
import { CategoryService } from './services/category.service';
import { ApiService } from './services/api.service';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    ApiService,
    CulturalOfferService,
    CategoryService
  ],
  exports:[]
})
export class CoreModule { }
