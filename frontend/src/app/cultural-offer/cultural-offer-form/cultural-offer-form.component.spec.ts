import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { CategoryService } from 'src/app/core/services/category.service';
import { CulturalOfferService } from 'src/app/core/services/cultural-offer.service';
import { Snackbar } from 'src/app/shared/snackbars/snackbar/snackbar';
import { CulturalOfferFormComponent } from './cultural-offer-form.component';

describe('CulturalOfferUpdateComponent', () => {
  let component: CulturalOfferFormComponent;
  let fixture: ComponentFixture<CulturalOfferFormComponent>;
  let categoryService: CategoryService;
  let culturalOfferService: CulturalOfferService;
  let snackBar: Snackbar;
  let route: ActivatedRoute;
  let router: Router;

  beforeEach(() => {
    let data = {
      id: 5,
      name: 'Srbija',
      category: {
        id: 1,
        name: 'Kategorija 1',
        description: 'Opis'
      },
      geolocation: {
        placeId: '123',
        location: 'Srbija',
        lon: 5,
        lat: 5
      },
      description: 'Opis',
      image: 'nekiUrl',
      averageMark: 4.85
    };

    let culturalOfferServiceMock = {
      get: jasmine.createSpy('get').and.returnValue(of(data)),
      put: jasmine.createSpy('put').and.returnValue(of(data)),
      post: jasmine.createSpy('post').and.returnValue(of(data)),
    };

    let categoryServiceMock = {
      getAll: jasmine.createSpy('getAll').and.returnValue(of([{
        id: 1,
        name: 'Kategorija 1',
        description: 'Opis'
      }, {
        id: 2,
        name: 'Kategorija 2',
        description: 'Opis'
      }, {
        id: 3,
        name: 'Kategorija 3',
        description: 'Opis'
      }])),
    };

    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule],
      declarations: [CulturalOfferFormComponent],
      providers: [
        { provide: CulturalOfferService, useValue: culturalOfferServiceMock },
        { provide: CategoryService, useValue: categoryServiceMock },
        { provide: Snackbar, useValue: { success: () => { }, error: () => { } } },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: (id: string) => { return '5' } } } } },
        { provide: Router, useValue: { navigateByUrl: () => { } } },
      ]
    })

    fixture = TestBed.createComponent(CulturalOfferFormComponent);
    component = fixture.componentInstance;
    culturalOfferService = TestBed.inject(CulturalOfferService);
    categoryService = TestBed.inject(CategoryService);
    snackBar = TestBed.inject(Snackbar);
    route = TestBed.inject(ActivatedRoute);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('',()=>{
  });
});
