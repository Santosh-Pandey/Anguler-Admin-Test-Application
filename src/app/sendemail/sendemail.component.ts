import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SessionService } from '../session.service';
import { environment } from '../../environments/environment';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-sendemail',
  templateUrl: './sendemail.component.html',
  styleUrls: ['./sendemail.component.css']
})
export class SendemailComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  country: any =  ["India", "Nepal", "Srilanka", "Bhutan"];
  apiUrl: any;

  // tslint:disable-next-line: max-line-length
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private sess: SessionService, private flashMessage: FlashMessagesService, private spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit(): void {
    this.sess.checkLogin();

    this.registerForm = this.formBuilder.group({
      to: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      body: ['', Validators.required]
    });
  }

  onSubmit(formAllData: any) {
    this.submitted = true;
    // stop the process here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

    console.log(formAllData);

    let to = formAllData.to;
    let subject = formAllData.subject;
    let body = formAllData.body;

    const obj = {
      "to": to,
      "subject": subject,
      "body": body,
    };

    this.postData(obj);
}

postData(jsonData: any){
  this.apiUrl = environment.nodeAPIUrl;
  this.spinnerService.show(); // show the spinner
  this.http.post<any>(this.apiUrl + 'sendemail', jsonData).subscribe(data => {
            console.log(data);

            // Clear form Value Without any Error
            this.registerForm.reset();
            Object.keys(this.registerForm.controls).forEach(key => {
              this.registerForm.get(key).setErrors(null) ;
            });

            this.spinnerService.hide(); // hide the spinner if success
            // this.router.navigate(['/display']);
            this.flashMessage.show(data.message, { cssClass: 'alert-info', timeout: 2000 });
  });
}

}
