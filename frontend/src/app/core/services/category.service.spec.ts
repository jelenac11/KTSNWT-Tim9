import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, getTestBed, TestBed, tick } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { CategoryPage } from '../models/response/category-page.model';
import { Category } from '../models/response/category.model';

import { CategoryService } from './category.service';

describe('CategoryService', () => {
  let service: CategoryService;
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CategoryService]
    });
    injector = getTestBed();
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(CategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getAll() should return all categories', fakeAsync(() => {
    let categories: Category[];

    const mockCategory: Category[] = [
      {
        description: 'Neka kategorija 1',
        id: 1,
        name: 'Kategorija 1'
      },
      {
        description: 'Neka kategorija 2',
        id: 2,
        name: 'Kategorija 2'
      },
      {
        description: 'Neka kategorija 3',
        id: 3,
        name: 'Kategorija 3'
      }
    ];
    service.getAll().subscribe(data => {
      categories = data;
    });

    const req = httpMock.expectOne(`${environment.api_url}categories`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCategory);

    tick();

    expect(categories.length).toEqual(3);
    expect(categories[0].description).toEqual('Neka kategorija 1');
    expect(categories[0].id).toBe(1);
    expect(categories[0].name).toEqual('Kategorija 1');

    expect(categories[1].description).toEqual('Neka kategorija 2');
    expect(categories[1].id).toBe(2);
    expect(categories[1].name).toEqual('Kategorija 2');

    expect(categories[2].description).toEqual('Neka kategorija 3');
    expect(categories[2].id).toBe(3);
    expect(categories[2].name).toEqual('Kategorija 3');

  }));

  it('getAllPages() should return some categories', fakeAsync(() => {
    let categoryPage: CategoryPage;

    const mockCategory: CategoryPage = {
      totalElements: 10,
      content: [
        {
          description: 'Neka kategorija 1',
          id: 1,
          name: 'Kategorija 1'
        },
        {
          description: 'Neka kategorija 2',
          id: 2,
          name: 'Kategorija 2'
        },
        {
          description: 'Neka kategorija 3',
          id: 3,
          name: 'Kategorija 3'
        }
      ]
    };

    service.getAllPages(3, 1).subscribe(data => {
      categoryPage = data;
    });

    const req = httpMock.expectOne(`${environment.api_url}categories/by-page?size=3&page=1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCategory);

    tick();

    expect(categoryPage.totalElements).toBe(10);
    expect(categoryPage.content.length).toBe(3);

    expect(categoryPage.content[0].description).toEqual('Neka kategorija 1');
    expect(categoryPage.content[0].id).toBe(1);
    expect(categoryPage.content[0].name).toEqual('Kategorija 1');

    expect(categoryPage.content[1].description).toEqual('Neka kategorija 2');
    expect(categoryPage.content[1].id).toBe(2);
    expect(categoryPage.content[1].name).toEqual('Kategorija 2');

    expect(categoryPage.content[2].description).toEqual('Neka kategorija 3');
    expect(categoryPage.content[2].id).toBe(3);
    expect(categoryPage.content[2].name).toEqual('Kategorija 3');

  }));

  it('get() should return category', fakeAsync(() => {
    let category: Category;

    const mockCategory: Category = {
      description: 'Neka kategorija 1',
      id: 1,
      name: 'Kategorija 1'
    };

    service.get(1).subscribe(data => {
      category = data;
    });

    const req = httpMock.expectOne(`${environment.api_url}categories/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCategory);

    tick();

    expect(category.description).toEqual('Neka kategorija 1');
    expect(category.name).toEqual('Kategorija 1');
    expect(category.id).toBe(1);
  }));

  it('post() should return created category', fakeAsync(() => {
    const categoryDTO: Category = {
      description: 'Neka kategorija RNG',
      name: 'RNG'
    };

    let createdCategory: Category;

    const mockCategory: Category = {
      description: 'Neka kategorija RNG',
      id: 10,
      name: 'RNG'
    };

    service.post(categoryDTO).subscribe(data => {
      createdCategory = data;
    });


    const req = httpMock.expectOne(`${environment.api_url}categories`);
    expect(req.request.method).toBe('POST');
    req.flush(mockCategory);

    tick();

    expect(createdCategory.description).toEqual('Neka kategorija RNG');
    expect(createdCategory.name).toEqual('RNG');
    expect(createdCategory.id).toBe(10);

  }));

  it('put() should return updated category', fakeAsync(() => {
    const categoryDTO: Category = {
      description: 'Neka kategorija RNG',
      id: 10,
      name: 'RNG'
    };

    let updatedCategory: Category;

    const mockCategory: Category = {
      description: 'Neka kategorija RNG',
      id: 10,
      name: 'RNG'
    };

    service.put(10, categoryDTO).subscribe(data => {
      updatedCategory = data;
    });


    const req = httpMock.expectOne(`${environment.api_url}categories/10`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockCategory);

    tick();

    expect(updatedCategory.description).toEqual('Neka kategorija RNG');
    expect(updatedCategory.name).toEqual('RNG');
    expect(updatedCategory.id).toBe(10);
  }));

  it('delete() should return true', fakeAsync(() => {
    let response: boolean;

    service.delete(3).subscribe(res => {
      response = (res === 'true');
    });


    const req = httpMock.expectOne(`${environment.api_url}categories/3`);
    expect(req.request.method).toBe('DELETE');
    req.flush('true');

    tick();

    expect(response).toBeTrue();
  }));

  it('getAllPagesByName()', fakeAsync(() => {
    let categoryPage: CategoryPage;

    const mockCategory: CategoryPage = {
      totalElements: 10,
      content: [
        {
          description: 'Neka kategorija 1',
          id: 1,
          name: 'Kategorija 1'
        },
        {
          description: 'Neka kategorija 2',
          id: 2,
          name: 'Kategorija 2'
        },
        {
          description: 'Neka kategorija 3',
          id: 3,
          name: 'Kategorija 3'
        }
      ]
    };

    service.getAllPagesByName(3, 1, 'Kate').subscribe(data => {
      categoryPage = data;
    });

    const req = httpMock.expectOne(`${environment.api_url}categories/by-page/Kate?size=3&page=1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCategory);

    tick();

    expect(categoryPage.totalElements).toBe(10);
    expect(categoryPage.content.length).toBe(3);

    expect(categoryPage.content[0].description).toEqual('Neka kategorija 1');
    expect(categoryPage.content[0].id).toBe(1);
    expect(categoryPage.content[0].name).toEqual('Kategorija 1');

    expect(categoryPage.content[1].description).toEqual('Neka kategorija 2');
    expect(categoryPage.content[1].id).toBe(2);
    expect(categoryPage.content[1].name).toEqual('Kategorija 2');

    expect(categoryPage.content[2].description).toEqual('Neka kategorija 3');
    expect(categoryPage.content[2].id).toBe(3);
    expect(categoryPage.content[2].name).toEqual('Kategorija 3');

  }));
});
