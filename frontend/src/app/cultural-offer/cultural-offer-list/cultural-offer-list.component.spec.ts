import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CulturalOfferListComponent } from './cultural-offer-list.component';

describe('CulturalOfferListComponent', () => {
  let component: CulturalOfferListComponent;
  let fixture: ComponentFixture<CulturalOfferListComponent>;
<<<<<<< Updated upstream
=======
  let culturalOfferService: CulturalOfferService;
  let dialog: MatDialog;
  let snackBar: Snackbar;
  let jwtService: JwtService;
  let categoryService: CategoryService;

  beforeEach(() => {
    let data = {
      content: [
        {
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
        },
        {
          id: 6,
          name: 'Srbija 2',
          category: {
            id: 1,
            name: 'Kategorija 1',
            description: 'Opis'
          },
          geolocation: {
            placeId: '1234',
            location: 'Srbija 2',
            lon: 6,
            lat: 6
          },
          description: 'Opis 2',
          image: 'nekiUrl 2',
          averageMark: 4.0
        }
      ],
      totalElements: 10
    };

    let culturalOfferServiceMock = {
      findByName: jasmine.createSpy('findByName').and.returnValue(of(data)),
      getAll: jasmine.createSpy('getAll').and.returnValue(of(data)),
      getCulturalOffersByCategory: jasmine.createSpy('getCulturalOffersByCategory').and.returnValue(of(data))
    };

    let categoryServiceMock = {
      getAll: jasmine.createSpy('getAll')
        .and.returnValue(of([{
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

    let jwtServiceMock = {
      getRole: jasmine.createSpy('getRole').and.returnValue(of('ROLE_ADMIN'))
    };
>>>>>>> Stashed changes

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CulturalOfferListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CulturalOfferListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
<<<<<<< Updated upstream
});
=======

  it('should fetch the cultural offers, categories and role on init', () => {
    component.ngOnInit();
    expect(categoryService.getAll).toHaveBeenCalled();
    expect(jwtService.getRole).toHaveBeenCalled();

    fixture.whenStable()
      .then(() => {
        expect(component.categories.length).toBe(3);
        fixture.detectChanges();
        let elements: DebugElement[] =
          fixture.debugElement.queryAll(By.css('.mat-option-text'));
        expect(elements.length).toBe(3);
        expect(component.role).toBe('ROLE_ADMIN');

        expect(component.categories[0].id).toEqual(1);
        expect(component.categories[0].name).toEqual('Kategorija 1');
        expect(component.categories[0].description).toEqual('Opis');

        expect(component.categories[1].id).toEqual(2);
        expect(component.categories[1].name).toEqual('Kategorija 2');
        expect(component.categories[1].description).toEqual('Opis');

        expect(component.categories[2].id).toEqual(3);
        expect(component.categories[2].name).toEqual('Kategorija 3');
        expect(component.categories[2].description).toEqual('Opis');
      });
  });

  it('handlePageChange', () => {
    component.handlePageChange(2);
    expect(culturalOfferService.getAll).toHaveBeenCalled();
    expect(component.culturalOffers.totalElements).toBe(10);
    expect(component.culturalOffers.content.length).toBe(2);

    expect(component.culturalOffers.content[0].id).toEqual(5);
    expect(component.culturalOffers.content[0].name).toEqual('Srbija');
    expect(component.culturalOffers.content[0].geolocation.placeId).toEqual('123');
    expect(component.culturalOffers.content[0].geolocation.lat).toEqual(5);
    expect(component.culturalOffers.content[0].geolocation.lon).toEqual(5);
    expect(component.culturalOffers.content[0].geolocation.location).toEqual('Srbija');
    expect(component.culturalOffers.content[0].category.id).toEqual(1);
    expect(component.culturalOffers.content[0].category.name).toEqual('Kategorija 1');
    expect(component.culturalOffers.content[0].category.description).toEqual('Opis');
    expect(component.culturalOffers.content[0].description).toEqual('Opis');
    expect(component.culturalOffers.content[0].image).toEqual('nekiUrl');
    expect(component.culturalOffers.content[0].averageMark).toEqual(4.85);

    expect(component.culturalOffers.content[1].id).toEqual(6);
    expect(component.culturalOffers.content[1].name).toEqual('Srbija 2');
    expect(component.culturalOffers.content[1].geolocation.placeId).toEqual('1234');
    expect(component.culturalOffers.content[1].geolocation.lat).toEqual(6);
    expect(component.culturalOffers.content[1].geolocation.lon).toEqual(6);
    expect(component.culturalOffers.content[1].geolocation.location).toEqual('Srbija 2');
    expect(component.culturalOffers.content[1].category.id).toEqual(1);
    expect(component.culturalOffers.content[1].category.name).toEqual('Kategorija 1');
    expect(component.culturalOffers.content[1].category.description).toEqual('Opis');
    expect(component.culturalOffers.content[1].description).toEqual('Opis 2');
    expect(component.culturalOffers.content[1].image).toEqual('nekiUrl 2');
    expect(component.culturalOffers.content[1].averageMark).toEqual(4.0);
  })

  it('searchChanged', () => {
    component.searchChanged('srb');
    expect(component.page).toBe(1);
    expect(component.searchValue).toBe('srb');
    expect(culturalOfferService.findByName).toHaveBeenCalled();
    expect(component.culturalOffers.totalElements).toBe(10);
    expect(component.culturalOffers.content.length).toBe(2);

    expect(component.culturalOffers.content[0].id).toEqual(5);
    expect(component.culturalOffers.content[0].name).toEqual('Srbija');
    expect(component.culturalOffers.content[0].geolocation.placeId).toEqual('123');
    expect(component.culturalOffers.content[0].geolocation.lat).toEqual(5);
    expect(component.culturalOffers.content[0].geolocation.lon).toEqual(5);
    expect(component.culturalOffers.content[0].geolocation.location).toEqual('Srbija');
    expect(component.culturalOffers.content[0].category.id).toEqual(1);
    expect(component.culturalOffers.content[0].category.name).toEqual('Kategorija 1');
    expect(component.culturalOffers.content[0].category.description).toEqual('Opis');
    expect(component.culturalOffers.content[0].description).toEqual('Opis');
    expect(component.culturalOffers.content[0].image).toEqual('nekiUrl');
    expect(component.culturalOffers.content[0].averageMark).toEqual(4.85);

    expect(component.culturalOffers.content[1].id).toEqual(6);
    expect(component.culturalOffers.content[1].name).toEqual('Srbija 2');
    expect(component.culturalOffers.content[1].geolocation.placeId).toEqual('1234');
    expect(component.culturalOffers.content[1].geolocation.lat).toEqual(6);
    expect(component.culturalOffers.content[1].geolocation.lon).toEqual(6);
    expect(component.culturalOffers.content[1].geolocation.location).toEqual('Srbija 2');
    expect(component.culturalOffers.content[1].category.id).toEqual(1);
    expect(component.culturalOffers.content[1].category.name).toEqual('Kategorija 1');
    expect(component.culturalOffers.content[1].category.description).toEqual('Opis');
    expect(component.culturalOffers.content[1].description).toEqual('Opis 2');
    expect(component.culturalOffers.content[1].image).toEqual('nekiUrl 2');
    expect(component.culturalOffers.content[1].averageMark).toEqual(4.0);
  })

  it('changeSelect', () => {
    component.changeSelect(1);
    expect(component.page).toBe(1);
    expect(culturalOfferService.getCulturalOffersByCategory).toHaveBeenCalled();
    expect(component.culturalOffers.totalElements).toBe(10);
    expect(component.culturalOffers.content.length).toBe(2);

    expect(component.culturalOffers.content[0].id).toEqual(5);
    expect(component.culturalOffers.content[0].name).toEqual('Srbija');
    expect(component.culturalOffers.content[0].geolocation.placeId).toEqual('123');
    expect(component.culturalOffers.content[0].geolocation.lat).toEqual(5);
    expect(component.culturalOffers.content[0].geolocation.lon).toEqual(5);
    expect(component.culturalOffers.content[0].geolocation.location).toEqual('Srbija');
    expect(component.culturalOffers.content[0].category.id).toEqual(1);
    expect(component.culturalOffers.content[0].category.name).toEqual('Kategorija 1');
    expect(component.culturalOffers.content[0].category.description).toEqual('Opis');
    expect(component.culturalOffers.content[0].description).toEqual('Opis');
    expect(component.culturalOffers.content[0].image).toEqual('nekiUrl');
    expect(component.culturalOffers.content[0].averageMark).toEqual(4.85);

    expect(component.culturalOffers.content[1].id).toEqual(6);
    expect(component.culturalOffers.content[1].name).toEqual('Srbija 2');
    expect(component.culturalOffers.content[1].geolocation.placeId).toEqual('1234');
    expect(component.culturalOffers.content[1].geolocation.lat).toEqual(6);
    expect(component.culturalOffers.content[1].geolocation.lon).toEqual(6);
    expect(component.culturalOffers.content[1].geolocation.location).toEqual('Srbija 2');
    expect(component.culturalOffers.content[1].category.id).toEqual(1);
    expect(component.culturalOffers.content[1].category.name).toEqual('Kategorija 1');
    expect(component.culturalOffers.content[1].category.description).toEqual('Opis');
    expect(component.culturalOffers.content[1].description).toEqual('Opis 2');
    expect(component.culturalOffers.content[1].image).toEqual('nekiUrl 2');
    expect(component.culturalOffers.content[1].averageMark).toEqual(4.0);
  })
});
>>>>>>> Stashed changes
