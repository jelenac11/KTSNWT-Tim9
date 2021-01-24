import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommentPage } from 'src/app/core/models/response/comment-page.model';
import { CommentService } from 'src/app/core/services/comment.service';

@Component({
  selector: 'app-comments-review',
  templateUrl: './comments-review.component.html',
  styleUrls: ['./comments-review.component.scss']
})
export class CommentsReviewComponent implements OnInit {
  comments: CommentPage = { content: [], totalElements: 0 };
  page = 1;
  size = 10;
  culturalOfferId: number;

  constructor(
    private commentService: CommentService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.culturalOfferId = +this.router.url.split('/')[2];
    this.getCommentsByCulturalOfferId();
  }

  getCommentsByCulturalOfferId(): void {
    this.commentService.getCommentsByCulturalOfferId(this.size, this.page - 1, this.culturalOfferId).subscribe((data: CommentPage) => {
      this.comments = data;
    });
  }

  handlePageChange($event: number): void {
    this.page = $event;
    this.getCommentsByCulturalOfferId();
  }

}
