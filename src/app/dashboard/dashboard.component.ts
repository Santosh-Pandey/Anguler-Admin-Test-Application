import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { SessionService } from '../session.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  token: any;
  constructor(private router: Router, private sess: SessionService) { }

  ngOnInit(): void {
    this.sess.checkLogin();
  }

}
