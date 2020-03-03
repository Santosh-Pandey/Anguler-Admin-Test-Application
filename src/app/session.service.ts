import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private router: Router) { }

  validtoken: any;

  public checkLogin() {
    this.validtoken = localStorage.getItem('token');

    // tslint:disable-next-line: triple-equals
    if (this.validtoken == '' || this.validtoken === null) {
      this.router.navigate(['/login']);
    }
  }

  public logOut() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  public islogin() {
    this.validtoken = localStorage.getItem('token');
    // alert(this.validtoken);

    if (this.validtoken != null) {
      this.router.navigate(['/dashboard']);
    }
  }


}
