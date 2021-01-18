import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { News } from 'src/app/core/models/response/news.model';
import { ImageService } from 'src/app/core/services/image.service';
import { NewsService } from 'src/app/core/services/news.service';
import { MyErrorStateMatcher } from 'src/app/shared/ErrorStateMatcher';
import { Snackbar } from 'src/app/shared/snackbars/snackbar/snackbar';

@Component({
  selector: 'app-news-dialog',
  templateUrl: './news-dialog.component.html',
  styleUrls: ['./news-dialog.component.scss']
})
export class NewsDialogComponent implements OnInit {

  form: FormGroup;
  matcher: MyErrorStateMatcher = new MyErrorStateMatcher();
  news: News = null;
  images = [];
  preview = [];
  removedImages = [];
  coid = 1;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<NewsDialogComponent>,
    private snackBar: Snackbar,
    private newsService: NewsService,
    private imageService: ImageService,
    @Inject(MAT_DIALOG_DATA) public data,
  ) { }

  ngOnInit(): void {
    if (this.data){
      this.news = this.data;
      this.images = this.news.images;
      for (const image of this.images){
        this.imageService.get(image).subscribe(res => {
          this.preview.push(res);
        });
      }
      this.form = this.fb.group({
        content: [this.news.content, Validators.required],
      });
    }
    else{
      this.news = {id: null, content: '', images: [], date: new Date().getTime()};
      this.form = this.fb.group({
        content: ['', Validators.required],
      });
    }
  }

  get f() { return this.form.controls; }

  submit(): void {
    if (this.news.id){
      this.update();
    }
    else{
      this.add();
    }
  }

  add(): void {
    if (this.form.invalid) {
      return;
    }
    this.news.content = this.form.value['content'];
    const urls = [];
    for (const image of this.images){
      if (image === this.images[this.images.length - 1]){
        this.imageService.upload(image).subscribe(url => {
          urls.push(url);
          this.news.images = urls;
          this.news.date = new Date().getTime();
          this.news.culturalOfferID = this.coid;
          this.addNews();
        },
        (err) => {
          console.log(err);
          for (const url of urls){
            this.imageService.delete(url);
          }
          return;
        });
      }
      else{
        this.imageService.upload(image).subscribe(url => {
          urls.push(url);
        },
        () => {
          for (const url of urls){
            this.imageService.delete(url);
          }
          return;
        });
      }
    }
  }

  addNews(): void{
    this.newsService.post(this.news).subscribe(data => {
      this.snackBar.success("News added successfully");
      this.dialogRef.close(true);
    },
    error => {
      if (error.status !== 200) {
        this.snackBar.error(error.error);
      }
    });
  }

  updateNews(): void{
    this.newsService.put(this.news.id, this.news).subscribe(data => {
      this.snackBar.success("News added successfully");
      this.dialogRef.close(true);
    },
    error => {
      if (error.status !== 200) {
        this.snackBar.error(error.error);
      }
    });
  }

  onFileChange(event): void {
    if (event.target.files && event.target.files[0]) {
        this.images = [];
        this.preview = [];
        for (const file of event.target.files) {
            const reader = new FileReader();

            reader.onload = (eventNew) => {
                this.preview.push(eventNew.target.result);
            };
            reader.readAsDataURL(file);
            this.images.push(file);
        }
        this.form.patchValue({
          images: this.images
        });
    }
  }


  update(): void {
    if (this.form.invalid) {
      return;
    }
    this.news.content = this.form.value['content'];
    const urls = [];
    for (const item of this.removedImages){
      console.log(typeof item.image);
      if (typeof item.image === 'string'){
        this.imageService.delete(item.image);
      }
    }
    for (const image of this.images){
      if (image === this.images[this.images.length - 1]){
        if (typeof image === 'string'){
          urls.push(...this.images.filter(img => typeof img === 'string'));
          this.news.images = urls;
          this.news.date = new Date().getTime();
          this.news.culturalOfferID = this.coid;
          this.updateNews();
        }
        else{
          this.imageService.upload(image).subscribe(url => {
            urls.push(...this.images.filter(img => typeof img === 'string'));
            urls.push(url);
            this.news.images = urls;
            this.news.date = new Date().getTime();
            this.news.culturalOfferID = this.coid;
            this.updateNews();
          },
          (err) => {
            console.log(err);
            for (const url of urls){
              this.imageService.delete(url);
            }
            return;
          });
        }
      }
      else{
        if (typeof image === 'string'){
          continue;
        }
        this.imageService.upload(image).subscribe(url => {
          urls.push(url);
        },
        () => {
          for (const url of urls){
            this.imageService.delete(url);
          }
          return;
        });
      }
    }
  }

  remove(index: number): void{
    if (this.news.id){
        this.removedImages.push({preview: this.preview[index], image: this.images[index], index});
    }
    this.preview.splice(index, 1);
    this.images.splice(index, 1);

  }

  close(): void {
    if(this.news.id){
      for (const item of this.removedImages){
        this.preview.splice(item.index, 0, item.preview);
        this.images.splice(item.index, 0, item.image);
      }
    }
    this.dialogRef.close(false);
  }

}
