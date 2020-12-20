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
  page: number = 1;
  size: number = 10;
  culturalOfferId: number;

  constructor(
    private commentService: CommentService, 
    private router: Router
  ) { }

  ngOnInit(): void {
    this.culturalOfferId = +this.router.url.split('/')[2];
    this.getCommentsByCulturalOfferId();
  }

  getCommentsByCulturalOfferId(): void {
    this.commentService.getCommentsByCulturalOfferId(this.size, this.page - 1, this.culturalOfferId).subscribe(data => {
      this.comments = data;
    });
  }

  handlePageChange($event: any): void {
    this.page = $event;
    this.getCommentsByCulturalOfferId();
  }
  
}
