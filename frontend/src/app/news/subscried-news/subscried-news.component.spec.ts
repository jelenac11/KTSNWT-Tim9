import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriedNewsComponent } from './subscried-news.component';

describe('SubscriedNewsComponent', () => {
  let component: SubscriedNewsComponent;
  let fixture: ComponentFixture<SubscriedNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscriedNewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriedNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
