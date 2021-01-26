import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';
import { News } from 'src/app/core/models/response/news.model';
import { ImageService } from 'src/app/core/services/image.service';
import { NewsService } from 'src/app/core/services/news.service';
import { Snackbar } from 'src/app/shared/snackbars/snackbar/snackbar';

import { NewsDialogComponent } from './news-dialog.component';

describe('NewsDialogComponent', () => {
  describe('Adding', () => {
    let component: NewsDialogComponent;
    let fixture: ComponentFixture<NewsDialogComponent>;
    let snackBar: Snackbar;
    let dialogRef: MatDialogRef<NewsDialogComponent>;
    let imageService: ImageService;
    let newsService: NewsService;

    beforeEach(async () => {
      const snackBarMocked = {
        success: jasmine.createSpy('success'),
        error: jasmine.createSpy('error')
      };

      const news: News = {
        title: 'Neki title',
        content: 'Neki content',
        culturalOfferID: 2,
        date: 1611410224867,
        id: 2,
        images: [
          'neki_url_1',
          'neki_url_2'
        ]
      };

      const newsServiceMock = {
        post: jasmine.createSpy('post').and.returnValue(of(news)),
        put: jasmine.createSpy('put').and.returnValue(of(news))
      };

      const url = 'neki_url_2';
      const imageServiceMock = {
        get: jasmine.createSpy('get').and.returnValue(of('')),
        uploads: jasmine.createSpy('uploads').and.returnValue(of(url)),
        delete: jasmine.createSpy('delete').and.returnValue(of('OK'))
      };

      const dialogRefMock = {
        close: jasmine.createSpy('close')
      };
      TestBed.configureTestingModule({
        imports: [FormsModule, ReactiveFormsModule],
        declarations: [ NewsDialogComponent ],
        providers: [
          { provide: Snackbar, useValue: snackBarMocked},
          { provide: ImageService, useValue: imageServiceMock},
          { provide: NewsService, useValue: newsServiceMock},
          { provide: MatDialogRef, useValue: dialogRefMock},
          { provide: MAT_DIALOG_DATA, useValue: '3'},
        ]
      });

      fixture = TestBed.createComponent(NewsDialogComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      newsService = TestBed.inject(NewsService);
      snackBar = TestBed.inject(Snackbar);
      imageService = TestBed.inject(ImageService);
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

    it('upload button', () => {
      component.ngOnInit();
      component.onFileChange({ target: { files: [
        new File([], 'name1'),
        new File([], 'name2')
      ] }});
      fixture.detectChanges();
      expect(component.images.length).toBe(2);
    });

    it('should be closed on close button', () => {
      component.ngOnInit();
      component.close();
      fixture.detectChanges();
      expect(dialogRef.close).toHaveBeenCalledTimes(1);
    });

    it('submit without news and valid form should create news', () => {
      component.ngOnInit();
      component.form.patchValue({
        content: 'Neki content',
        title: 'Neki title'
      });
      component.images = [ new File([], 'RNG')];
      component.submit();
      fixture.detectChanges();

      expect(newsService.post).toHaveBeenCalled();
      expect(imageService.uploads).toHaveBeenCalledTimes(1);
      expect(snackBar.success).toHaveBeenCalledWith('News added successfully');

    });

    it('submit without news and invalid form should fail', () => {
      component.ngOnInit();
      component.submit();
      fixture.detectChanges();

      expect(newsService.post).toHaveBeenCalledTimes(0);
      expect(imageService.uploads).toHaveBeenCalledTimes(0);

    });
  });
  describe('Update', () => {

    let component: NewsDialogComponent;
    let fixture: ComponentFixture<NewsDialogComponent>;
    let snackBar: Snackbar;
    let dialogRef: MatDialogRef<NewsDialogComponent>;
    let imageService: ImageService;
    let newsService: NewsService;

    beforeEach(async () => {
      const snackBarMocked = {
        success: jasmine.createSpy('success'),
        error: jasmine.createSpy('error')
      };

      const news: News = {
        title: 'Neki title',
        content: 'Neki content',
        culturalOfferID: 2,
        date: 1611410224867,
        id: 2,
        images: [
          'neki_url_1',
          'neki_url_2'
        ]
      };

      const newsServiceMock = {
        post: jasmine.createSpy('post').and.returnValue(of(news)),
        put: jasmine.createSpy('put').and.returnValue(of(news))
      };

      const url = 'neki_url_2';
      const imageServiceMock = {
        get: jasmine.createSpy('get').and.returnValue(of('')),
        uploads: jasmine.createSpy('uploads').and.returnValue(of(url)),
        delete: jasmine.createSpy('delete').and.returnValue(of('OK'))
      };

      const dialogRefMock = {
        close: jasmine.createSpy('close')
      };
      TestBed.configureTestingModule({
        imports: [FormsModule, ReactiveFormsModule],
        declarations: [ NewsDialogComponent ],
        providers: [
          { provide: Snackbar, useValue: snackBarMocked},
          { provide: ImageService, useValue: imageServiceMock},
          { provide: NewsService, useValue: newsServiceMock},
          { provide: MatDialogRef, useValue: dialogRefMock},
          { provide: MAT_DIALOG_DATA, useValue: news},
        ]
      });

      fixture = TestBed.createComponent(NewsDialogComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      newsService = TestBed.inject(NewsService);
      snackBar = TestBed.inject(Snackbar);
      imageService = TestBed.inject(ImageService);
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
      expect(imageService.get).toHaveBeenCalled();
    });

    it('upload button', () => {
      component.ngOnInit();
      component.onFileChange({ target: { files: [
        new File([], 'name1'),
        new File([], 'name2')
      ] }});
      fixture.detectChanges();
      expect(component.images.length).toEqual(2);
    });

    it('submit with news and valid form should update news', () => {
      component.ngOnInit();
      component.images = [new File([], 'name')];
      component.submit();
      fixture.detectChanges();
      expect(newsService.put).toHaveBeenCalled();
      expect(imageService.uploads).toHaveBeenCalledTimes(1);
      expect(snackBar.success).toHaveBeenCalledWith('News updated successfully');

    });

    it('submit with news and valid form without changing image should update news', () => {
      component.ngOnInit();
      component.form.patchValue({
        title: 'Neki title',
        content: 'New content'
      });
      component.submit();
      fixture.detectChanges();
      expect(newsService.put).toHaveBeenCalled();
      expect(imageService.uploads).toHaveBeenCalledTimes(0);
      expect(snackBar.success).toHaveBeenCalledWith('News updated successfully');

    });


    it('submit with news and invalid form should fail', () => {
      component.ngOnInit();
      component.form.patchValue({
        content: ''
      });
      component.submit();
      fixture.detectChanges();
      expect(newsService.put).toHaveBeenCalledTimes(0);
      expect(imageService.uploads).toHaveBeenCalledTimes(0);
    });
  });
});
