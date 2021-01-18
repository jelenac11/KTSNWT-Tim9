import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, getTestBed, TestBed, tick } from '@angular/core/testing';
import { CommentPage } from '../models/response/comment-page.model';

import { CommentService } from './comment.service';

describe('CommentService', () => {
  let service: CommentService;
  let injector;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CommentService]
    });
    injector = getTestBed();
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(CommentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

 /*it('getCommentsByCulturalOfferId() should return comment page', fakeAsync(() => {
    const size = 1;
    const page = 0;
    const id = 1;
    const commentPageRes: CommentPage = {
      content: [
        {

        }
      ],
      totalElements: 1
    };
    let commentPage: CommentPage;

    service.getCommentsByCulturalOfferId(size, page, id).subscribe(data => {
      
    });

  }));*/
});
