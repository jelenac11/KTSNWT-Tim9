import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { of } from 'rxjs';
import { CulturalOffer } from 'src/app/core/models/response/cultural-offer.model';
import { NewsPage } from 'src/app/core/models/response/news-page.model';
import { CulturalOfferService } from 'src/app/core/services/cultural-offer.service';
import { ImageService } from 'src/app/core/services/image.service';
import { JwtService } from 'src/app/core/services/jwt.service';
import { NewsService } from 'src/app/core/services/news.service';
import { Snackbar } from 'src/app/shared/snackbars/snackbar/snackbar';

import { NewsReviewComponent } from './news-review.component';

describe('NewsReviewComponent', () => {
  let component: NewsReviewComponent;
  let fixture: ComponentFixture<NewsReviewComponent>;
  let route: ActivatedRoute;
  let snackBar: Snackbar;
  let imageService: ImageService;
  let newsService: NewsService;
  let jwtService: JwtService;
  let coService: CulturalOfferService;
  let dialog: MatDialog;

  beforeEach(() => {
    const snackBarMocked = {
      success: jasmine.createSpy('success'),
      error: jasmine.createSpy('error')
    };

    const imageServiceMocked = {
      get: jasmine.createSpy('get').and.returnValue(of(''))
    };

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
      getAllByCOID: jasmine.createSpy('getAllByCOID').and.returnValue(of(mockNews)),
      delete: jasmine.createSpy('delete').and.returnValue(of(true))
    };

    const culturalOffer: CulturalOffer = {
      name: 'KULTURNA PONUDA'
    };

    const coServiceMocked = {
      get: jasmine.createSpy('get').and.returnValue(of(culturalOffer))
    };

    const jwtServiceMocked = {
      getRole: jasmine.createSpy('getRole').and.returnValue('ROLE_ADMIN')
    };

    TestBed.configureTestingModule({
      imports: [NgxPaginationModule],
      declarations: [ NewsReviewComponent ],
      providers: [
        { provide: Snackbar, useValue: snackBarMocked },
        { provide: CulturalOfferService, useValue: coServiceMocked },
        { provide: NewsService, useValue: newsServiceMocked },
        { provide: ImageService, useValue: imageServiceMocked },
        { provide: JwtService, useValue: jwtServiceMocked },
        { provide: MatDialog, useValue: {MatDialog} },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: (id: string) => '1' } } } },
      ]
    });

    fixture = TestBed.createComponent(NewsReviewComponent);
    component = fixture.componentInstance;
    coService = TestBed.inject(CulturalOfferService);
    dialog = TestBed.inject(MatDialog);
    snackBar = TestBed.inject(Snackbar);
    jwtService = TestBed.inject(JwtService);
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
    expect(newsService.getAllByCOID).toHaveBeenCalled();
    expect(coService.get).toHaveBeenCalledTimes(4);
    expect(jwtService.getRole).toHaveBeenCalledTimes(2);
    expect(imageService.get).toHaveBeenCalledTimes(6);
    expect(component.role).toEqual('ROLE_ADMIN');
  });

  it('pageChanged', () => {
    component.handlePageChange(2);
    fixture.detectChanges();

    expect(newsService.getAllByCOID).toHaveBeenCalled();
    expect(coService.get).toHaveBeenCalledTimes(4);
    expect(imageService.get).toHaveBeenCalledTimes(6);

    expect(component.news.content.length).toBe(2);
    expect(component.news.totalElements).toBe(10);

    expect(component.news.content[0].id).toEqual(5);
    expect(component.news.content[0].content).toEqual('Neki content 1');
    expect(component.news.content[0].culturalOfferID).toEqual(1);
    expect(component.news.content[0].date).toEqual(1611407287491);
    expect(component.news.content[0].images.length).toEqual(2);
    expect(component.news.content[0].images[0]).toEqual('neki_url_1');
    expect(component.news.content[0].images[1]).toEqual('neki_url_2');

    expect(component.news.content[1].id).toEqual(6);
    expect(component.news.content[1].content).toEqual('Neki content 2');
    expect(component.news.content[1].culturalOfferID).toEqual(1);
    expect(component.news.content[1].date).toEqual(1611407287491);
    expect(component.news.content[1].images.length).toEqual(1);
    expect(component.news.content[1].images[0]).toEqual('neki_url_3');
  });

  it('delete', () => {
    component.ngOnInit();
    component.delete(2);
    fixture.detectChanges();
    expect(newsService.delete).toHaveBeenCalled();
    expect(snackBar.success).toHaveBeenCalledWith('You have successfully deleted news!');
  });
});
