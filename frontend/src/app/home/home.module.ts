import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { CardsModule } from 'angular-bootstrap-md';
import {MatTabsModule} from '@angular/material/tabs';
import { SharedModule } from '../shared/shared.module';
import { TableComponent } from './table/table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [HomeComponent, TableComponent],
  imports: [
    CommonModule,
    CardsModule,
    MatTabsModule,
    SharedModule,
    BrowserAnimationsModule,
    NgxPaginationModule
  ],
  exports: [HomeComponent]
})
export class HomeModule { }
