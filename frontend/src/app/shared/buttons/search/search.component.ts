import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchField: any;

  @Output()
  searchChanged: EventEmitter<string> = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
    this.searchField = new FormControl();
    this.searchField.valueChanges.subscribe(
      (userInput: string) => {
        this.searchChanged.emit(userInput);
      }
    )
  }

}
