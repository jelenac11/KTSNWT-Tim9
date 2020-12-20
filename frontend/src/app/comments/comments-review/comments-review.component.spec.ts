import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsReviewComponent } from './comments-review.component';

describe('CommentsReviewComponent', () => {
  let component: CommentsReviewComponent;
  let fixture: ComponentFixture<CommentsReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentsReviewComponent ]
    })
    .compileComponents();
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
