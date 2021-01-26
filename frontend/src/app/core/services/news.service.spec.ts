import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, getTestBed, TestBed, tick } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { NewsPage } from '../models/response/news-page.model';
import { News } from '../models/response/news.model';

import { NewsService } from './news.service';

describe('NewsService', () => {
  let service: NewsService;
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NewsService]
    });
    injector = getTestBed();
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(NewsService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getAll() should return some news', fakeAsync(() => {
    let newsPage: NewsPage;

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

    service.getAll(2, 3).subscribe(data => {
      newsPage = data;
    });


    const req = httpMock.expectOne(`${environment.api_url}news/by-page?size=2&page=3`);
    expect(req.request.method).toBe('GET');
    req.flush(mockNews);

    tick();

    expect(newsPage.totalElements).toEqual(10);
    expect(newsPage.content.length).toEqual(2);

    expect(newsPage.content[0].id).toEqual(5);
    expect(newsPage.content[0].content).toEqual('Neki content 1');
    expect(newsPage.content[0].culturalOfferID).toEqual(1);
    expect(newsPage.content[0].date).toEqual(1611407287491);
    expect(newsPage.content[0].images.length).toEqual(2);
    expect(newsPage.content[0].images[0]).toEqual('neki_url_1');
    expect(newsPage.content[0].images[1]).toEqual('neki_url_2');

    expect(newsPage.content[1].id).toEqual(6);
    expect(newsPage.content[1].content).toEqual('Neki content 2');
    expect(newsPage.content[1].culturalOfferID).toEqual(1);
    expect(newsPage.content[1].date).toEqual(1611407287491);
    expect(newsPage.content[1].images.length).toEqual(1);
    expect(newsPage.content[1].images[0]).toEqual('neki_url_3');

  }));

  it('get() should return news', fakeAsync(() => {
    let news: News;

    const mockNews: News = {
      content: 'Neki RNG content',
      culturalOfferID: 2,
      date: 1611407881315,
      id: 3,
      images: [
        'neki_url_10'
      ]
    };

    service.get(3).subscribe(data => {
      news = data;
    });


    const req = httpMock.expectOne(`${environment.api_url}news/3`);
    expect(req.request.method).toBe('GET');
    req.flush(mockNews);

    tick();

    expect(news.id).toEqual(3);
    expect(news.content).toEqual('Neki RNG content');
    expect(news.culturalOfferID).toEqual(2);
    expect(news.date).toEqual(1611407881315);
    expect(news.images.length).toEqual(1);
    expect(news.images[0]).toEqual('neki_url_10');

  }));

  it('post() should return created news', fakeAsync(() => {
    const newsDTO: News = {
      content: 'Neki RNG content',
      culturalOfferID: 2,
      date: 1611407881315,
      images: [
        'neki_url_10'
      ]
    };

    let createdNews: News;

    const mockNews: News = {
      content: 'Neki RNG content',
      culturalOfferID: 2,
      date: 1611407881315,
      id: 3,
      images: [
        'neki_url_10'
      ]
    };

    service.post(newsDTO).subscribe(data => {
      createdNews = data;
    });


    const req = httpMock.expectOne(`${environment.api_url}news`);
    expect(req.request.method).toBe('POST');
    req.flush(mockNews);

    tick();

    expect(createdNews.id).toEqual(3);
    expect(createdNews.content).toEqual('Neki RNG content');
    expect(createdNews.culturalOfferID).toEqual(2);
    expect(createdNews.date).toEqual(1611407881315);
    expect(createdNews.images.length).toEqual(1);
    expect(createdNews.images[0]).toEqual('neki_url_10');

  }));

  it('put() should return updated news', fakeAsync(() => {
    const newsDTO: News = {
      content: 'Neki RNG content',
      culturalOfferID: 2,
      date: 1611407881315,
      id: 3,
      images: [
        'neki_url_10'
      ]
    };

    let updatedNews: News;

    const mockNews: News = {
      content: 'Neki RNG content',
      culturalOfferID: 2,
      date: 1611407881315,
      id: 3,
      images: [
        'neki_url_10'
      ]
    };

    service.put(3, newsDTO).subscribe(data => {
      updatedNews = data;
    });


    const req = httpMock.expectOne(`${environment.api_url}news/3`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockNews);

    tick();

    expect(updatedNews.id).toEqual(3);
    expect(updatedNews.content).toEqual('Neki RNG content');
    expect(updatedNews.culturalOfferID).toEqual(2);
    expect(updatedNews.date).toEqual(1611407881315);
    expect(updatedNews.images.length).toEqual(1);
    expect(updatedNews.images[0]).toEqual('neki_url_10');

  }));

  it('delete() should return true', fakeAsync(() => {
    let response;

    service.delete(3).subscribe(res => {
      response = (res === 'true');
    });


    const req = httpMock.expectOne(`${environment.api_url}news/3`);
    expect(req.request.method).toBe('DELETE');
    req.flush('true');

    tick();

    expect(response).toEqual(true);

  }));

  it('subscribe() should return true', fakeAsync(() => {
    let response;

    service.subscribe('20', '1').subscribe(res => {
      response = res;
    });


    const req = httpMock.expectOne(`${environment.api_url}news/subscribe/20/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(true);

    tick();

    expect(response).toEqual(true);

  }));

  it('unsubscribe() should return true', fakeAsync(() => {
    let response;

    service.unsubscribe('20', '1').subscribe(res => {
      response = res;
    });


    const req = httpMock.expectOne(`${environment.api_url}news/unsubscribe/20/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(true);

    tick();

    expect(response).toEqual(true);

  }));

  it('getAllByCOID() should return some news', fakeAsync(() => {
    const COID = 4;
    let newsPage: NewsPage;

    const mockNews: NewsPage = {
      content: [
        {
          content: 'Neki content 1',
          date: 1611407287491,
          culturalOfferID: 4,
          id: 5,
          images: [
            'neki_url_1',
            'neki_url_2'
          ]
        },
        {
          content: 'Neki content 2',
          date: 1611407287491,
          culturalOfferID: 4,
          id: 6,
          images: [
            'neki_url_3'
          ]
        },
      ],
      totalElements: 10
    };

    service.getAllByCOID(COID, 2, 3).subscribe(data => {
      newsPage = data;
    });


    const req = httpMock.expectOne(`${environment.api_url}news/${COID}/by-page?size=2&page=3`);
    expect(req.request.method).toBe('GET');
    req.flush(mockNews);

    tick();

    expect(newsPage.totalElements).toEqual(10);
    expect(newsPage.content.length).toEqual(2);

    expect(newsPage.content[0].id).toEqual(5);
    expect(newsPage.content[0].content).toEqual('Neki content 1');
    expect(newsPage.content[0].culturalOfferID).toEqual(4);
    expect(newsPage.content[0].date).toEqual(1611407287491);
    expect(newsPage.content[0].images.length).toEqual(2);
    expect(newsPage.content[0].images[0]).toEqual('neki_url_1');
    expect(newsPage.content[0].images[1]).toEqual('neki_url_2');

    expect(newsPage.content[1].id).toEqual(6);
    expect(newsPage.content[1].content).toEqual('Neki content 2');
    expect(newsPage.content[1].culturalOfferID).toEqual(4);
    expect(newsPage.content[1].date).toEqual(1611407287491);
    expect(newsPage.content[1].images.length).toEqual(1);
    expect(newsPage.content[1].images[0]).toEqual('neki_url_3');

  }));

  it('getSubscribedNews() should return some news', fakeAsync(() => {
    const USERID = 4;
    let newsPage: NewsPage;

    const mockNews: NewsPage = {
      content: [
        {
          content: 'Neki content 1',
          date: 1611407287491,
          culturalOfferID: 4,
          id: 5,
          images: [
            'neki_url_1',
            'neki_url_2'
          ]
        },
        {
          content: 'Neki content 2',
          date: 1611407287491,
          culturalOfferID: 4,
          id: 6,
          images: [
            'neki_url_3'
          ]
        },
      ],
      totalElements: 10
    };

    service.getSubscribedNews(2, 3, USERID + '').subscribe(data => {
      newsPage = data;
    });


    const req = httpMock.expectOne(`${environment.api_url}news/subscribed-news/${USERID}?size=2&page=3`);
    expect(req.request.method).toBe('GET');
    req.flush(mockNews);

    tick();

    expect(newsPage.totalElements).toEqual(10);
    expect(newsPage.content.length).toEqual(2);

    expect(newsPage.content[0].id).toEqual(5);
    expect(newsPage.content[0].content).toEqual('Neki content 1');
    expect(newsPage.content[0].culturalOfferID).toEqual(4);
    expect(newsPage.content[0].date).toEqual(1611407287491);
    expect(newsPage.content[0].images.length).toEqual(2);
    expect(newsPage.content[0].images[0]).toEqual('neki_url_1');
    expect(newsPage.content[0].images[1]).toEqual('neki_url_2');

    expect(newsPage.content[1].id).toEqual(6);
    expect(newsPage.content[1].content).toEqual('Neki content 2');
    expect(newsPage.content[1].culturalOfferID).toEqual(4);
    expect(newsPage.content[1].date).toEqual(1611407287491);
    expect(newsPage.content[1].images.length).toEqual(1);
    expect(newsPage.content[1].images[0]).toEqual('neki_url_3');

  }));

  it('getAllByCategoryId() should return some news', fakeAsync(() => {
    const USERID = 4;
    const CAT_ID = 4;
    let newsPage: NewsPage;

    const mockNews: NewsPage = {
      content: [
        {
          content: 'Neki content 1',
          date: 1611407287491,
          culturalOfferID: 4,
          id: 5,
          images: [
            'neki_url_1',
            'neki_url_2'
          ]
        },
        {
          content: 'Neki content 2',
          date: 1611407287491,
          culturalOfferID: 4,
          id: 6,
          images: [
            'neki_url_3'
          ]
        },
      ],
      totalElements: 10
    };

    service.getAllByCategoryId(2, 3, USERID + '', CAT_ID + '').subscribe(data => {
      newsPage = data;
    });


    const req = httpMock.expectOne(`${environment.api_url}news/subscribed-news/${USERID}/${CAT_ID}?size=2&page=3`);
    expect(req.request.method).toBe('GET');
    req.flush(mockNews);

    tick();

    expect(newsPage.totalElements).toEqual(10);
    expect(newsPage.content.length).toEqual(2);

    expect(newsPage.content[0].id).toEqual(5);
    expect(newsPage.content[0].content).toEqual('Neki content 1');
    expect(newsPage.content[0].culturalOfferID).toEqual(4);
    expect(newsPage.content[0].date).toEqual(1611407287491);
    expect(newsPage.content[0].images.length).toEqual(2);
    expect(newsPage.content[0].images[0]).toEqual('neki_url_1');
    expect(newsPage.content[0].images[1]).toEqual('neki_url_2');

    expect(newsPage.content[1].id).toEqual(6);
    expect(newsPage.content[1].content).toEqual('Neki content 2');
    expect(newsPage.content[1].culturalOfferID).toEqual(4);
    expect(newsPage.content[1].date).toEqual(1611407287491);
    expect(newsPage.content[1].images.length).toEqual(1);
    expect(newsPage.content[1].images[0]).toEqual('neki_url_3');

  }));


});
