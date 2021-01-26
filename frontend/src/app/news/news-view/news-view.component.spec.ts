import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { CulturalOffer } from 'src/app/core/models/response/cultural-offer.model';
import { News } from 'src/app/core/models/response/news.model';
import { CulturalOfferService } from 'src/app/core/services/cultural-offer.service';
import { ImageService } from 'src/app/core/services/image.service';
import { NewsService } from 'src/app/core/services/news.service';

import { NewsViewComponent } from './news-view.component';

describe('NewsViewComponent', () => {
  let component: NewsViewComponent;
  let fixture: ComponentFixture<NewsViewComponent>;
  let imageService: ImageService;
  let newsService: NewsService;
  let coService: CulturalOfferService;
  let route: ActivatedRoute;

  beforeEach(() => {
    const news: News = {
      content: 'Neki content 1',
      date: 1611407287491,
      culturalOfferID: 1,
      id: 5,
      images: [
        'neki_url_1',
        'neki_url_2'
      ]
    };
    const newsServiceMocked = {
      get: jasmine.createSpy('get').and.returnValue(of(news))
    };
    const imageServiceMocked = {
      get: jasmine.createSpy('get').and.returnValue(of(''))
    };

    const culturalOffer: CulturalOffer = {
      name: 'KULTURNA PONUDA'
    };

    const coServiceMocked = {
      get: jasmine.createSpy('get').and.returnValue(of(culturalOffer))
    };
    TestBed.configureTestingModule({
      declarations: [ NewsViewComponent ],
      providers: [
        { provide: CulturalOfferService, useValue: coServiceMocked },
        { provide: NewsService, useValue: newsServiceMocked },
        { provide: ImageService, useValue: imageServiceMocked },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: (id: string) => '1' } } } }
      ]
    });

    fixture = TestBed.createComponent(NewsViewComponent);
    component = fixture.componentInstance;
    coService = TestBed.inject(CulturalOfferService);
    imageService = TestBed.inject(ImageService);
    newsService = TestBed.inject(NewsService);
    route = TestBed.inject(ActivatedRoute);
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('load content', () => {
    component.ngOnInit();
    fixture.detectChanges();
    expect(newsService.get).toHaveBeenCalled();
    expect(coService.get).toHaveBeenCalled();
    expect(imageService.get).toHaveBeenCalled();
  });
});
