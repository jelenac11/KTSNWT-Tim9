import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-more',
  templateUrl: './more.component.html',
  styleUrls: ['./more.component.scss']
})
export class MoreComponent implements OnInit {

  @Input()
  path!: any[];

  constructor() { }

  ngOnInit(): void {
  }

}
