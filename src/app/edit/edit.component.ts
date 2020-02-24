import { Component, OnInit } from '@angular/core';


import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from "@angular/router";
import { SessionService } from '../session.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  note_id: any;
  note_record: any;
  apiUrl: any;

  // tslint:disable-next-line: max-line-length
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private route: ActivatedRoute, private sess: SessionService) {

    // id is defined on app.routing.module.ts
    this.note_id = this.route.snapshot.params.id;
   }

  ngOnInit(): void {

    this.sess.checkLogin();

    this.getNote();
    this.registerForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      title: ['', Validators.required],
      contect_no: ['', [Validators.required]],
      description: ['', [Validators.required]],
      content: ['', [Validators.required, Validators.minLength(2)]],
      language: [],
      country: []
  });

  }


  getNote() {
    this.apiUrl = environment.nodeAPIUrl;
    return this.http.get<any>(this.apiUrl + 'notesbyid?noteId=' + this.note_id)
            .subscribe(response => {
              console.log(response);
              this.note_record = response;
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
    /*let post_description = formAllData.description;
    let post_language = formAllData.language;
    let post_country = formAllData.country;*/

    const obj = {
      title: post_title,
      content: post_content,
      author_first_name: first_name,
      author_last_name: last_name,
      author_contact: contect_no,
      id: this.note_id
    };

    this.postData(obj);
}

postData(jsonData: any){
  this.http.post<any>('http://localhost:3001/notesupbyid', jsonData).subscribe(data => {
        console.log(data);
        this.router.navigate(['/display']);
  });
}



}
