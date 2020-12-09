import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCulturalOfferComponent } from './create-cultural-offer.component';

describe('CreateCulturalOfferComponent', () => {
  let component: CreateCulturalOfferComponent;
  let fixture: ComponentFixture<CreateCulturalOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCulturalOfferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCulturalOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
