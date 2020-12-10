import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  @Input()
  path!: any[];

  constructor() { }

  ngOnInit(): void {
  }

}
