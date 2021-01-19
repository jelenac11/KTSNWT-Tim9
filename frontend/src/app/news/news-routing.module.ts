import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleGuard } from '../auth/guards/role.guard';
import { NewsReviewComponent } from './news-review/news-review.component';
import { SubscriedNewsComponent } from './subscried-news/subscried-news.component';

const routes: Routes = [
  {
    path: 'view/:id', component: NewsReviewComponent,
  },
  {
    path: 'my-news', component: SubscriedNewsComponent,
    canActivate: [RoleGuard],
    data: {
        expectedRoles: 'ROLE_REGISTERED_USER'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsRoutingModule { }
