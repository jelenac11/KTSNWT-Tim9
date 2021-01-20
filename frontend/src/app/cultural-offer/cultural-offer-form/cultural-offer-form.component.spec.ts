import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<< Updated upstream
import { CulturalOfferUpdateComponent } from './cultural-offer-form.component';

describe('CulturalOfferUpdateComponent', () => {
  let component: CulturalOfferUpdateComponent;
  let fixture: ComponentFixture<CulturalOfferUpdateComponent>;
=======
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
>>>>>>> Stashed changes

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
