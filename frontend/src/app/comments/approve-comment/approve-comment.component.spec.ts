import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveCommentComponent } from './approve-comment.component';

describe('ApproveCommentComponent', () => {
  let component: ApproveCommentComponent;
  let fixture: ComponentFixture<ApproveCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
<<<<<<< Updated upstream
      declarations: [ ApproveCommentComponent ]
    })
    .compileComponents();
=======
      imports: [NgxPaginationModule],
      declarations: [ ApproveCommentComponent ],
      providers: [
        { provide: CommentService, useValue: commentServiceMocked },
        { provide: Snackbar, useValue: snackBarMocked }
      ]
    });
>>>>>>> Stashed changes
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

<<<<<<< Updated upstream
  it('should create', () => {
    expect(component).toBeTruthy();
  });
=======
  it('should fetch all not approved comments on init', fakeAsync(() => {
    TestBed.compileComponents();
    fixture = TestBed.createComponent(ApproveCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    commentService = TestBed.inject(CommentService);
    snackBar = TestBed.inject(Snackbar);
    component.ngOnInit();

    expect(commentService.getNotApprovedComments).toHaveBeenCalledWith(5, 0);

    tick();

    expect(component.comments.totalElements).toEqual(2);

    expect(component.comments.content[0].id).toEqual(1);
    expect(component.comments.content[0].dateTime).toEqual(12345678);
    expect(component.comments.content[0].authorUsername).toEqual('jelenac');
    expect(component.comments.content[0].culturalOfferName).toEqual('Manastir 1');
    expect(component.comments.content[0].text).toEqual('Tekst komentara 1.');
    expect(component.comments.content[0].imageUrl).toEqual('');

    expect(component.comments.content[1].id).toEqual(2);
    expect(component.comments.content[1].dateTime).toEqual(12345679);
    expect(component.comments.content[1].authorUsername).toEqual('jelenac');
    expect(component.comments.content[1].culturalOfferName).toEqual('Manastir 1');
    expect(component.comments.content[1].text).toEqual('Tekst komentara 2.');
    expect(component.comments.content[1].imageUrl).toEqual('');

    const commentElements: DebugElement[] = fixture.debugElement.queryAll(By.css('app-comment'));
    expect(commentElements.length).toBe(2);
  }));

  it('handlePageChange', fakeAsync(() => {
    TestBed.compileComponents();
    fixture = TestBed.createComponent(ApproveCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    commentService = TestBed.inject(CommentService);
    snackBar = TestBed.inject(Snackbar);
    component.handlePageChange(2);

    expect(component.page).toEqual(2);
    expect(commentService.getNotApprovedComments).toHaveBeenCalledWith(5, 1);

    tick();

    expect(component.comments.totalElements).toEqual(2);

    expect(component.comments.content[0].id).toEqual(1);
    expect(component.comments.content[0].dateTime).toEqual(12345678);
    expect(component.comments.content[0].authorUsername).toEqual('jelenac');
    expect(component.comments.content[0].culturalOfferName).toEqual('Manastir 1');
    expect(component.comments.content[0].text).toEqual('Tekst komentara 1.');
    expect(component.comments.content[0].imageUrl).toEqual('');

    expect(component.comments.content[1].id).toEqual(2);
    expect(component.comments.content[1].dateTime).toEqual(12345679);
    expect(component.comments.content[1].authorUsername).toEqual('jelenac');
    expect(component.comments.content[1].culturalOfferName).toEqual('Manastir 1');
    expect(component.comments.content[1].text).toEqual('Tekst komentara 2.');
    expect(component.comments.content[1].imageUrl).toEqual('');

    const commentElements: DebugElement[] = fixture.debugElement.queryAll(By.css('app-comment'));
    expect(commentElements.length).toBe(2);
  }));

  it('should return comment successfully approved when comment has been approved', fakeAsync(() => {
    TestBed.compileComponents();
    fixture = TestBed.createComponent(ApproveCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    commentService = TestBed.inject(CommentService);
    snackBar = TestBed.inject(Snackbar);
    const c: Comment = {
      id: 11,
      dateTime: 12345678,
      authorUsername: 'jelenac',
      culturalOfferName: 'Manastir 1',
      text: 'Komentar 11',
      imageUrl: ''
    };
    component.approve(c, true);

    expect(commentService.approve).toHaveBeenCalledWith(c, true);

    tick();

    expect(snackBar.success).toHaveBeenCalledWith('Comment successfully approved.');
    expect(commentService.getNotApprovedComments).toHaveBeenCalled();
  }));

  it('should return comment successfully declined when comment has been declined', fakeAsync(() => {
    const commentServiceMocked2 = {
      getNotApprovedComments: jasmine.createSpy('getNotApprovedComments').and.returnValue(of({})),
      approve: jasmine.createSpy('approve').and.returnValue(of('Comment successfully declined.'))
    };
    TestBed.overrideProvider(CommentService, {useValue: commentServiceMocked2});
    TestBed.compileComponents();
    fixture = TestBed.createComponent(ApproveCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    commentService = TestBed.inject(CommentService);
    snackBar = TestBed.inject(Snackbar);
    const c: Comment = {
      id: 11,
      dateTime: 12345678,
      authorUsername: 'jelenac',
      culturalOfferName: 'Manastir 1',
      text: 'Komentar 11',
      imageUrl: ''
    };
    component.approve(c, false);

    expect(commentService.approve).toHaveBeenCalledWith(c, false);

    tick();

    expect(snackBar.success).toHaveBeenCalledWith('Comment successfully declined.');
    expect(commentService.getNotApprovedComments).toHaveBeenCalled();
  }));

>>>>>>> Stashed changes
});
