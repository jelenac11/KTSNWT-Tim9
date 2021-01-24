import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCommentComponent } from './add-comment.component';

describe('AddCommentComponent', () => {
  let component: AddCommentComponent;
  let fixture: ComponentFixture<AddCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
<<<<<<< Updated upstream
      declarations: [ AddCommentComponent ]
    })
    .compileComponents();
=======
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [ AddCommentComponent ],
      providers: [
        { provide: CommentService, useValue: commentServiceMocked },
        { provide: Snackbar, useValue: snackBarMocked },
        { provide: MatDialogRef, useValue: dialogMocked },
        { provide: Router, useValue: { url: 'path/comments/1', navigate: jasmine.createSpy('navigate')}}
      ]
    });
>>>>>>> Stashed changes
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
<<<<<<< Updated upstream
=======

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

>>>>>>> Stashed changes
});
