import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NewsPage } from 'src/app/core/models/response/news-page.model';
import { JwtService } from 'src/app/core/services/jwt.service';
import { NewsService } from 'src/app/core/services/news.service';
import { News } from 'src/app/core/models/response/news.model';
import { Snackbar } from 'src/app/shared/snackbars/snackbar/snackbar';
import { CulturalOfferService } from 'src/app/core/services/cultural-offer.service';
import { ConfirmationDialogComponent } from 'src/app/shared/dialogs/confirmation-dialog/confirmation-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { NewsDialogComponent } from '../news-dialog/news-dialog.component';
import { ImageService } from 'src/app/core/services/image.service';
import { CulturalOffer } from 'src/app/core/models/response/cultural-offer.model';

@Component({
  selector: 'app-news-review',
  templateUrl: './news-review.component.html',
  styleUrls: ['./news-review.component.scss']
})
export class NewsReviewComponent implements OnInit {

  role = '';

  page = 1;

  size = 4;

  news: NewsPage;

  coid: string = null;

  culturalOffer = new Map<number, CulturalOffer>();

  images: string[][] = [];

  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService,
    private dialog: MatDialog,
    private snackBar: Snackbar,
    private jwtService: JwtService,
    private coService: CulturalOfferService,
    private imageService: ImageService,
  ) { }

  ngOnInit(): void {
    this.role = this.jwtService.getRole();
    this.coid = this.route.snapshot.paramMap.get('id');
    this.getNews();
  }

  getNews(): void{
    this.newsService.getAllByCOID(+this.coid, this.size, this.page - 1).subscribe(news => {
      if (news.content.length === 0){
        this.snackBar.error('There is no news for this cultural offer!');
      }
      news.content = news.content.sort((a, b) => a.id - b.id);
      this.images = [];
      this.getImages(news);
      this.news = news;
      for (const item of news.content){
        this.coService.get(item.culturalOfferID.toString()).
        subscribe(co => this.culturalOffer.set(item.culturalOfferID, co));
      }
    });
  }


  getImages(news: NewsPage): void {
    for (let index = 0; index < news.content.length; index++) {
      const item = news.content[index];
      this.images.push([]);
      for (const url of item.images) {
        this.imageService.get(url).subscribe(res => {
          this.images[index].push(res);
          }
        , () => {
          return;
        });
      }
    }
  }

  getImageSrc(i: number, j: number): string{
    return this.images[i][j];
  }

  getTitle(ID: number): string{
    if (this.culturalOffer.has(ID)){
      return this.culturalOffer.get(ID).name;
    }
    return '';
  }
  handlePageChange(event: number): void {
    this.page = event;
    this.getNews();
  }

  getDate(time: number): Date {
    return new Date(time);
  }

  delete(id: number): void {
    this.newsService.delete(id).subscribe((succ: string) => {
      if (this.news.content.length === 1){
        this.page--;
      }
      this.getNews();
      this.snackBar.success('You have successfully deleted news!');
    }, err => {
      this.snackBar.error('Can\'t delete this news!');
    });
  }

  addNews(): void {
    const dialogConfig: MatDialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.minHeight = '240px';
    dialogConfig.minWidth = '400px';
    dialogConfig.data = this.coid;
    const dialogRef = this.dialog.open(NewsDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.getNews();
      }
    });
  }

  updateNews(news: News): void {
    const dialogConfig: MatDialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.minHeight = '240px';
    dialogConfig.minWidth = '400px';
    dialogConfig.data = news;
    const dialogRef = this.dialog.open(NewsDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.getNews();
      }
    });
  }

  openDialog(id: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Are you sure you want to delete this news?',
        buttonText: {
          ok: 'Yes',
          cancel: 'No'
        }
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.delete(id);
      }
    });
  }
}
