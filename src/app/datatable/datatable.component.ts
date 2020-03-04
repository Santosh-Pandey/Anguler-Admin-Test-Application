import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from '../session.service';
import { environment } from '../../environments/environment';
import * as $ from 'jquery';
import 'datatables.net';
import { DataTablesModule } from 'angular-datatables';



@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css']
})
export class DatatableComponent implements OnInit {
  apiUrl: string;
  notes: any;
  mynotes: any;
  dtOptions: DataTables.Settings = {};
  

  constructor(private httpClient: HttpClient, private route: ActivatedRoute, private router: Router, private sess: SessionService) { }

  ngOnInit(): void {
    // this.notes = [];
    this.sess.checkLogin();
    this.getNote();

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };

  }


  getNote() {
    this.apiUrl = environment.nodeAPIUrl;
    return this.httpClient.get<string>(this.apiUrl + 'allnotes')
            .subscribe(response => {
              console.log(response);
             // let formattedResult= JSON.stringify(response, null, 2);
              this.notes = response;

              const arr = [];
              for (const obj of this.notes.data) {
                // console.log(obj);
                arr.push({
                  content: obj.content,
                  title: obj.title,
                  author_first_name: obj.author_first_name,
                  author_last_name: obj.author_last_name,
                  language: obj.other_info.language
                });
                this.mynotes = arr;
              }

            });

  }

}
