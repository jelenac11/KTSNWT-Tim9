import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CulturalOfferUpdateComponent } from './cultural-offer-form.component';

describe('CulturalOfferUpdateComponent', () => {
  let component: CulturalOfferUpdateComponent;
  let fixture: ComponentFixture<CulturalOfferUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CulturalOfferUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CulturalOfferUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
