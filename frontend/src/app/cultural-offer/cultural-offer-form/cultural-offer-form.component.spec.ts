import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CulturalOfferFormComponent } from './cultural-offer-form.component';

describe('CulturalOfferUpdateComponent', () => {
  let component: CulturalOfferFormComponent;
  let fixture: ComponentFixture<CulturalOfferFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CulturalOfferFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CulturalOfferFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
