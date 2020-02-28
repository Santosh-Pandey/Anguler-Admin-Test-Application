import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SessionService } from '../session.service';
import { environment } from '../../environments/environment';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-dynamicform',
  templateUrl: './dynamicform.component.html',
  styleUrls: ['./dynamicform.component.css']
})
export class DynamicformComponent implements OnInit {

  submitted = false;
  registerForm: FormGroup;


  // tslint:disable-next-line: max-line-length
  constructor( private fb: FormBuilder,
               private http: HttpClient,
               private router: Router,
               private sess: SessionService,
               private flashMessage: FlashMessagesService,
               private spinnerService: Ng4LoadingSpinnerService
              ) {

                  this.registerForm = this.fb.group(
                    {
                      person: this.fb.array([this.getConsumerGroup()]),
                      com_name: ['', Validators.required],
                      com_location: ['', Validators.required]
                    }
                  );
              }



    ngOnInit(): void {
    this.sess.checkLogin();

  }

  onSubmit(formAllData: any) {
    // console.log(this.registerForm.value);
    this.submitted = true;
    console.log(formAllData);
    if (this.registerForm.invalid) {
      return;
    }

  }
  onAddRow() {
    const persons = this.formControl['person'] as FormArray;
    console.log(persons);
    persons.push(this.getConsumerGroup());

  }

  onRemoveRow(i: number){
    const persons = this.formControl.person as FormArray;
    persons.removeAt(i);

  }

  getConsumerGroup() {
    const group = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
    });
    return group;
  }

  get formControl() {
    return this.registerForm.controls;
  }


}
