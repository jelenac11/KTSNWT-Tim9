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
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AddCommentComponent } from './add-comment/add-comment.component';



@NgModule({
  declarations: [CommentComponent, CommentsReviewComponent, AddCommentComponent],
  imports: [
    CommonModule,
    MatCardModule,
    NgxPaginationModule,
    MatButtonModule,
    MatIconModule,
    SharedModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterModule,
  ], 
  exports: [CommentComponent, CommentsReviewComponent, AddCommentComponent],
})
export class CommentsModule { }
