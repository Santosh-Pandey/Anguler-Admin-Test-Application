import { DayTable } from '@fullcalendar/core';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from '../session.service';
import { environment } from '../../environments/environment';
import * as $ from 'jquery';
// import 'datatables.net';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css']
})
export class DatatableComponent implements OnInit {
  apiUrl: string;
  notes: any;
  mynotes: any;
 // dtOptions: DataTables.Settings = {};
  dtOptions: any = {};

  constructor(private httpClient: HttpClient, private route: ActivatedRoute, private router: Router, private sess: SessionService) { }

  ngOnInit(): void {
    // this.notes = [];
    this.sess.checkLogin();
    this.getNote();

    this.dtOptions = {
      paging: true,
      pagingType: 'full_numbers',
      responsive: true,
      pageLength: 10,
      lengthChange: true,
      processing: true,
      ordering: true,
      info: true,
      dom: "<'row'<'col-sm-3'l><'col-sm-6 text-center'B><'col-sm-3'f>>" + "<'row'<'col-sm-12'tr>>" + "<'row'<'col-sm-5'i><'col-sm-7'p>>",
      buttons: [
                { extend: 'copy',  className: 'btn btn-outline-dark', text: '<i class="far fa-copy"> Copy</i>' },
                { extend: 'csv',   className: 'btn btn-outline-dark', text: '<i class="fas fa-file-csv"> CSV</i>' },
                { extend: 'excel', className: 'btn btn-outline-dark', text: '<i class="fas fa-file-excel"> Excel</i>' },
                { extend: 'pdf',   className: 'btn btn-outline-dark', text: '<i class="fas fa-file-pdf"> PDF</i>' },
                { extend: 'print', className: 'btn btn-outline-dark', text: '<i class="far fas fa-print"> Print</i>' }
              ]
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
                  id: obj._id,
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
