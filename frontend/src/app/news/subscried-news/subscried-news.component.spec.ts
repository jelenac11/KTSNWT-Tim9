import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTab } from '@angular/material/tabs';
import { NgxPaginationModule } from 'ngx-pagination';
import { of } from 'rxjs';
import { CulturalOffer } from 'src/app/core/models/response/cultural-offer.model';
import { NewsPage } from 'src/app/core/models/response/news-page.model';
import { User } from 'src/app/core/models/response/user.model';
import { CulturalOfferService } from 'src/app/core/services/cultural-offer.service';
import { ImageService } from 'src/app/core/services/image.service';
import { NewsService } from 'src/app/core/services/news.service';
import { UserService } from 'src/app/core/services/user.service';

import { SubscriedNewsComponent } from './subscried-news.component';

describe('SubscriedNewsComponent', () => {
  let component: SubscriedNewsComponent;
  let fixture: ComponentFixture<SubscriedNewsComponent>;
  let newsService: NewsService;
  let coService: CulturalOfferService;
  let imageService: ImageService;
  let userService: UserService;

  beforeEach(() => {

    const mockNews: NewsPage = {
      content: [
        {
          content: 'Neki content 1',
          date: 1611407287491,
          culturalOfferID: 1,
          id: 5,
          images: [
            'neki_url_1',
            'neki_url_2'
          ]
        },
        {
          content: 'Neki content 2',
          date: 1611407287491,
          culturalOfferID: 1,
          id: 6,
          images: [
            'neki_url_3'
          ]
        },
      ],
      totalElements: 10
    };

    const newsServiceMocked = {
      getSubscribedNews: jasmine.createSpy('getSubscribedNews').and.returnValue(of(mockNews)),
      getAllByCategoryId: jasmine.createSpy('getAllByCategoryId').and.returnValue(of(mockNews))
    };

    const culturalOffer: CulturalOffer = {
      name: 'KULTURNA PONUDA',
      category: {
        description: 'Kategorija 1',
        id: 1,
        name: 'Kategorija 1'
      }
    };

    const coServiceMocked = {
      get: jasmine.createSpy('get').and.returnValue(of(culturalOffer))
    };

    const imageServiceMocked = {
      get: jasmine.createSpy('get').and.returnValue(of(''))
    };
    const mockedUser: User = {
      id: 1,
    };

    const userServiceMocked = {
      getCurrentUser: jasmine.createSpy('get').and.returnValue(of(mockedUser))
    };

    TestBed.configureTestingModule({
      imports: [NgxPaginationModule],
      declarations: [ SubscriedNewsComponent ],
      providers: [
        { provide: CulturalOfferService, useValue: coServiceMocked },
        { provide: NewsService, useValue: newsServiceMocked },
        { provide: ImageService, useValue: imageServiceMocked },
        { provide: UserService, useValue: userServiceMocked }
      ]
    });
    fixture = TestBed.createComponent(SubscriedNewsComponent);
    component = fixture.componentInstance;
    coService = TestBed.inject(CulturalOfferService);
    userService = TestBed.inject(UserService);
    imageService = TestBed.inject(ImageService);
    newsService = TestBed.inject(NewsService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('initilize component',  () => {
    component.ngOnInit();
    fixture.detectChanges();
    expect(newsService.getSubscribedNews).toHaveBeenCalled();
    expect(coService.get).toHaveBeenCalledTimes(4);
    expect(imageService.get).toHaveBeenCalledTimes(6);
    expect(component.culturalOffer.get(1).name).toEqual('KULTURNA PONUDA');
    expect(component.categories.length).toEqual(1);
    expect(component.categories[0].name).toEqual('Kategorija 1');
  });

  it('changeTab to other category',  () => {
    component.ngOnInit();
    component.changeTab({ index: 1, tab: new MatTab(null, null)});
    fixture.detectChanges();
    expect(newsService.getAllByCategoryId).toHaveBeenCalled();
    expect(coService.get).toHaveBeenCalled();
    expect(imageService.get).toHaveBeenCalled();
    expect(component.culturalOffer.get(1).name).toEqual('KULTURNA PONUDA');
    expect(component.categories.length).toEqual(1);
    expect(component.categories[0].name).toEqual('Kategorija 1');
  });
});
