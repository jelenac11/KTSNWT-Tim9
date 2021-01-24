import { Component, OnInit } from '@angular/core';
import { CommentPage } from 'src/app/core/models/response/comment-page.model';
import { Comment } from 'src/app/core/models/response/comment.model';
import { CommentService } from 'src/app/core/services/comment.service';
import { Snackbar } from 'src/app/shared/snackbars/snackbar/snackbar';

@Component({
  selector: 'app-approve-comment',
  templateUrl: './approve-comment.component.html',
  styleUrls: ['./approve-comment.component.scss']
})

export class ApproveCommentComponent implements OnInit {
  comments: CommentPage = { content: [], totalElements: 0 };
  page = 1;
  size = 5;

  constructor(
    private commentService: CommentService,
    private snackBar: Snackbar
  ) { }

  ngOnInit(): void {
    this.getNotApprovedComments();
  }

  getNotApprovedComments(): void {
    this.commentService.getNotApprovedComments(this.size, this.page - 1).subscribe((data: CommentPage) => {
      this.comments = data;
    });
  }

  handlePageChange($event: number): void {
    this.page = $event;
    this.getNotApprovedComments();
  }

  approve(comment: Comment, approve: boolean): void {
    this.commentService.approve(comment, approve).subscribe((data: string) => {
      this.snackBar.success(data);
      this.getNotApprovedComments();
    });
  }

}
