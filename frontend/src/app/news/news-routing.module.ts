import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsReviewComponent } from './news-review/news-review.component';

const routes: Routes = [{ path: ':id', component: NewsReviewComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsRoutingModule { }
