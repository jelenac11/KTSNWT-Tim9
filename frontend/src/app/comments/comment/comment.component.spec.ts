import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentComponent } from './comment.component';

describe('CommentComponent', () => {
  let component: CommentComponent;
  let fixture: ComponentFixture<CommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentComponent ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentComponent);
<<<<<<< Updated upstream
    component = fixture.componentInstance;
=======
    component = fixture.debugElement.componentInstance;
    component.comment = {};
>>>>>>> Stashed changes
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
