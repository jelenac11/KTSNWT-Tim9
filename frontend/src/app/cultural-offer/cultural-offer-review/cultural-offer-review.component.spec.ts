import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CulturalOfferReviewComponent } from './cultural-offer-review.component';

describe('CulturalOfferReviewComponent', () => {
  let component: CulturalOfferReviewComponent;
  let fixture: ComponentFixture<CulturalOfferReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CulturalOfferReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CulturalOfferReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
