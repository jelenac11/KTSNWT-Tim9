import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/core/models/response/category.model';
import { NewsPage } from 'src/app/core/models/response/news-page.model';
import { CategoryService } from 'src/app/core/services/category.service';
import { CulturalOfferService } from 'src/app/core/services/cultural-offer.service';
import { ImageService } from 'src/app/core/services/image.service';
import { NewsService } from 'src/app/core/services/news.service';
import { UserService } from 'src/app/core/services/user.service';
import { Snackbar } from 'src/app/shared/snackbars/snackbar/snackbar';

@Component({
  selector: 'app-subscried-news',
  templateUrl: './subscried-news.component.html',
  styleUrls: ['./subscried-news.component.scss']
})
export class SubscriedNewsComponent implements OnInit {
  page = 1;

  size = 4;

  news: NewsPage;

  culturalOffer = new Map();

  userID;

  categories = [];

  currentCategory;

  images = [];
  constructor(
    private newsService: NewsService,
    private coService: CulturalOfferService,
    private imageService: ImageService,
    private userService: UserService,
    private categoryService: CategoryService,
    private snackBar: Snackbar,
    ) { }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(user => {
      this.userID = user.id;
      this.getAllNews();
    });
  }

  changeTab($event: any): void {
    this.page = 1;
    this.currentCategory = $event.index;
    if (this.currentCategory === 0){
      this.getAllNews();
    }
    else {
      this.getNews(this.categories[this.currentCategory - 1].id);
    }
  }

  getAllNews(): void{
    /*this.newsService.getSubscribedNews(this.size, this.page - 1, this.userID).subscribe(news => {
      console.log(news);
      this.images = [];
      this.getImages(news);
      this.news = news;
      for (const item of news.content){
        this.culturalOffer = new Map();
        this.coService.get(item.culturalOfferID).
        subscribe(co => {
          this.culturalOffer.set(item.culturalOfferID, co);
          this.checkCategory(co.category);
        });
      }
    });*/
  }

  checkCategory(newCategory: Category): void{
    // tslint:disable-next-line:prefer-for-of
    for (let index = 0; index < this.categories.length; index++) {
      const category = this.categories[index];
      if (category.id === newCategory.id){
        return;
      }
    }
    this.categories.push(newCategory);
  }

  getNews(categoryId: number): void{
    /*this.newsService.getAllByCategoryId(this.size, this.page - 1, this.userID, categoryId + '').subscribe(news => {
      console.log(news);
      this.images = [];
      this.getImages(news);
      this.news = news;
      for (const item of news.content){
        this.culturalOffer = new Map();
        this.coService.get(item.culturalOfferID).
        subscribe(co => this.culturalOffer.set(item.culturalOfferID, co));
      }
    });*/
  }

  handlePageChange(event: any): void {
    this.page = event;
    if (this.currentCategory){
      this.getNews(this.currentCategory);
    }
    else{
      this.getAllNews();
    }
  }

  getDate(time: number): Date {
    return new Date(time);
  }

  getImageSrc(i: number, j: number): string{
    return this.images[i][j];
  }

  getTitle(ID: any): string{
    if (this.culturalOffer.has(ID)){
      return this.culturalOffer.get(ID).name;
    }
    return '';
  }

  getImages(news: NewsPage): void {
    for (let index = 0; index < news.content.length; index++) {
      const item = news.content[index];
      this.images.push([]);
      for (const url of item.images) {
        this.imageService.get(url).subscribe(res => {
          this.images[index].push(res);
          }
        );
      }
    }
  }
}
