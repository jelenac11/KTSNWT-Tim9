import { Component, Input, OnInit } from '@angular/core';
import { Lightbox } from 'ngx-lightbox';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.scss']
})
export class ImageModalComponent implements OnInit {

  @Input()
  imageURL!: string;

  constructor(
    private lightbox: Lightbox
  ) { }

  ngOnInit(): void {
  }

  open(): void {
    this.lightbox.open([{ src: this.imageURL, thumb: '' }], 0);
  }

  close(): void {
    this.lightbox.close();
  }
}
