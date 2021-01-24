import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpectedConditions } from 'protractor';
import { of } from 'rxjs';
import { CategoryService } from 'src/app/core/services/category.service';
import { CulturalOfferService } from 'src/app/core/services/cultural-offer.service';
import { Snackbar } from 'src/app/shared/snackbars/snackbar/snackbar';
import { CulturalOfferFormComponent } from './cultural-offer-form.component';

describe('CulturalOfferFormComponent', () => {
  let component: CulturalOfferFormComponent;
  let fixture: ComponentFixture<CulturalOfferFormComponent>;
  let categoryService: CategoryService;
  let culturalOfferService: CulturalOfferService;
  let snackBar: Snackbar;
  let route: ActivatedRoute;
  let router: Router;

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
      get: jasmine.createSpy('get').and.returnValue(of(data)),
      put: jasmine.createSpy('put').and.returnValue(of(data)),
      post: jasmine.createSpy('post').and.returnValue(of(data)),
    };

    const categoryServiceMock = {
      getAll: jasmine.createSpy('getAll').and.returnValue(of([{
        id: 1,
        name: 'Kategorija 1',
        description: 'Opis'
      }, {
        id: 2,
        name: 'Kategorija 2',
        description: 'Opis'
      }, {
        id: 3,
        name: 'Kategorija 3',
        description: 'Opis'
      }])),
    };

    const routerMock = {
      navigateByUrl: jasmine.createSpy('navigateByUrl')
    };

    const snackBarMock = {
      success: jasmine.createSpy('success'),
      error: jasmine.createSpy('error')
    };

    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule],
      declarations: [CulturalOfferFormComponent],
      providers: [
        { provide: CulturalOfferService, useValue: culturalOfferServiceMock },
        { provide: CategoryService, useValue: categoryServiceMock },
        { provide: Snackbar, useValue: snackBarMock },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: (id: string) => { '1'; } } } } },
        { provide: Router, useValue: routerMock },
      ]
    });

    fixture = TestBed.createComponent(CulturalOfferFormComponent);
    component = fixture.componentInstance;
    culturalOfferService = TestBed.inject(CulturalOfferService);
    categoryService = TestBed.inject(CategoryService);
    snackBar = TestBed.inject(Snackbar);
    route = TestBed.inject(ActivatedRoute);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch all categories', () => {
    component.ngOnInit();

    expect(categoryService.getAll).toHaveBeenCalled();
    expect(component.id).toEqual(undefined);
    expect(component.registerForm).toBeDefined();

    expect(component.categories[0].id).toEqual(1);
    expect(component.categories[0].name).toEqual('Kategorija 1');
    expect(component.categories[0].description).toEqual('Opis');

    expect(component.categories[1].id).toEqual(2);
    expect(component.categories[1].name).toEqual('Kategorija 2');
    expect(component.categories[1].description).toEqual('Opis');

    expect(component.categories[2].id).toEqual(3);
    expect(component.categories[2].name).toEqual('Kategorija 3');
    expect(component.categories[2].description).toEqual('Opis');
  });

  it('onAutocompleteSelected', () => {
    component.onAutocompleteSelected({
      geometry: {
        location: {
          lat: () => 45,
          lng: () => 30
        }
      }
    });

    expect(component.markerCoordinates.geolocation.lat).toEqual(45);
    expect(component.markerCoordinates.geolocation.lon).toEqual(30);
  });

  it('chooseFile without cultural offer id and files length equals 0', () => {
    component.ngOnInit();
    component.chooseFile({ target: { files: [] } });

    expect(component.registerForm.get('file').value).toEqual(null);
    expect(component.uploadedImage).toEqual('');
  });

  it('chooseFile with cultural offer id and files length equals 0', () => {
    component.ngOnInit();
    component.culturalOffer = { image: 'url' };
    component.id = '1';
    component.oldImage = new File([], 'name');
    component.chooseFile({ target: { files: [] } });

    expect(component.registerForm.get('file').value).toBeDefined();
    expect(component.uploadedImage).toEqual('url');
  });

  it('chooseFile without cultural offer id and files length greater than 0', () => {
    component.ngOnInit();
    component.culturalOffer = { image: 'url' };
    component.oldImage = new File([], 'name');
    component.chooseFile({
      target: {
        files: [new Blob([], {
          type: 'image/jpeg'
        })]
      }
    });

    expect(component.registerForm.get('file').value).toBeDefined();
    expect(component.uploadedImage).toEqual('');
  });

  it('chooseFile with file type different from image/*', () => {
    component.ngOnInit();
    component.culturalOffer = { image: 'url' };
    component.oldImage = new File([], 'name');
    component.chooseFile({
      target: {
        files: [new Blob([], {
          type: 'something/jpeg'
        })]
      }
    });

    expect(component.registerForm.get('file').value).toBeNull();
    expect(component.uploadedImage).toEqual('');
  });

  it('onSubmit with cultural offer id and invalid form ', () => {
    component.ngOnInit();
    component.id = '1';
    component.onSubmit();

    expect(culturalOfferService.post).toHaveBeenCalledTimes(0);
    expect(culturalOfferService.put).toHaveBeenCalledTimes(0);
  });

  it('onSubmit with cultural offer id and valid form ', () => {
    component.ngOnInit();
    component.id = '1';
    component.registerForm.patchValue({
      name: 'something',
      description: 'something',
      category: 'something',
      file: new File([], 'name'),
      location: {
        place_id: 'something',
        formatted_address: 'something',
        geometry: {
          location: {
            lat: () => 45,
            lng: () => 30
          }
        }
      }
    });
    component.onSubmit();

    expect(culturalOfferService.put).toHaveBeenCalled();
    expect(snackBar.success).toHaveBeenCalledWith('You have successfully updated cultural offer!');
    expect(router.navigateByUrl).toHaveBeenCalledWith('/cultural-offers/1');
  });

  it('onSubmit without cultural offer id and valid form ', () => {
    component.ngOnInit();
    component.registerForm.patchValue({
      name: 'something',
      description: 'something',
      category: 'something',
      file: new File([], 'name'),
      location: {
        place_id: 'something',
        formatted_address: 'something',
        geometry: {
          location: {
            lat: () => 45,
            lng: () => 30
          }
        }
      }
    });
    component.onSubmit();

    expect(culturalOfferService.post).toHaveBeenCalled();
    expect(snackBar.success).toHaveBeenCalledWith('You have successfully created cultural offer!');
    expect(router.navigateByUrl).toHaveBeenCalledWith('/cultural-offers/5');
  });
});
