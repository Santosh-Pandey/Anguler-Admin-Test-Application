import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  token: any;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.token = localStorage.getItem("token");
    if(this.token == ''){
      this.router.navigate(['/login']);
    }
  }

}
