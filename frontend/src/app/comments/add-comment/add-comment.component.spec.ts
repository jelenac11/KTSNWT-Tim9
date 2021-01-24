import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommentService } from 'src/app/core/services/comment.service';
import { Snackbar } from 'src/app/shared/snackbars/snackbar/snackbar';
import { Observable, of, throwError } from 'rxjs';
import { AddCommentComponent } from './add-comment.component';
import { Comment } from 'src/app/core/models/response/comment.model';
import { MatDialogRef } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';

describe('AddCommentComponent', () => {
  let component: AddCommentComponent;
  let fixture: ComponentFixture<AddCommentComponent>;
  let dialogRef: MatDialogRef<AddCommentComponent>;
  let snackBar: Snackbar;
  let router: Router;
  let commentService: CommentService;

  beforeEach(async () => {
    const comment: Comment = {
      id: 11,
      dateTime: 12345678,
      authorUsername: 'jelenac',
      culturalOfferName: 'Manastir 1',
      text: 'Komentar 11',
      imageUrl: ''
    };
    const commentServiceMocked = {
      post: jasmine.createSpy('post').and.returnValue(of(comment))
    };
    const snackBarMocked = {
      success: jasmine.createSpy('success'),
      error: jasmine.createSpy('error')
    };
    const dialogMocked = {
      close: jasmine.createSpy('close')
    };
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [ AddCommentComponent ],
      providers: [
        { provide: CommentService, useValue: commentServiceMocked },
        { provide: Snackbar, useValue: snackBarMocked },
        { provide: MatDialogRef, useValue: dialogMocked },
        { provide: Router, useValue: { url: 'path/comments/1', navigate: jasmine.createSpy('navigate')}}
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    commentService = TestBed.inject(CommentService);
    router = TestBed.inject(Router);
    snackBar = TestBed.inject(Snackbar);
    dialogRef = TestBed.inject(MatDialogRef);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize', () => {
    component.ngOnInit();
    expect(component.form).toBeDefined();
    expect(component.form.invalid).toBeTruthy();
  });

  it('should close dialog', () => {
    component.close();

    expect(dialogRef.close).toHaveBeenCalledOnceWith(false);
  });

  it('setValueForImageInvalidInput', () => {
    component.setValueForImageInvalidInput();

    expect(component.uploadedImage).toEqual('');
  });

  it('should return comment must contain either text or image', () => {
    component.form.controls.text.setValue('');
    component.form.controls.fileName.setValue('');
    component.form.controls.file.setValue(null);
    component.add();

    expect(component.form.invalid).toBeTruthy();
    expect(commentService.post).toHaveBeenCalledTimes(0);
    expect(snackBar.success).toHaveBeenCalledTimes(0);

    const errorMsg = fixture.debugElement.query(By.css('#all-empty-comment')).nativeElement;
    expect(errorMsg).toBeDefined();
    expect(errorMsg.innerHTML).toContain('Comment must contain either text or image');
  });

  it('should return comment when comment with only text has been added', () => {
    component.form.controls.text.setValue('Ovo je komentar');
    component.form.controls.fileName.setValue('');
    component.form.controls.file.setValue(null);
    component.add();

    expect(component.form.valid).toBeTruthy();
    expect(commentService.post).toHaveBeenCalledTimes(1);
    expect(snackBar.success).toHaveBeenCalledOnceWith('Your comment is sent to administrator for approval');
  });

  it('should return comment when comment with only image has been added', () => {
    component.form.controls.text.setValue('');
    component.form.controls.fileName.setValue('neka_slika.jpg');
    component.form.controls.fileName.setValue({});
    component.add();

    expect(component.form.valid).toBeTruthy();
    expect(commentService.post).toHaveBeenCalledTimes(1);
    expect(snackBar.success).toHaveBeenCalledOnceWith('Your comment is sent to administrator for approval');
  });

  it('should return comment when comment with only image has been added', () => {
    component.form.controls.text.setValue('Ovo je komentar');
    component.form.controls.fileName.setValue('neka_slika.jpg');
    component.form.controls.fileName.setValue({});
    component.add();

    expect(component.form.valid).toBeTruthy();
    expect(commentService.post).toHaveBeenCalledTimes(1);
    expect(snackBar.success).toHaveBeenCalledOnceWith('Your comment is sent to administrator for approval');
  });

  it('choose file should set uploaded image to empty string', fakeAsync(() => {
    component.chooseFile({ target: { files: [] }});

    expect(component.uploadedImage).toBe('');
    expect(component.form.get('file').value).toBeDefined();
  }));

  it('choose file with files length greater than 0', () => {
    component.chooseFile({
      target: {
        files: [new Blob([], {
          type: 'image/jpeg'
        })]
      }
    });

    expect(component.form.get('file').value).toBeDefined();
    expect(component.uploadedImage).toEqual('');
  });

  it('choose file with file type different from image/* should set uploadedImage to empty string', () => {
    component.chooseFile({
      target: {
        files: [new Blob([], {
          type: 'something/jpeg'
        })]
      }
    });
    expect(component.form.get('file').value).toBeNull();
    expect(component.uploadedImage).toEqual('');
  });

});
