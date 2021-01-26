import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CulturalOffer } from 'src/app/core/models/response/cultural-offer.model';
import { News } from 'src/app/core/models/response/news.model';
import { CulturalOfferService } from 'src/app/core/services/cultural-offer.service';
import { ImageService } from 'src/app/core/services/image.service';
import { NewsService } from 'src/app/core/services/news.service';

@Component({
  selector: 'app-news-view',
  templateUrl: './news-view.component.html',
  styleUrls: ['./news-view.component.scss']
})
export class NewsViewComponent implements OnInit {

  news: News;
  newsId: string;
  culturalOffer: CulturalOffer;
  images: string[] = [];
  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService,
    private imageService: ImageService,
    private coService: CulturalOfferService,
    ) { }

  ngOnInit(): void {
    this.newsId = this.route.snapshot.paramMap.get('id');
    this.getNews();
  }

  getNews(): void {
    this.newsService.get(+this.newsId).subscribe((data) => {
      this.news = data;
      this.coService.get(data.culturalOfferID + '').subscribe((co) => {
        this.culturalOffer = co;
      });
      this.getImages();
    });
  }


  getDate(time: number): Date {
    return new Date(time);
  }

  getImages(): void {
    this.images = [];
    for (const url of this.news.images) {
      this.imageService.get(url).subscribe(res => {
        this.images.push(res);
        }, () => {
          this.images.push('');
        }
      );
    }
  }
}
