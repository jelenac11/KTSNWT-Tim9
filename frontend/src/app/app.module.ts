import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { CulturalOfferModule } from './cultural-offer/cultural-offer.module';
import { CategoryModule } from './category/category.module';
import { NewsModule } from './news/news.module';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AuthModule,
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
    CulturalOfferModule,
    CategoryModule,
    NewsModule,
    HomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
