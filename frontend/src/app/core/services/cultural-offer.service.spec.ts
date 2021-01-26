import { HttpClient } from '@angular/common/http';
import { fakeAsync, getTestBed, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CulturalOfferService } from './cultural-offer.service';
import { CulturalOfferPage } from '../models/response/cultural-offer-page.model';
import { environment } from 'src/environments/environment';
import { CulturalOffer } from '../models/response/cultural-offer.model';

describe('CulturalOfferService', () => {
  let injector;
  let service: CulturalOfferService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CulturalOfferService]
    });

    injector = getTestBed();
    service = TestBed.inject(CulturalOfferService);
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getAll() should return some cultural offers', fakeAsync(() => {
    let culturalOffers: CulturalOfferPage;

    const mockCulturalOffers: CulturalOfferPage =
    {
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
            id: 2,
            name: 'Kategorija 2',
            description: 'Opis 2'
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

    service.getAll(2, 3).subscribe(data => {
      culturalOffers = data;
    });

    const req = httpMock.expectOne(`${environment.api_url}cultural-offers/by-page?size=2&page=3`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCulturalOffers);

    tick();

    expect(culturalOffers.totalElements).toEqual(10);
    expect(culturalOffers.content.length).toEqual(2);

    expect(culturalOffers.content[0].id).toEqual(5);
    expect(culturalOffers.content[0].name).toEqual('Srbija');
    expect(culturalOffers.content[0].geolocation.placeId).toEqual('123');
    expect(culturalOffers.content[0].geolocation.lat).toEqual(5);
    expect(culturalOffers.content[0].geolocation.lon).toEqual(5);
    expect(culturalOffers.content[0].geolocation.location).toEqual('Srbija');
    expect(culturalOffers.content[0].category.id).toEqual(1);
    expect(culturalOffers.content[0].category.name).toEqual('Kategorija 1');
    expect(culturalOffers.content[0].category.description).toEqual('Opis');
    expect(culturalOffers.content[0].description).toEqual('Opis');
    expect(culturalOffers.content[0].image).toEqual('nekiUrl');
    expect(culturalOffers.content[0].averageMark).toEqual(4.85);

    expect(culturalOffers.content[1].id).toEqual(6);
    expect(culturalOffers.content[1].name).toEqual('Srbija 2');
    expect(culturalOffers.content[1].geolocation.placeId).toEqual('1234');
    expect(culturalOffers.content[1].geolocation.lat).toEqual(6);
    expect(culturalOffers.content[1].geolocation.lon).toEqual(6);
    expect(culturalOffers.content[1].geolocation.location).toEqual('Srbija 2');
    expect(culturalOffers.content[1].category.id).toEqual(2);
    expect(culturalOffers.content[1].category.name).toEqual('Kategorija 2');
    expect(culturalOffers.content[1].category.description).toEqual('Opis 2');
    expect(culturalOffers.content[1].description).toEqual('Opis 2');
    expect(culturalOffers.content[1].image).toEqual('nekiUrl 2');
    expect(culturalOffers.content[1].averageMark).toEqual(4.0);

  }));

  it('get() should return cultural offer', fakeAsync(() => {
    let culturalOffer: CulturalOffer;

    const mockCulturalOffers: CulturalOffer =
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
    };


    service.get('5').subscribe(data => {
      culturalOffer = data;
    });

    const req = httpMock.expectOne(`${environment.api_url}cultural-offers/5`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCulturalOffers);

    tick();

    expect(culturalOffer.id).toEqual(5);
    expect(culturalOffer.name).toEqual('Srbija');
    expect(culturalOffer.geolocation.placeId).toEqual('123');
    expect(culturalOffer.geolocation.lat).toEqual(5);
    expect(culturalOffer.geolocation.lon).toEqual(5);
    expect(culturalOffer.geolocation.location).toEqual('Srbija');
    expect(culturalOffer.category.id).toEqual(1);
    expect(culturalOffer.category.name).toEqual('Kategorija 1');
    expect(culturalOffer.category.description).toEqual('Opis');
    expect(culturalOffer.description).toEqual('Opis');
    expect(culturalOffer.image).toEqual('nekiUrl');
    expect(culturalOffer.averageMark).toEqual(4.85);
  }));


  it('getCulturalOffersByCategory() should return some cultural offers', fakeAsync(() => {
    let culturalOffers: CulturalOfferPage;

    const mockCulturalOffers: CulturalOfferPage =
    {
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

    service.getCulturalOffersByCategory('1', 2, 3).subscribe(data => {
      culturalOffers = data;
    });

    const req = httpMock.expectOne(`${environment.api_url}cultural-offers/category/1?size=2&page=3`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCulturalOffers);

    tick();

    expect(culturalOffers.totalElements).toEqual(10);
    expect(culturalOffers.content.length).toEqual(2);

    expect(culturalOffers.content[0].id).toEqual(5);
    expect(culturalOffers.content[0].name).toEqual('Srbija');
    expect(culturalOffers.content[0].geolocation.placeId).toEqual('123');
    expect(culturalOffers.content[0].geolocation.lat).toEqual(5);
    expect(culturalOffers.content[0].geolocation.lon).toEqual(5);
    expect(culturalOffers.content[0].geolocation.location).toEqual('Srbija');
    expect(culturalOffers.content[0].category.id).toEqual(1);
    expect(culturalOffers.content[0].category.name).toEqual('Kategorija 1');
    expect(culturalOffers.content[0].category.description).toEqual('Opis');
    expect(culturalOffers.content[0].description).toEqual('Opis');
    expect(culturalOffers.content[0].image).toEqual('nekiUrl');
    expect(culturalOffers.content[0].averageMark).toEqual(4.85);

    expect(culturalOffers.content[1].id).toEqual(6);
    expect(culturalOffers.content[1].name).toEqual('Srbija 2');
    expect(culturalOffers.content[1].geolocation.placeId).toEqual('1234');
    expect(culturalOffers.content[1].geolocation.lat).toEqual(6);
    expect(culturalOffers.content[1].geolocation.lon).toEqual(6);
    expect(culturalOffers.content[1].geolocation.location).toEqual('Srbija 2');
    expect(culturalOffers.content[1].category.id).toEqual(1);
    expect(culturalOffers.content[1].category.name).toEqual('Kategorija 1');
    expect(culturalOffers.content[1].category.description).toEqual('Opis');
    expect(culturalOffers.content[1].description).toEqual('Opis 2');
    expect(culturalOffers.content[1].image).toEqual('nekiUrl 2');
    expect(culturalOffers.content[1].averageMark).toEqual(4.0);

  }));

  it('findByCategoryIdAndName() should return some cultural offers', fakeAsync(() => {
    let culturalOffers: CulturalOfferPage;

    const mockCulturalOffers: CulturalOfferPage =
    {
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

    service.findByCategoryIdAndName('1', 'srb', 2, 3).subscribe(data => {
      culturalOffers = data;
    });

    const req = httpMock.expectOne(`${environment.api_url}cultural-offers/category/1/find-by-name/srb?size=2&page=3`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCulturalOffers);

    tick();

    expect(culturalOffers.totalElements).toEqual(10);
    expect(culturalOffers.content.length).toEqual(2);

    expect(culturalOffers.content[0].id).toEqual(5);
    expect(culturalOffers.content[0].name).toEqual('Srbija');
    expect(culturalOffers.content[0].geolocation.placeId).toEqual('123');
    expect(culturalOffers.content[0].geolocation.lat).toEqual(5);
    expect(culturalOffers.content[0].geolocation.lon).toEqual(5);
    expect(culturalOffers.content[0].geolocation.location).toEqual('Srbija');
    expect(culturalOffers.content[0].category.id).toEqual(1);
    expect(culturalOffers.content[0].category.name).toEqual('Kategorija 1');
    expect(culturalOffers.content[0].category.description).toEqual('Opis');
    expect(culturalOffers.content[0].description).toEqual('Opis');
    expect(culturalOffers.content[0].image).toEqual('nekiUrl');
    expect(culturalOffers.content[0].averageMark).toEqual(4.85);

    expect(culturalOffers.content[1].id).toEqual(6);
    expect(culturalOffers.content[1].name).toEqual('Srbija 2');
    expect(culturalOffers.content[1].geolocation.placeId).toEqual('1234');
    expect(culturalOffers.content[1].geolocation.lat).toEqual(6);
    expect(culturalOffers.content[1].geolocation.lon).toEqual(6);
    expect(culturalOffers.content[1].geolocation.location).toEqual('Srbija 2');
    expect(culturalOffers.content[1].category.id).toEqual(1);
    expect(culturalOffers.content[1].category.name).toEqual('Kategorija 1');
    expect(culturalOffers.content[1].category.description).toEqual('Opis');
    expect(culturalOffers.content[1].description).toEqual('Opis 2');
    expect(culturalOffers.content[1].image).toEqual('nekiUrl 2');
    expect(culturalOffers.content[1].averageMark).toEqual(4.0);

  }));

  it('findByName() should return some cultural offers', fakeAsync(() => {
    let culturalOffers: CulturalOfferPage;

    const mockCulturalOffers: CulturalOfferPage =
    {
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

    service.findByName('srb', 2, 3).subscribe(data => {
      culturalOffers = data;
    });

    const req = httpMock.expectOne(`${environment.api_url}cultural-offers/find-by-name/srb?size=2&page=3`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCulturalOffers);

    tick();

    expect(culturalOffers.totalElements).toEqual(10);
    expect(culturalOffers.content.length).toEqual(2);

    expect(culturalOffers.content[0].id).toEqual(5);
    expect(culturalOffers.content[0].name).toEqual('Srbija');
    expect(culturalOffers.content[0].geolocation.placeId).toEqual('123');
    expect(culturalOffers.content[0].geolocation.lat).toEqual(5);
    expect(culturalOffers.content[0].geolocation.lon).toEqual(5);
    expect(culturalOffers.content[0].geolocation.location).toEqual('Srbija');
    expect(culturalOffers.content[0].category.id).toEqual(1);
    expect(culturalOffers.content[0].category.name).toEqual('Kategorija 1');
    expect(culturalOffers.content[0].category.description).toEqual('Opis');
    expect(culturalOffers.content[0].description).toEqual('Opis');
    expect(culturalOffers.content[0].image).toEqual('nekiUrl');
    expect(culturalOffers.content[0].averageMark).toEqual(4.85);

    expect(culturalOffers.content[1].id).toEqual(6);
    expect(culturalOffers.content[1].name).toEqual('Srbija 2');
    expect(culturalOffers.content[1].geolocation.placeId).toEqual('1234');
    expect(culturalOffers.content[1].geolocation.lat).toEqual(6);
    expect(culturalOffers.content[1].geolocation.lon).toEqual(6);
    expect(culturalOffers.content[1].geolocation.location).toEqual('Srbija 2');
    expect(culturalOffers.content[1].category.id).toEqual(1);
    expect(culturalOffers.content[1].category.name).toEqual('Kategorija 1');
    expect(culturalOffers.content[1].category.description).toEqual('Opis');
    expect(culturalOffers.content[1].description).toEqual('Opis 2');
    expect(culturalOffers.content[1].image).toEqual('nekiUrl 2');
    expect(culturalOffers.content[1].averageMark).toEqual(4.0);

  }));

  it('post() should return new cultural offer', fakeAsync(() => {
    const culturalOffers: CulturalOffer = {
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
      averageMark: 0
    };

    let newCulturalOffers: CulturalOffer;

    const mockCulturalOffers: CulturalOffer =

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
      averageMark: 0
    };

    const formData = new FormData();
    const blob = new Blob([JSON.stringify(culturalOffers)], {
      type: 'application/json'
    });

    formData.append('culturalOfferDTO', blob);

    service.post(formData).subscribe(data => {
      newCulturalOffers = data;
    });

    const req = httpMock.expectOne(`${environment.api_url}cultural-offers`);
    expect(req.request.method).toBe('POST');
    req.flush(mockCulturalOffers);

    tick();

    expect(newCulturalOffers.id).toEqual(5);
    expect(newCulturalOffers.name).toEqual('Srbija');
    expect(newCulturalOffers.geolocation.placeId).toEqual('123');
    expect(newCulturalOffers.geolocation.lat).toEqual(5);
    expect(newCulturalOffers.geolocation.lon).toEqual(5);
    expect(newCulturalOffers.geolocation.location).toEqual('Srbija');
    expect(newCulturalOffers.category.id).toEqual(1);
    expect(newCulturalOffers.category.name).toEqual('Kategorija 1');
    expect(newCulturalOffers.category.description).toEqual('Opis');
    expect(newCulturalOffers.description).toEqual('Opis');
    expect(newCulturalOffers.image).toEqual('nekiUrl');
    expect(newCulturalOffers.averageMark).toEqual(0);

  }));

  it('put() should return new cultural offer', fakeAsync(() => {
    const culturalOffers: CulturalOffer = {
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
      description: 'Opis'
    };

    let newCulturalOffers: CulturalOffer;

    const mockCulturalOffers: CulturalOffer =

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
      averageMark: 0
    };

    const formData = new FormData();
    const blob = new Blob([JSON.stringify(culturalOffers)], {
      type: 'application/json'
    });

    formData.append('culturalOfferDTO', blob);

    service.put('5', formData).subscribe(data => {
      newCulturalOffers = data;
    });

    const req = httpMock.expectOne(`${environment.api_url}cultural-offers/5`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockCulturalOffers);

    tick();

    expect(newCulturalOffers.id).toEqual(5);
    expect(newCulturalOffers.name).toEqual('Srbija');
    expect(newCulturalOffers.geolocation.placeId).toEqual('123');
    expect(newCulturalOffers.geolocation.lat).toEqual(5);
    expect(newCulturalOffers.geolocation.lon).toEqual(5);
    expect(newCulturalOffers.geolocation.location).toEqual('Srbija');
    expect(newCulturalOffers.category.id).toEqual(1);
    expect(newCulturalOffers.category.name).toEqual('Kategorija 1');
    expect(newCulturalOffers.category.description).toEqual('Opis');
    expect(newCulturalOffers.description).toEqual('Opis');
    expect(newCulturalOffers.image).toEqual('nekiUrl');
    expect(newCulturalOffers.averageMark).toEqual(0);

  }));

  it('delete() should return new cultural offer', fakeAsync(() => {
    let result: boolean;

    service.delete('5').subscribe(data => {
      result = data;
    });

    const req = httpMock.expectOne(`${environment.api_url}cultural-offers/5`);
    expect(req.request.method).toBe('DELETE');
    req.flush(true);

    tick();

    expect(result).toEqual(true);
  }));

  it('getSubscribed should return cultural offers that user is subsribed', fakeAsync(() => {
    const mockCulturalOffers: CulturalOfferPage =
    {
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
    let culturalOffers: CulturalOfferPage;
    service.getSubscribed('1', 2, 3).subscribe(data => {
      culturalOffers = data;
    });

    const req = httpMock.expectOne(`${environment.api_url}cultural-offers/subscribed/1?size=2&page=3`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCulturalOffers);

    tick();

    expect(culturalOffers.totalElements).toEqual(10);
    expect(culturalOffers.content.length).toEqual(2);

    expect(culturalOffers.content[0].id).toEqual(5);
    expect(culturalOffers.content[0].name).toEqual('Srbija');
    expect(culturalOffers.content[0].geolocation.placeId).toEqual('123');
    expect(culturalOffers.content[0].geolocation.lat).toEqual(5);
    expect(culturalOffers.content[0].geolocation.lon).toEqual(5);
    expect(culturalOffers.content[0].geolocation.location).toEqual('Srbija');
    expect(culturalOffers.content[0].category.id).toEqual(1);
    expect(culturalOffers.content[0].category.name).toEqual('Kategorija 1');
    expect(culturalOffers.content[0].category.description).toEqual('Opis');
    expect(culturalOffers.content[0].description).toEqual('Opis');
    expect(culturalOffers.content[0].image).toEqual('nekiUrl');
    expect(culturalOffers.content[0].averageMark).toEqual(4.85);

    expect(culturalOffers.content[1].id).toEqual(6);
    expect(culturalOffers.content[1].name).toEqual('Srbija 2');
    expect(culturalOffers.content[1].geolocation.placeId).toEqual('1234');
    expect(culturalOffers.content[1].geolocation.lat).toEqual(6);
    expect(culturalOffers.content[1].geolocation.lon).toEqual(6);
    expect(culturalOffers.content[1].geolocation.location).toEqual('Srbija 2');
    expect(culturalOffers.content[1].category.id).toEqual(1);
    expect(culturalOffers.content[1].category.name).toEqual('Kategorija 1');
    expect(culturalOffers.content[1].category.description).toEqual('Opis');
    expect(culturalOffers.content[1].description).toEqual('Opis 2');
    expect(culturalOffers.content[1].image).toEqual('nekiUrl 2');
    expect(culturalOffers.content[1].averageMark).toEqual(4.0);

  }));
});
