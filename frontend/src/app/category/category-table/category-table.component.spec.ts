import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { NgxPaginationModule } from 'ngx-pagination';
import { of } from 'rxjs';
import { CategoryPage } from 'src/app/core/models/response/category-page.model';
import { CategoryService } from 'src/app/core/services/category.service';
import { Snackbar } from 'src/app/shared/snackbars/snackbar/snackbar';

import { CategoryTableComponent } from './category-table.component';

describe('CategoryTableComponent', () => {
  let component: CategoryTableComponent;
  let fixture: ComponentFixture<CategoryTableComponent>;
  let categoryService: CategoryService;
  let snackBar: Snackbar;
  let dialog: MatDialog;

  beforeEach(() => {
    const snackBarMocked = {
      success: jasmine.createSpy('success'),
      error: jasmine.createSpy('error')
    };
    const mockedCategories: CategoryPage = {
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

    const categoryServiceMocked = {
      getAllPagesByName: jasmine.createSpy('getAllPagesByName').and.returnValue(of(mockedCategories)),
      delete: jasmine.createSpy('delete').and.returnValue(of(true))
    };

    TestBed.configureTestingModule({
      imports: [NgxPaginationModule],
      declarations: [CategoryTableComponent],
      providers: [
        { provide: Snackbar, useValue: snackBarMocked },
        { provide: MatDialog, useValue: { MatDialog } },
        { provide: CategoryService, useValue: categoryServiceMocked }
      ]
    });

    fixture = TestBed.createComponent(CategoryTableComponent);
    component = fixture.componentInstance;
    dialog = TestBed.inject(MatDialog);
    snackBar = TestBed.inject(Snackbar);
    categoryService = TestBed.inject(CategoryService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('load content', () => {
    component.ngOnInit();

    fixture.detectChanges();

    expect(categoryService.getAllPagesByName).toHaveBeenCalled();

    expect(component.categories.totalElements).toEqual(10);
    expect(component.categories.content.length).toEqual(3);
    expect(component.categories.content[0].description).toEqual('Neka kategorija 1');
    expect(component.categories.content[0].id).toBe(1);
    expect(component.categories.content[0].name).toEqual('Kategorija 1');

    expect(component.categories.content[1].description).toEqual('Neka kategorija 2');
    expect(component.categories.content[1].id).toBe(2);
    expect(component.categories.content[1].name).toEqual('Kategorija 2');

    expect(component.categories.content[2].description).toEqual('Neka kategorija 3');
    expect(component.categories.content[2].id).toBe(3);
    expect(component.categories.content[2].name).toEqual('Kategorija 3');
  });

  it('pageChanged', () => {
    component.handlePageChange(2);
    fixture.detectChanges();

    expect(categoryService.getAllPagesByName).toHaveBeenCalled();
    expect(component.page).toEqual(2);

    expect(component.categories.totalElements).toEqual(10);
    expect(component.categories.content.length).toEqual(3);
    expect(component.categories.content[0].description).toEqual('Neka kategorija 1');
    expect(component.categories.content[0].id).toBe(1);
    expect(component.categories.content[0].name).toEqual('Kategorija 1');

    expect(component.categories.content[1].description).toEqual('Neka kategorija 2');
    expect(component.categories.content[1].id).toBe(2);
    expect(component.categories.content[1].name).toEqual('Kategorija 2');

    expect(component.categories.content[2].description).toEqual('Neka kategorija 3');
    expect(component.categories.content[2].id).toBe(3);
    expect(component.categories.content[2].name).toEqual('Kategorija 3');
  });

  it('search changed', () => {
    component.searchChanged('Kategorija');
    fixture.detectChanges();
    expect(categoryService.getAllPagesByName).toHaveBeenCalled();
    expect(component.searchValue).toEqual('Kategorija');

    expect(component.categories.totalElements).toEqual(10);
    expect(component.categories.content.length).toEqual(3);
    expect(component.categories.content[0].description).toEqual('Neka kategorija 1');
    expect(component.categories.content[0].id).toBe(1);
    expect(component.categories.content[0].name).toEqual('Kategorija 1');

    expect(component.categories.content[1].description).toEqual('Neka kategorija 2');
    expect(component.categories.content[1].id).toBe(2);
    expect(component.categories.content[1].name).toEqual('Kategorija 2');

    expect(component.categories.content[2].description).toEqual('Neka kategorija 3');
    expect(component.categories.content[2].id).toBe(3);
    expect(component.categories.content[2].name).toEqual('Kategorija 3');
  });

  it('delete category', () => {
    component.ngOnInit();
    component.delete(2);
    fixture.detectChanges();

    expect(categoryService.delete).toHaveBeenCalled();
    expect(snackBar.success).toHaveBeenCalledWith('You have successfully deleted category!');
    expect(categoryService.getAllPagesByName).toHaveBeenCalled();
  });
});
