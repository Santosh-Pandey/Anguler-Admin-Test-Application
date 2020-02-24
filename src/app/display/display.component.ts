import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from '../session.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {

  notes: any;
  config: any;
  apiUrl: any;

  constructor(private httpClient: HttpClient, private route: ActivatedRoute, private router: Router, private sess: SessionService) { 

    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: 1
    };

  }

  ngOnInit() {
    this.sess.checkLogin();
    this.getNote(1);

  }
  getNote(page: any = 1){
    this.apiUrl = environment.nodeAPIUrl;
    return this.httpClient.get<any>(this.apiUrl + 'notes?pageNo=' + page + '&size=' + this.config.itemsPerPage)
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
