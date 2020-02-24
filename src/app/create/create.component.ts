import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SessionService } from '../session.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  country: any =  ["India", "Nepal", "Srilanka", "Bhutan"];
  apiUrl: any;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private sess: SessionService) { }

  ngOnInit(): void {
    // Check User Login
    this.sess.checkLogin();

    this.registerForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      title: ['', Validators.required],
      contect_no: ['', [Validators.required]],
      description: ['', [Validators.required]],
      country: ['', [Validators.required]],
      content: ['', [Validators.required, Validators.minLength(6)]],
      language: []
  });

  }


onSubmit(formAllData: any) {
    this.submitted = true;
    // stop the process here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

    console.log(formAllData);

    let first_name = formAllData.first_name;
    let last_name = formAllData.last_name;
    let post_title = formAllData.title;
    let contect_no = formAllData.contect_no;
    let post_content = formAllData.content;
    let post_description = formAllData.description;
    let post_language = formAllData.language;
    let post_country = formAllData.country;

    const obj = {
      title: post_title,
      content: post_content,
      author_first_name: first_name,
      author_last_name: last_name,
      author_contact: contect_no,
      other_info:{
        country: post_country,
        language: post_language,
        description: post_description
      }
    };

    this.postData(obj);
}

postData(jsonData: any){
  this.apiUrl = environment.nodeAPIUrl;
  this.http.post<any>(this.apiUrl + 'notes', jsonData).subscribe(data => {
            console.log(data);
            //this.registerForm.reset();
            this.router.navigate(['/display']);
  });
}

getCountry(data:any){
  console.log(data);
}


}
