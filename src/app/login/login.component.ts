import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { SessionService } from '../session.service';

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

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router,  private sess: SessionService) {}

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
    this.http.post<any>('http://localhost:3001/login', jsonData).subscribe(data => {
              console.log(data);
              this.iserror = data.error;
              this.errormsg = data.message;
              if(this.iserror == 0){
                localStorage.setItem('token', data.token);
                this.router.navigate(['/display']);
              }
    });
  }



}
