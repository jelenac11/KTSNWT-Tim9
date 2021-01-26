import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxPaginationModule } from 'ngx-pagination';
import { of } from 'rxjs';
import { CulturalOfferPage } from 'src/app/core/models/response/cultural-offer-page.model';
import { User } from 'src/app/core/models/response/user.model';
import { CulturalOfferService } from 'src/app/core/services/cultural-offer.service';
import { NewsService } from 'src/app/core/services/news.service';
import { UserService } from 'src/app/core/services/user.service';
import { Snackbar } from 'src/app/shared/snackbars/snackbar/snackbar';

import { SubscribedOffersComponent } from './subscribed-offers.component';

describe('SubscribedOffersComponent', () => {
  let component: SubscribedOffersComponent;
  let fixture: ComponentFixture<SubscribedOffersComponent>;
  let snackBar: Snackbar;
  let userService: UserService;
  let coService: CulturalOfferService;
  let newsService: NewsService;

  beforeEach( () => {
    const snackBarMocked = {
      success: jasmine.createSpy('success'),
      error: jasmine.createSpy('error')
    };

    const user: User = {
      id: 1
    };

    const userServiceMocked = {
      getCurrentUser: jasmine.createSpy().and.returnValue(of(user))
    };

    const data: CulturalOfferPage = {
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

    const coServiceMocked = {
      getSubscribed: jasmine.createSpy('getSubscribed').and.returnValue(of(data))
    };

    const newsServiceMocked = {
      unsubscribe: jasmine.createSpy('unsubscribe').and.returnValue(of(true))
    };


    TestBed.configureTestingModule({
      imports: [NgxPaginationModule],
      declarations: [ SubscribedOffersComponent ],
      providers: [
        { provide: Snackbar, useValue: snackBarMocked },
        { provide: CulturalOfferService, useValue: coServiceMocked },
        { provide: NewsService, useValue: newsServiceMocked },
        { provide: UserService, useValue: userServiceMocked },
      ]
    });

    fixture = TestBed.createComponent(SubscribedOffersComponent);
    component = fixture.componentInstance;
    coService = TestBed.inject(CulturalOfferService);
    snackBar = TestBed.inject(Snackbar);
    newsService = TestBed.inject(NewsService);
    userService = TestBed.inject(UserService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('load content', () => {
    component.ngOnInit();
    fixture.detectChanges();
    expect(coService.getSubscribed).toHaveBeenCalled();
    expect(userService.getCurrentUser).toHaveBeenCalled();
  });

  it('pageChanged', () => {
    component.handlePageChange(2);
    fixture.detectChanges();
    expect(coService.getSubscribed).toHaveBeenCalled();

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
  });

  it('unsubscribe', () => {
    component.ngOnInit();
    component.unsubscribe(component.culturalOffers.content[0].id, component.culturalOffers.content[0].name);
    fixture.detectChanges();
    expect(newsService.unsubscribe).toHaveBeenCalled();
    expect(coService.getSubscribed).toHaveBeenCalled();
    expect(snackBar.success).toHaveBeenCalledWith('You have unsubscribed from: ' + component.culturalOffers.content[0].name);
  });
});
