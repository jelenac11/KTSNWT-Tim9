import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
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
    component = fixture.debugElement.componentInstance;
    component.comment = {};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should bind comment to fields', () => {
    component.comment = {
      id: 1,
      dateTime: 1611089882,
      authorUsername: 'jelenac',
      culturalOfferName: 'Manastir 1',
      text: 'Prelepa kulturna ponuda.' ,
      imageUrl: ''
    };
    fixture.detectChanges();

    const author = fixture.debugElement.query(By.css('.author-class')).nativeElement;
    const dateSpan = fixture.debugElement.query(By.css('.date-class')).nativeElement;
    const text = fixture.debugElement.query(By.css('.text-comment')).nativeElement;

    expect(author.innerHTML).toEqual('jelenac');
    expect(dateSpan.innerHTML).toEqual('Jan 19, 1970, 4:31:29 PM');
    expect(text.innerHTML).toEqual('Prelepa kulturna ponuda.');

    const commentElements: DebugElement[] = fixture.debugElement.queryAll(By.css('mat-card'));
    expect(commentElements.length).toBe(1);
  });

});
