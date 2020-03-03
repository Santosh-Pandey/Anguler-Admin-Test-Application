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
            });


    /* this.httpClient.get(this.apiUrl + 'allnotes').subscribe((resp: Response) => {
              let formattedResult= JSON.stringify(resp, null, 2);
              console.log(formattedResult);
              this.notes = formattedResult;
    });*/

  }

}
