import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCommentComponent } from './add-comment.component';

describe('AddCommentComponent', () => {
  let component: AddCommentComponent;
  let fixture: ComponentFixture<AddCommentComponent>;

  beforeEach(async () => {
<<<<<<< Updated upstream
=======
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
>>>>>>> Stashed changes
    await TestBed.configureTestingModule({
      declarations: [ AddCommentComponent ]
    })
    .compileComponents();
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
  }));

>>>>>>> Stashed changes
});
