import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Lightbox } from 'ngx-lightbox';

import { ImageModalComponent } from './image-modal.component';

describe('ImageModalComponent', () => {
  let component: ImageModalComponent;
  let fixture: ComponentFixture<ImageModalComponent>;
  let lightbox: Lightbox;

  const lightboxMock = {
    open: jasmine.createSpy('open'),
    close: jasmine.createSpy('close')
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImageModalComponent],
      providers: [
        { provide: Lightbox, useValue: lightboxMock }
      ]
    });

    fixture = TestBed.createComponent(ImageModalComponent);
    component = fixture.componentInstance;
    lightbox = TestBed.inject(Lightbox);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('open', () => {
    component.open();
    expect(lightbox.open).toHaveBeenCalled();
  });

  it('close', () => {
    component.close();
    expect(lightbox.close).toHaveBeenCalled();
  });
});
