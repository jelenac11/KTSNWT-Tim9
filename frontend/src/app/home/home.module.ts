import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ButtonsModule, CardsModule } from 'angular-bootstrap-md';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from '../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    CardsModule,
    MatTabsModule,
    SharedModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    RouterModule,
    ButtonsModule
  ],
  exports: [HomeComponent]
})
export class HomeModule { }
