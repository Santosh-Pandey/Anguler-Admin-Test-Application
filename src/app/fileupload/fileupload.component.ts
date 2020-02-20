import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";
import { SessionService } from '../session.service';

@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.css']
})
export class FileuploadComponent implements OnInit {

  isResponse = 0;
  isError = 0;
  isMessage = '';
  submitted = false;

  myForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });

  constructor(
                private formBuilder: FormBuilder, 
                private http: HttpClient, 
                private router: Router, 
                private sess: SessionService
                ) { }

  get f() {
    return this.myForm.controls;
  }

  onFileChange(event) {
  
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.myForm.patchValue({
        fileSource: file
      });
    }
  }


  ngOnInit(): void {
    // Check User Login
    this.sess.checkLogin()
  }

  submit(){

    if (this.myForm.invalid) {
      return;
    }
    // tslint:disable-next-line: max-line-length
    // In Angular 2+, it is very important to leave the Content-Type empty. If you set the 'Content-Type' to 'multipart/form-data' the upload will not work !
    const config = {
      headers: {
          'content-type': ''
      }
    };

    const formData = new FormData();
    formData.append('myFile', this.myForm.get('fileSource').value);

    this.http.post<any>('http://localhost:3001/uploadfile', formData)
      .subscribe(res => {
        console.log(res);
        if(res.status == 1){
          this.isResponse = 1;
          this.isMessage = res.message;
        }else{
          this.isError = 1;
          this.isMessage = res.message;
        }
      });
  }






  private newMethod(): string | (string | number)[] {
    return 'fileSource';
  }
}
