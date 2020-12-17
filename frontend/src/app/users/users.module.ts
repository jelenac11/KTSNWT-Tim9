import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { UsersReviewComponent } from './users-review/users-review.component';
import { SharedModule } from '../shared/shared.module';
import { ButtonsModule, CardsModule } from 'angular-bootstrap-md';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [UsersReviewComponent],
  imports: [
    CommonModule,
    CardsModule,
    MatTabsModule,
    SharedModule,
    MatButtonModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    RouterModule,
    ButtonsModule,
    MatTableModule,
  ],
  exports: [UsersReviewComponent]
})
export class UsersModule { }
