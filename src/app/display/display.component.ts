import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from '../session.service';
import { environment } from '../../environments/environment';
import { AngularCsv } from 'angular7-csv/dist/Angular-csv'

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {

  notes: any;
  config: any;
  apiUrl: any;

  csvOptions = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: true,
    showTitle: true,
    // title: 'Your Holiday List :',
    useBom: true,
    noDownload: false,
    headers: ['Content', 'Title', 'First Name', 'Last Name', 'Language']
  };

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

  downloadCSV() {
    const arr = [];
    for (const obj of this.notes.message) {
      // console.log(obj);
      arr.push({
        content: obj.content,
        title: obj.title,
        author_first_name: obj.author_first_name,
        author_last_namentent: obj.author_last_namentent,
        language: obj.other_info.language
      });

    }
    console.log(arr);

    // tslint:disable-next-line: no-unused-expression
    new AngularCsv(arr, 'TestNoteData', this.csvOptions);
  }

}
