import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsReviewComponent } from './comments-review.component';

describe('CommentsReviewComponent', () => {
  let component: CommentsReviewComponent;
  let fixture: ComponentFixture<CommentsReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
<<<<<<< Updated upstream
      declarations: [ CommentsReviewComponent ]
    })
    .compileComponents();
=======
      imports: [NgxPaginationModule],
      declarations: [ CommentsReviewComponent ],
      providers: [
        { provide: CommentService, useValue: commentServiceMocked },
        { provide: Router, useValue: { url: 'path/comments/1', navigate: jasmine.createSpy('navigate')}}
      ]
    });
>>>>>>> Stashed changes
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentsReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
