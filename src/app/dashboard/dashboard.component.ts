import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { SessionService } from '../session.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  token: any;
  constructor(private router: Router, private sess: SessionService, private flashMessage: FlashMessagesService) { }

  ngOnInit(): void {
    this.sess.checkLogin();
    //this.flashMessage.show('Successfully Login', { cssClass: 'alert-success', timeout: 2000 });
  }

}
