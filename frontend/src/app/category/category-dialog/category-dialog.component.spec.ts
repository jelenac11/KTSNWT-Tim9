import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';
import { Category } from 'src/app/core/models/response/category.model';
import { CategoryService } from 'src/app/core/services/category.service';
import { Snackbar } from 'src/app/shared/snackbars/snackbar/snackbar';

import { CategoryDialogComponent } from './category-dialog.component';

describe('CategoryDialogComponent', () => {
  let component: CategoryDialogComponent;
  let fixture: ComponentFixture<CategoryDialogComponent>;
  let snackBar: Snackbar;
  let dialogRef: MatDialogRef<CategoryDialogComponent>;
  let categoryService: CategoryService;

  const category: Category = {
    description: 'Neka kategorija 1',
    id: 1,
    name: 'Kategorija 1'
  };

  describe('Adding', () => {
    beforeEach(() => {
      const snackBarMocked = {
        success: jasmine.createSpy('success'),
        error: jasmine.createSpy('error')
      };
      const categoryServiceMock = {
        post: jasmine.createSpy('post').and.returnValue(of(category)),
        put: jasmine.createSpy('put').and.returnValue(of(category))
      };
      const dialogRefMock = {
        close: jasmine.createSpy('close')
      };
      TestBed.configureTestingModule({
        imports: [FormsModule, ReactiveFormsModule],
        declarations: [ CategoryDialogComponent ],
        providers: [
          { provide: Snackbar, useValue: snackBarMocked},
          { provide: CategoryService, useValue: categoryServiceMock},
          { provide: MatDialogRef, useValue: dialogRefMock},
          { provide: MAT_DIALOG_DATA, useValue: null},
        ]
      });

      fixture = TestBed.createComponent(CategoryDialogComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      categoryService = TestBed.inject(CategoryService);
      snackBar = TestBed.inject(Snackbar);
      dialogRef = TestBed.inject(MatDialogRef);
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('init', () => {
      component.ngOnInit();
      fixture.detectChanges();
      expect(component.form).toBeDefined();
      expect(component.form.invalid).toBeTruthy();
    });

    it('should be closed on close button', () => {
      component.ngOnInit();
      component.close();
      fixture.detectChanges();
      expect(dialogRef.close).toHaveBeenCalledTimes(1);
    });

    it('submit without category and valid form should create category', () => {
      component.ngOnInit();
      component.form.patchValue({
        name: 'Kategorija 1',
        description: 'Neka kategorija 1'
      });
      component.submit();
      fixture.detectChanges();
      expect(categoryService.post).toHaveBeenCalled();
      expect(snackBar.success).toHaveBeenCalledWith('Category added successfully');

    });

    it('submit without category and invalid form should fail', () => {
      component.ngOnInit();
      fixture.detectChanges();
      component.submit();
      fixture.detectChanges();
      expect(categoryService.post).toHaveBeenCalledTimes(0);
      expect(component.form.invalid).toBeTruthy();
    });
  });

  describe('Update', () => {
    beforeEach(() => {
      const snackBarMocked = {
        success: jasmine.createSpy('success'),
        error: jasmine.createSpy('error')
      };
      const categoryServiceMock = {
        post: jasmine.createSpy('post').and.returnValue(of(category)),
        put: jasmine.createSpy('put').and.returnValue(of(category))
      };
      const dialogRefMock = {
        close: jasmine.createSpy('close')
      };
      TestBed.configureTestingModule({
        imports: [FormsModule, ReactiveFormsModule],
        declarations: [ CategoryDialogComponent ],
        providers: [
          { provide: Snackbar, useValue: snackBarMocked},
          { provide: CategoryService, useValue: categoryServiceMock},
          { provide: MatDialogRef, useValue: dialogRefMock},
          { provide: MAT_DIALOG_DATA, useValue: category},
        ]
      });

      fixture = TestBed.createComponent(CategoryDialogComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      categoryService = TestBed.inject(CategoryService);
      snackBar = TestBed.inject(Snackbar);
      dialogRef = TestBed.inject(MatDialogRef);
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('init', () => {
      component.ngOnInit();
      fixture.detectChanges();
      expect(component.form).toBeDefined();
      expect(component.form.valid).toBeTruthy();
    });

    it('submit with category and valid form should update category', () => {
      component.ngOnInit();
      component.submit();
      fixture.detectChanges();
      expect(categoryService.put).toHaveBeenCalled();
      expect(snackBar.success).toHaveBeenCalledWith('Category updated successfully');

    });

    it('submit with category and valid form changed should update category', () => {
      component.ngOnInit();
      component.form.patchValue({
        name: 'Nova kategorija',
        description: 'Neka nova kategorija'
      });
      component.submit();
      fixture.detectChanges();

      expect(categoryService.put).toHaveBeenCalled();
      expect(snackBar.success).toHaveBeenCalledWith('Category updated successfully');

    });

    it('submit with category and invalid form should fail', () => {
      component.ngOnInit();
      fixture.detectChanges();
      component.form.patchValue({
        name: ''
      });
      fixture.detectChanges();
      component.submit();

      expect(categoryService.put).toHaveBeenCalledTimes(0);
      expect(component.form.invalid).toBeTruthy();
    });
  });
});
