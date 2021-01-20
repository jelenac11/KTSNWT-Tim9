import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, getTestBed, TestBed, tick } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { MarkRequest } from '../models/request/mark-request.model';
import { Mark } from '../models/response/mark.model';

import { MarkService } from './mark.service';

describe('MarkService', () => {
  let service: MarkService;
  let injector;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MarkService]
    });
    injector = getTestBed();
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(MarkService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('get() should return mark', fakeAsync(() => {
    const id = 1;
    const mockMark: Mark = {
      id: 1,
      value: 4,
      culturalOffer: 1
    };
    let mark: Mark;

    service.get(id).subscribe(data => {
      mark = data;
    });
    const req = httpMock.expectOne(`${environment.api_url}marks/${id}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockMark);

    tick();
    expect(mark.id).toEqual(1);
    expect(mark.value).toEqual(4);
    expect(mark.culturalOffer).toEqual(1);
  }));

  it('create() should return mark', fakeAsync(() => {
    const markRequest: MarkRequest = {
      culturalOffer: 1,
      value: 4
    };
    const mockMark: Mark = {
      id: 1,
      value: 4,
      culturalOffer: 1
    };
    let mark: Mark;

    service.create(markRequest).subscribe(data => {
      mark = data;
    });
    const req = httpMock.expectOne(`${environment.api_url}marks/rate`);
    expect(req.request.method).toBe('POST');
    req.flush(mockMark);

    tick();
    expect(mark.id).toEqual(1);
    expect(mark.value).toEqual(4);
    expect(mark.culturalOffer).toEqual(1);
  }));

  it('update() should return mark', fakeAsync(() => {
    const markRequest: MarkRequest = {
      culturalOffer: 1,
      value: 2
    };
    const mockMark: Mark = {
      id: 1,
      value: 2,
      culturalOffer: 1
    };
    let mark: Mark;

    service.update(markRequest).subscribe(data => {
      mark = data;
    });
    const req = httpMock.expectOne(`${environment.api_url}marks`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockMark);

    tick();
    expect(mark.id).toEqual(1);
    expect(mark.value).toEqual(2);
    expect(mark.culturalOffer).toEqual(1);
  }));

});
