import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, getTestBed, TestBed, tick } from '@angular/core/testing';
import { CommentPage } from '../models/response/comment-page.model';
import { environment } from 'src/environments/environment';
import { CommentService } from './comment.service';
import { Comment } from '../models/response/comment.model';
import { CommentRequest } from '../models/request/comment-request.model';

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

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getCommentsByCulturalOfferId() should return comment page', fakeAsync(() => {
    const size = 1;
    const page = 0;
    const id = 1;
    const mockCommentPage: CommentPage = {
      content: [
        {
          id: 1,
          dateTime: 1193754960,
          authorUsername: 'user 20',
          culturalOfferName: 'Manastir 1',
          text: 'Ovo je prvi komentar za ovu ponudu.',
          imageUrl: '',
        }
      ],
      totalElements: 1
    };
    let commentPage: CommentPage;

    service.getCommentsByCulturalOfferId(size, page, id).subscribe(data => {
      commentPage = data;
    });
    const req = httpMock.expectOne(`${environment.api_url}comments/cultural-offer/${id}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCommentPage);

    tick();
    expect(commentPage.totalElements).toEqual(1);
    expect(commentPage.content[0].id).toEqual(1);
    expect(commentPage.content[0].dateTime).toEqual(1193754960);
    expect(commentPage.content[0].authorUsername).toEqual('user 20');
    expect(commentPage.content[0].culturalOfferName).toEqual('Manastir 1');
    expect(commentPage.content[0].text).toEqual('Ovo je prvi komentar za ovu ponudu.');
    expect(commentPage.content[0].imageUrl).toEqual('');
  }));

  it('post() should return comment', fakeAsync(() => {
    const formData = new FormData();
    const commentRequest: CommentRequest = {
      culturalOffer: 1,
      text: 'Nema teksta'
    };
    const blob = new Blob([JSON.stringify(commentRequest)], {
      type: 'application/json'
    });
    formData.append('commentDTO', blob);
    formData.append('file', '');
    const mockComment: Comment = {
      id: 1,
      dateTime: 1193754960,
      authorUsername: 'user 20',
      culturalOfferName: 'Manastir 1',
      text: 'Nema teksta',
      imageUrl: '',
    };
    let comment: Comment;

    service.post(formData).subscribe(data => {
      comment = data;
    });
    const req = httpMock.expectOne(`${environment.api_url}comments`);
    expect(req.request.method).toBe('POST');
    req.flush(mockComment);

    tick();
    expect(comment.id).toEqual(1);
    expect(comment.dateTime).toEqual(1193754960);
    expect(comment.authorUsername).toEqual('user 20');
    expect(comment.culturalOfferName).toEqual('Manastir 1');
    expect(comment.text).toEqual('Nema teksta');
    expect(comment.imageUrl).toEqual('');
  }));

  it('post() should return comment must have image or text', fakeAsync(() => {
    const formData = new FormData();
    const commentRequest: CommentRequest = {
      culturalOffer: 1,
      text: ''
    };
    const blob = new Blob([JSON.stringify(commentRequest)], {
      type: 'application/json'
    });
    formData.append('commentDTO', blob);
    formData.append('file', '');
    const mockMessage = 'Comment must have image or text';
    let message: any;

    service.post(formData).subscribe(data => {
      message = data;
    });
    const req = httpMock.expectOne(`${environment.api_url}comments`);
    expect(req.request.method).toBe('POST');
    req.flush(mockMessage);

    tick();
    expect(message).toEqual('Comment must have image or text');
  }));

  it('post() should return cultural offer does not exist', fakeAsync(() => {
    const formData = new FormData();
    const commentRequest: CommentRequest = {
      culturalOffer: 111111111,
      text: 'Nema teksta'
    };
    const blob = new Blob([JSON.stringify(commentRequest)], {
      type: 'application/json'
    });
    formData.append('commentDTO', blob);
    formData.append('file', '');
    const mockMessage = 'Cultural offer doesn\'t exist.';
    let message: any;

    service.post(formData).subscribe(data => {
      message = data;
    });
    const req = httpMock.expectOne(`${environment.api_url}comments`);
    expect(req.request.method).toBe('POST');
    req.flush(mockMessage);

    tick();
    expect(message).toEqual('Cultural offer doesn\'t exist.');
  }));

  it('approve() should return comment successfully approved', fakeAsync(() => {
    const approve = true;
    const comment: Comment = {
      id: 1,
      dateTime: 1193754960,
      authorUsername: 'user 20',
      culturalOfferName: 'Manastir 1',
      text: 'Nema teksta',
      imageUrl: '',
    };
    const mockMessage = 'Comment successfully approved';
    let message: string;

    service.approve(comment, approve).subscribe(data => {
      message = data;
    });
    const req = httpMock.expectOne(`${environment.api_url}comments/approve/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockMessage);

    tick();
    expect(message).toEqual('Comment successfully approved');
  }));

  it('approve() should return comment does not exist when trying to approve', fakeAsync(() => {
    const approve = true;
    const comment: Comment = {
      id: 111111111111111,
      dateTime: 1193754960,
      authorUsername: 'user 20',
      culturalOfferName: 'Manastir 1',
      text: 'Nema teksta',
      imageUrl: '',
    };
    const mockMessage = 'Comment doesn\'t exist';
    let message: string;

    service.approve(comment, approve).subscribe(data => {
      message = data;
    });
    const req = httpMock.expectOne(`${environment.api_url}comments/approve/111111111111111`);
    expect(req.request.method).toBe('GET');
    req.flush(mockMessage);

    tick();
    expect(message).toEqual('Comment doesn\'t exist');
  }));

  it('approve() should return comment successfully declined', fakeAsync(() => {
    const approve = false;
    const comment: Comment = {
      id: 1,
      dateTime: 1193754960,
      authorUsername: 'user 20',
      culturalOfferName: 'Manastir 1',
      text: 'Nema teksta',
      imageUrl: '',
    };
    const mockMessage = 'Comment successfully declined';
    let message: string;

    service.approve(comment, approve).subscribe(data => {
      message = data;
    });
    const req = httpMock.expectOne(`${environment.api_url}comments/decline/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockMessage);

    tick();
    expect(message).toEqual('Comment successfully declined');
  }));

  it('approve() should return comment does not exist when trying to decline', fakeAsync(() => {
    const approve = false;
    const comment: Comment = {
      id: 111111111111111,
      dateTime: 1193754960,
      authorUsername: 'user 20',
      culturalOfferName: 'Manastir 1',
      text: 'Nema teksta',
      imageUrl: '',
    };
    const mockMessage = 'Comment doesn\'t exist';
    let message: string;

    service.approve(comment, approve).subscribe(data => {
      message = data;
    });
    const req = httpMock.expectOne(`${environment.api_url}comments/decline/111111111111111`);
    expect(req.request.method).toBe('GET');
    req.flush(mockMessage);

    tick();
    expect(message).toEqual('Comment doesn\'t exist');
  }));

  it('getNotApprovedComments() should return comment page', fakeAsync(() => {
    const size = 1;
    const page = 0;
    const mockCommentPage: CommentPage = {
      content: [
        {
          id: 1,
          dateTime: 1193754960,
          authorUsername: 'user 20',
          culturalOfferName: 'Manastir 1',
          text: 'Ovo je prvi komentar za ovu ponudu.',
          imageUrl: '',
        }
      ],
      totalElements: 1
    };
    let commentPage: CommentPage;
    service.getNotApprovedComments(size, page).subscribe(data => {
      commentPage = data;
    });
    const req = httpMock.expectOne(`${environment.api_url}comments/not-approved-comments`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCommentPage);

    tick();
    expect(commentPage.totalElements).toEqual(1);
    expect(commentPage.content[0].id).toEqual(1);
    expect(commentPage.content[0].dateTime).toEqual(1193754960);
    expect(commentPage.content[0].authorUsername).toEqual('user 20');
    expect(commentPage.content[0].culturalOfferName).toEqual('Manastir 1');
    expect(commentPage.content[0].text).toEqual('Ovo je prvi komentar za ovu ponudu.');
    expect(commentPage.content[0].imageUrl).toEqual('');
  }));
});
