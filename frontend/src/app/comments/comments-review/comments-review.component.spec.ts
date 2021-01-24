import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { CommentService } from 'src/app/core/services/comment.service';
import { of } from 'rxjs';
import { CommentsReviewComponent } from './comments-review.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('CommentsReviewComponent', () => {
  let component: CommentsReviewComponent;
  let fixture: ComponentFixture<CommentsReviewComponent>;
  let commentService: CommentService;
  let router: Router;

  beforeEach(async () => {
    const data = {
      content: [
        {
          id: 1,
          dateTime: 12345678,
          authorUsername: 'jelenac',
          culturalOfferName: 'Manastir 1',
          text: 'Tekst komentara 1.',
          imageUrl: ''
        },
        {
          id: 2,
          dateTime: 12345679,
          authorUsername: 'jelenac',
          culturalOfferName: 'Manastir 1',
          text: 'Tekst komentara 2.',
          imageUrl: ''
        }
      ],
      totalElements: 2
    };
    const commentServiceMocked = {
      getCommentsByCulturalOfferId: jasmine.createSpy('getCommentsByCulturalOfferId').and.returnValue(of(data))
    };
    await TestBed.configureTestingModule({
      imports: [NgxPaginationModule],
      declarations: [ CommentsReviewComponent ],
      providers: [
        { provide: CommentService, useValue: commentServiceMocked },
        { provide: Router, useValue: { url: 'path/comments/1', navigate: jasmine.createSpy('navigate')}}
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentsReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    commentService = TestBed.inject(CommentService);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch all comments for cultural offer on init', fakeAsync(() => {
    component.ngOnInit();

    expect(commentService.getCommentsByCulturalOfferId).toHaveBeenCalledWith(10, 0, 1);

    tick();

    expect(component.comments.totalElements).toEqual(2);

    expect(component.comments.content[0].id).toEqual(1);
    expect(component.comments.content[0].dateTime).toEqual(12345678);
    expect(component.comments.content[0].authorUsername).toEqual('jelenac');
    expect(component.comments.content[0].culturalOfferName).toEqual('Manastir 1');
    expect(component.comments.content[0].text).toEqual('Tekst komentara 1.');
    expect(component.comments.content[0].imageUrl).toEqual('');

    expect(component.comments.content[1].id).toEqual(2);
    expect(component.comments.content[1].dateTime).toEqual(12345679);
    expect(component.comments.content[1].authorUsername).toEqual('jelenac');
    expect(component.comments.content[1].culturalOfferName).toEqual('Manastir 1');
    expect(component.comments.content[1].text).toEqual('Tekst komentara 2.');
    expect(component.comments.content[1].imageUrl).toEqual('');

    const commentElements: DebugElement[] = fixture.debugElement.queryAll(By.css('app-comment'));
    expect(commentElements.length).toBe(2);
  }));

  it('handlePageChange', fakeAsync(() => {
    component.handlePageChange(2);

    expect(component.page).toEqual(2);
    expect(commentService.getCommentsByCulturalOfferId).toHaveBeenCalledWith(10, 1, 1);

    tick();

    expect(component.comments.totalElements).toEqual(2);

    expect(component.comments.content[0].id).toEqual(1);
    expect(component.comments.content[0].dateTime).toEqual(12345678);
    expect(component.comments.content[0].authorUsername).toEqual('jelenac');
    expect(component.comments.content[0].culturalOfferName).toEqual('Manastir 1');
    expect(component.comments.content[0].text).toEqual('Tekst komentara 1.');
    expect(component.comments.content[0].imageUrl).toEqual('');

    expect(component.comments.content[1].id).toEqual(2);
    expect(component.comments.content[1].dateTime).toEqual(12345679);
    expect(component.comments.content[1].authorUsername).toEqual('jelenac');
    expect(component.comments.content[1].culturalOfferName).toEqual('Manastir 1');
    expect(component.comments.content[1].text).toEqual('Tekst komentara 2.');
    expect(component.comments.content[1].imageUrl).toEqual('');

    const commentElements: DebugElement[] = fixture.debugElement.queryAll(By.css('app-comment'));
    expect(commentElements.length).toBe(2);
  }));

});
