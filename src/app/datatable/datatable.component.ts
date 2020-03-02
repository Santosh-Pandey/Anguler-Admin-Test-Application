import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from '../session.service';
import { environment } from '../../environments/environment';
import * as $ from 'jquery';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css']
})
export class DatatableComponent implements OnInit {
  apiUrl: string;
  notes: any;

  constructor(private httpClient: HttpClient, private route: ActivatedRoute, private router: Router, private sess: SessionService) { }

  ngOnInit(): void {
    this.sess.checkLogin();
    this.getNote();
  }


  getNote() {
    this.apiUrl = environment.nodeAPIUrl;
    return this.httpClient.get<any>(this.apiUrl + 'allnotes')
            .subscribe(response => {
              console.log(response);
              this.notes = response;
            });

  }

}
