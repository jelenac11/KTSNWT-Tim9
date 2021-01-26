import { Component, OnInit } from '@angular/core';
import { CulturalOfferPage } from 'src/app/core/models/response/cultural-offer-page.model';
import { CulturalOfferService } from 'src/app/core/services/cultural-offer.service';
import { NewsService } from 'src/app/core/services/news.service';
import { UserService } from 'src/app/core/services/user.service';
import { Snackbar } from 'src/app/shared/snackbars/snackbar/snackbar';

@Component({
  selector: 'app-subscribed-offers',
  templateUrl: './subscribed-offers.component.html',
  styleUrls: ['./subscribed-offers.component.scss']
})
export class SubscribedOffersComponent implements OnInit {

  culturalOffers: CulturalOfferPage;
  page = 1;
  size = 10;
  userID: number;
  constructor(
    private coService: CulturalOfferService,
    private userService: UserService,
    private newsService: NewsService,
    private snackBar: Snackbar
  ) { }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe( user => {
      this.userID = user.id;
      this.getCO();
    });
  }

  getCO(): void {
    this.coService.getSubscribed(this.userID + '', this.size, this.page - 1).subscribe( data => {
      this.culturalOffers = data;
      if (data.content.length === 0){
        this.snackBar.error('You haven\'t subscribed yet');
      }
    });
  }

  unsubscribe(COID: number, name: string): void{
    this.newsService.unsubscribe(this.userID + '', COID + '').subscribe( res => {
      if (res){
        this.snackBar.success('You have unsubscribed from: ' + name);
        this.getCO();
      }
    });
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.getCO();
  }

}
