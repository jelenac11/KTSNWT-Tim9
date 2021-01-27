import { DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { CulturalOfferService } from 'src/app/core/services/cultural-offer.service';
import { JwtService } from 'src/app/core/services/jwt.service';
import { MarkService } from 'src/app/core/services/mark.service';
import { NewsService } from 'src/app/core/services/news.service';
import { UserService } from 'src/app/core/services/user.service';

import { CulturalOfferReviewComponent } from './cultural-offer-review.component';

describe('CulturalOfferReviewComponent', () => {
  let component: CulturalOfferReviewComponent;
  let fixture: ComponentFixture<CulturalOfferReviewComponent>;
  let route: ActivatedRoute;
  let culturalOfferService: CulturalOfferService;
  let registeredUserService: UserService;
  let newsService: NewsService;
  let markService: MarkService;
  let dialog: MatDialog;
  let jwtService: JwtService;

  beforeEach(() => {
    const data = {
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

    const culturalOfferServiceMock = {
      get: jasmine.createSpy('get').and.returnValue(of(data))
    };

    const jwtServiceMock = {
      getRole: jasmine.createSpy('getRole').and.returnValue(of('ROLE_ADMIN'))
    };

    const registeredUserServiceMock = {
      getCurrentUser: jasmine.createSpy('getCurrentUser').and.returnValue(of({
        id: 5,
        username: 'User',
        email: 'user@mail.com',
        firstName: 'User',
        lastName: 'User'
      }))
    };

    const newsServiceMock = {
      subscribe: jasmine.createSpy('subscribe').and.returnValue(of(true)),
      unsubscribe: jasmine.createSpy('unsubscribe').and.returnValue(of(false))
    };
    const markServiceMock = {
      create: jasmine.createSpy('create').and.returnValue(of({ value: 5 })),
      get: jasmine.createSpy('get').and.returnValue(of({ value: 5 })),
      update: jasmine.createSpy('update').and.returnValue(of({ value: 5 }))
    };

    TestBed.configureTestingModule({
      declarations: [CulturalOfferReviewComponent],
      providers: [
        { provide: CulturalOfferService, useValue: culturalOfferServiceMock },
        { provide: UserService, useValue: registeredUserServiceMock },
        { provide: JwtService, useValue: jwtServiceMock },
        { provide: NewsService, useValue: newsServiceMock },
        { provide: MarkService, useValue: markServiceMock },
        { provide: MatDialog, useValue: { MatDialog } },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: (id: string) => '5' } } } },
      ]
    });
  });

  it('should create', () => {
    fixture = TestBed.createComponent(CulturalOfferReviewComponent);
    component = fixture.componentInstance;
    culturalOfferService = TestBed.inject(CulturalOfferService);
    dialog = TestBed.inject(MatDialog);
    registeredUserService = TestBed.inject(UserService);
    jwtService = TestBed.inject(JwtService);
    markService = TestBed.inject(MarkService);
    newsService = TestBed.inject(NewsService);
    route = TestBed.inject(ActivatedRoute);
    expect(component).toBeTruthy();
  });

  it('should fetch the cultural offer', fakeAsync(() => {
    fixture = TestBed.createComponent(CulturalOfferReviewComponent);
    component = fixture.componentInstance;
    culturalOfferService = TestBed.inject(CulturalOfferService);
    dialog = TestBed.inject(MatDialog);
    registeredUserService = TestBed.inject(UserService);
    jwtService = TestBed.inject(JwtService);
    markService = TestBed.inject(MarkService);
    newsService = TestBed.inject(NewsService);
    route = TestBed.inject(ActivatedRoute);

    component.ngOnInit();
    expect(jwtService.getRole).toHaveBeenCalled();
    expect(culturalOfferService.get).toHaveBeenCalledWith('5');

    expect(component.culturalOfferId).toEqual('5');
    expect(component.culturalOffer.id).toEqual(5);
    expect(component.culturalOffer.name).toEqual('Srbija');
    expect(component.culturalOffer.geolocation.location).toEqual('Srbija');
    expect(component.culturalOffer.category.id).toEqual(1);
    expect(component.culturalOffer.description).toEqual('Opis');
    expect(component.culturalOffer.image).toEqual('nekiUrl');
    expect(component.culturalOffer.averageMark).toEqual(4.85);

    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    fixture.whenStable()
      .then(() => {
        const name = fixture.debugElement.query(By.css('b')).nativeElement;
        expect(name.innerText).toEqual('Srbija');
      });
  }));

  it('onRate with exist rating', fakeAsync(() => {
    const jwtServiceMocked2 = {
      getRole: jasmine.createSpy('getRole').and.returnValue('ROLE_REGISTERED_USER')
    };
    TestBed.overrideProvider(JwtService, { useValue: jwtServiceMocked2 });
    fixture = TestBed.createComponent(CulturalOfferReviewComponent);
    component = fixture.componentInstance;
    culturalOfferService = TestBed.inject(CulturalOfferService);
    dialog = TestBed.inject(MatDialog);
    registeredUserService = TestBed.inject(UserService);
    jwtService = TestBed.inject(JwtService);
    markService = TestBed.inject(MarkService);
    newsService = TestBed.inject(NewsService);
    route = TestBed.inject(ActivatedRoute);

    component.isRated = true;
    component.onRate(5);
    expect(markService.update).toHaveBeenCalled();
    expect(culturalOfferService.get).toHaveBeenCalled();
    expect(markService.get).toHaveBeenCalled();
    expect(component.mark).toEqual(5);
    expect(component.culturalOffer.id).toEqual(5);
    expect(component.culturalOffer.name).toEqual('Srbija');
    expect(component.culturalOffer.geolocation.location).toEqual('Srbija');
    expect(component.culturalOffer.category.id).toEqual(1);
    expect(component.culturalOffer.description).toEqual('Opis');
    expect(component.culturalOffer.image).toEqual('nekiUrl');
    expect(component.culturalOffer.averageMark).toEqual(4.85);

  }));

  it('onRate with nonexist rating', fakeAsync(() => {
    const jwtServiceMocked2 = {
      getRole: jasmine.createSpy('getRole').and.returnValue('ROLE_REGISTERED_USER')
    };
    TestBed.overrideProvider(JwtService, { useValue: jwtServiceMocked2 });
    fixture = TestBed.createComponent(CulturalOfferReviewComponent);
    component = fixture.componentInstance;
    culturalOfferService = TestBed.inject(CulturalOfferService);
    dialog = TestBed.inject(MatDialog);
    registeredUserService = TestBed.inject(UserService);
    jwtService = TestBed.inject(JwtService);
    markService = TestBed.inject(MarkService);
    newsService = TestBed.inject(NewsService);
    route = TestBed.inject(ActivatedRoute);

    component.isRated = false;
    component.onRate(5);
    expect(markService.create).toHaveBeenCalled();
    expect(culturalOfferService.get).toHaveBeenCalled();
    expect(markService.get).toHaveBeenCalled();
    expect(component.mark).toEqual(5);

    expect(component.culturalOffer.id).toEqual(5);
    expect(component.culturalOffer.name).toEqual('Srbija');
    expect(component.culturalOffer.geolocation.location).toEqual('Srbija');
    expect(component.culturalOffer.category.id).toEqual(1);
    expect(component.culturalOffer.description).toEqual('Opis');
    expect(component.culturalOffer.image).toEqual('nekiUrl');
    expect(component.culturalOffer.averageMark).toEqual(4.85);

  }));

  it('subscribe', fakeAsync(() => {
    fixture = TestBed.createComponent(CulturalOfferReviewComponent);
    component = fixture.componentInstance;
    culturalOfferService = TestBed.inject(CulturalOfferService);
    dialog = TestBed.inject(MatDialog);
    registeredUserService = TestBed.inject(UserService);
    jwtService = TestBed.inject(JwtService);
    markService = TestBed.inject(MarkService);
    newsService = TestBed.inject(NewsService);
    route = TestBed.inject(ActivatedRoute);

    component.subscribe();
    expect(newsService.subscribe).toHaveBeenCalled();
    expect(component.subscribed).toEqual(true);
  }));

  it('unsubscribe', fakeAsync(() => {
    fixture = TestBed.createComponent(CulturalOfferReviewComponent);
    component = fixture.componentInstance;
    culturalOfferService = TestBed.inject(CulturalOfferService);
    dialog = TestBed.inject(MatDialog);
    registeredUserService = TestBed.inject(UserService);
    jwtService = TestBed.inject(JwtService);
    markService = TestBed.inject(MarkService);
    newsService = TestBed.inject(NewsService);
    route = TestBed.inject(ActivatedRoute);

    component.unsubscribe();
    expect(newsService.unsubscribe).toHaveBeenCalled();
    expect(component.subscribed).toEqual(false);
  }));
});
