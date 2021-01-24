import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, getTestBed, TestBed, tick } from '@angular/core/testing';
import { environment } from 'src/environments/environment';

import { ImageService } from './image.service';

describe('ImageService', () => {
  let service: ImageService;
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ImageService]
    });
    injector = getTestBed();
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('upload() should return url to file', fakeAsync(() => {
    const file: File = new File([], 'NekiFajl.png');
    const mockUrl = 'neki_url';
    let url: string;

    service.upload(file).subscribe(data => {
      url = data;
    });

    const req = httpMock.expectOne(`${environment.api_url}images/upload`);
    expect(req.request.method).toBe('POST');
    req.flush(mockUrl);

    tick();

    expect(url).toEqual('neki_url');
  }));

  it('delete() should return true', fakeAsync(() => {
    const url = 'neki_url';
    let response: boolean;
    service.delete(url).subscribe(res => {
      response = (res === 'true');
    });

    const req = httpMock.expectOne(`${environment.api_url}images/delete`);
    expect(req.request.method).toBe('DELETE');
    req.flush('true');

    tick();

    expect(response).toBeTrue();
  }));

  it('get() should return representation of image', fakeAsync(() => {
    const url = 'neki_url';
    let img: string;
    service.get(url).subscribe(data => {
      img = data;
    });

    const req = httpMock.expectOne(`${environment.api_url}images`);
    expect(req.request.method).toBe('POST');
    req.flush('asdf');

    tick();

    expect(img).toEqual('asdf');
  }));
});
