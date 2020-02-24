import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { SessionService } from '../session.service';
import { environment } from '../../environments/environment';
import { NgFlashMessageService } from 'ng-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  iserror: any = 0;
  errormsg: any;
  apiUrl: any;

  // tslint:disable-next-line: max-line-length
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router,  private sess: SessionService, private ngFlashMessageService: NgFlashMessageService) {}

  ngOnInit(): void {

    this.sess.islogin();

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(formAllData: any) {
    this.submitted = true;
    if (this.loginForm.invalid) {
        return;
    }

    console.log(formAllData);
    let uname = formAllData.username;
    let pwd = formAllData.password;

    const obj = {
      username: uname,
      password: pwd
    };

    this.postData(obj);

  }

  postData(jsonData: any){
    this.apiUrl = environment.nodeAPIUrl;
    this.http.post<any>(this.apiUrl + 'login', jsonData).subscribe(data => {
              console.log(data);
              this.iserror = data.error;
              this.errormsg = data.message;

              this.ngFlashMessageService.showFlashMessage({
                // Array of messages each will be displayed in new line
                messages: ["Yah! i'm alive"], 
                // Whether the flash can be dismissed by the user defaults to false
                dismissible: true, 
                // Time after which the flash disappears defaults to 2000ms
                timeout: false,
                // Type of flash message, it defaults to info and success, warning, danger types can also be used
                type: 'danger'
              });




              if(this.iserror == 0){
                localStorage.setItem('token', data.token);
                this.router.navigate(['/dashboard']);
              }
    });
  }



}
