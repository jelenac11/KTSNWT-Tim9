import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgeModule, ButtonsModule, CardsModule, IconsModule, CarouselModule } from 'angular-bootstrap-md';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import {MatGridListModule} from '@angular/material/grid-list';

import { NewsRoutingModule } from './news-routing.module';
import { NewsReviewComponent } from './news-review/news-review.component';
import { NewsDialogComponent } from './news-dialog/news-dialog.component';
import { SubscriedNewsComponent } from './subscried-news/subscried-news.component';
import { MatTabsModule } from '@angular/material/tabs';
import { NewsViewComponent } from './news-view/news-view.component';
import { SubscribedOffersComponent } from './subscribed-offers/subscribed-offers.component';


@NgModule({
  declarations: [NewsReviewComponent, NewsDialogComponent, SubscriedNewsComponent, NewsViewComponent, SubscribedOffersComponent],
  imports: [
    CommonModule,
    MatIconModule,
    SharedModule,
    BadgeModule,
    ButtonsModule,
    CardsModule,
    IconsModule,
    NgxPaginationModule,
    MatButtonModule,
    NewsRoutingModule,
    RouterModule,
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatGridListModule,
    CarouselModule,
    MatTabsModule
  ],
  exports: [NewsReviewComponent, NewsDialogComponent, SubscriedNewsComponent, NewsViewComponent, SubscribedOffersComponent]
})
export class NewsModule { }
