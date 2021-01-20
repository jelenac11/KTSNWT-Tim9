import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { CategoryService } from 'src/app/core/services/category.service';
import { CulturalOfferService } from 'src/app/core/services/cultural-offer.service';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let culturalOfferService: CulturalOfferService;
  let categoryService: CategoryService;

  beforeEach(() => {
    const data = {
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
    const culturalOfferServiceMock = {
      getCulturalOffersByCategory: jasmine.createSpy('getCulturalOffersByCategory').and.returnValue(of(data)),
      findByCategoryIdAndName: jasmine.createSpy('findByCategoryIdAndName').and.returnValue(of(data))
    };

    const categoryServiceMock = {
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
      declarations: [HomeComponent],
      providers: [
        {
          provide: CulturalOfferService, useValue: culturalOfferServiceMock
        },
        {
          provide: CategoryService, useValue: categoryServiceMock
        }]
    });

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    culturalOfferService = TestBed.inject(CulturalOfferService);
    categoryService = TestBed.inject(CategoryService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch the cultural offers and categories', () => {
    component.ngOnInit();
    expect(categoryService.getAll).toHaveBeenCalled();
    expect(culturalOfferService.getCulturalOffersByCategory).toHaveBeenCalledWith('1', 10, 0);
    expect(component.culturalOffers.totalElements).toEqual(10);
    expect(component.culturalOffers.content.length).toEqual(2);

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

  it('clickRow', () => {
    const culturalOffer = {
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
    };
    component.clickRow(culturalOffer);

    expect(component.latitude).toEqual(6);
    expect(component.longitude).toEqual(6);
  });

  it('clickRow with same latitude and longitude', () => {
    const culturalOffer = {
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
        lon: 0,
        lat: 0
      },
      description: 'Opis 2',
      image: 'nekiUrl 2',
      averageMark: 4.0
    };
    component.clickRow(culturalOffer);

    expect(component.latitude).toEqual(0.00001);
    expect(component.longitude).toEqual(0.00001);
  });

  it('changeTab', () => {
    component.culturalOffers = {
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
    component.categories = [{
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
    }];
    component.changeTab({ index: 2 });

    expect(culturalOfferService.getCulturalOffersByCategory).toHaveBeenCalledWith('3', 10, 0);
    expect(component.page).toEqual(1);
    expect(component.latitude).toEqual(0.00001);
    expect(component.longitude).toEqual(0.00001);
    expect(component.zoom).toEqual(2.00001);

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
  });

  it('searchChanged', () => {
    component.culturalOffers = {
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
    component.categories = [{
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
    }];
    component.searchChanged('srb');

    expect(culturalOfferService.findByCategoryIdAndName).toHaveBeenCalledWith('1', 'srb', 10, 0);
    expect(component.page).toEqual(1);
    expect(component.latitude).toEqual(0.00001);
    expect(component.longitude).toEqual(0.00001);
    expect(component.zoom).toEqual(2.00001);

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
  });

  it('handlePageChange', () => {
    component.culturalOffers = {
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
    component.categories = [{
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
    }];
    component.handlePageChange(3);

    expect(culturalOfferService.getCulturalOffersByCategory).toHaveBeenCalledWith('1', 10, 2);
    expect(component.page).toEqual(3);
    expect(component.latitude).toEqual(0.00001);
    expect(component.longitude).toEqual(0.00001);
    expect(component.zoom).toEqual(2.00001);

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
  });
});
