import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CommentComponent } from './comment/comment.component';
import { CommentsReviewComponent } from './comments-review/comments-review.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [CommentComponent, CommentsReviewComponent],
  imports: [
    CommonModule,
    MatCardModule,
    NgxPaginationModule,
    MatButtonModule,
    MatIconModule,
    SharedModule,
    RouterModule,
  ], 
  exports: [CommentComponent, CommentsReviewComponent],
})
export class CommentsModule { }
