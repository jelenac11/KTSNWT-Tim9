import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CulturalOfferService } from './services/cultural-offer.service';
import { CategoryService } from './services/category.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserService } from './services/user.service';
import { AuthenticationService } from './services/authentication.service';
import { HttpTokenInterceptor } from './interceptors/http.token.interceptor';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  providers: [
    CulturalOfferService,
    CategoryService,
    UserService,
    AuthenticationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokenInterceptor,
      multi: true,
    }
  ],
  exports: []
})
export class CoreModule { }
