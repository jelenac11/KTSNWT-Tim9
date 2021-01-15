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
import { AgmCoreModule } from '@agm/core';
import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
import { UsersModule } from './users/users.module';
import { CommentsModule } from './comments/comments.module';
import { CommonModule } from '@angular/common';
import { CulturalOfferRoutingModule } from './cultural-offer/cultural-offer-routing.module';
import { UsersRoutingModule } from './users/users-routing.module';
import { CommentsRoutingModule } from './comments/comments-routing.module';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
    CategoryModule,
    NewsModule,
    HomeModule,
    AgmCoreModule.forRoot({
      apiKey: environment.google_api_key,
      libraries: ['places'],
      language: 'en'
    }),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatGoogleMapsAutocompleteModule,
    CulturalOfferRoutingModule,
    UsersRoutingModule,
    CommentsRoutingModule,
    AuthRoutingModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
