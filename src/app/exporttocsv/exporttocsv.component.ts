import { Component, OnInit } from '@angular/core';
import { AngularCsv } from 'angular7-csv/dist/Angular-csv';

import { SessionService } from '../session.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-exporttocsv',
  templateUrl: './exporttocsv.component.html',
  styleUrls: ['./exporttocsv.component.css']
})
export class ExporttocsvComponent implements OnInit {

  apiUrl: string;
  notes: any;

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

  constructor(private sess: SessionService, private httpClient: HttpClient) { }

  ngOnInit(): void {
    // Check User Login
    this.sess.checkLogin();
    this.getNote();

  }

  getNote() {
    this.apiUrl = environment.nodeAPIUrl;
    return this.httpClient.get<string>(this.apiUrl + 'allnotes')
      .subscribe(response => {
        // console.log(response);
        this.notes = response;
      });
  }

  downloadCSV() {
    const arr = [];
    for (const obj of this.notes.data) {
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
