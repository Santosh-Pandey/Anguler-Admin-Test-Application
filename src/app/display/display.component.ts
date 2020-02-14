import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {

  notes: any;
  config: any;

  constructor(private httpClient: HttpClient) { 

    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: 1
    };

  }

  ngOnInit() {

    this.getNote(1);

  }
  getNote(page:any = 1){
    return this.httpClient.get<any>('http://localhost:3001/notes?pageNo='+page+'&size='+ this.config.itemsPerPage)
            .subscribe(response => {
              console.log(response);
              this.config.totalItems = response.pages * this.config.itemsPerPage;
              this.notes = response;
            });

  }

  pageChange(event) {
    this.config.currentPage = event;
    this.getNote(this.config.currentPage);
  }

}
