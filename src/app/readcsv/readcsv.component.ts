import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";
import { SessionService } from '../session.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-readcsv',
  templateUrl: './readcsv.component.html',
  styleUrls: ['./readcsv.component.css']
})
export class ReadcsvComponent implements OnInit {

  isMessage: any;
  isError: any;
  isResponse: any;
  submitted = false;
  myForm: FormGroup;
  apiUrl: any;
  csvRecords: any[] = [];

 @ViewChild('fileImportInput') fileImportInput: any;

  constructor(
    private formBuilder: FormBuilder, 
    private http: HttpClient, 
    private router: Router, 
    private sess: SessionService
    ) { }

  ngOnInit(): void {
    // Check User Login
    this.sess.checkLogin();
    this.myForm = this.formBuilder.group({
        name: ['', Validators.required],
        file: ['', Validators.required],
        fileSource: ['', Validators.required]
      });

  }

  get f() {
    return this.myForm.controls;
  }


  fileChangeListener($event: any): void {
    const files = $event.srcElement.files;

    this.myForm.patchValue({
      fileSource: files[0]
    });

    if (this.isCSVFile(files[0])) {

      const input = $event.target;
      const reader = new FileReader();
      reader.readAsText(input.files[0]);

      reader.onload = () => {
        const csvData = reader.result;
        const csvRecordsArray = (<string>csvData).split(/\r\n|\n/);

        const headersRow = this.getHeaderArray(csvRecordsArray);

        this.csvRecords = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);

        console.log(this.csvRecords);
      };

      // tslint:disable-next-line: only-arrow-functions
      reader.onerror = function () {
        alert('Unable to read ' + input.files[0]);
      };

    } else {
      alert('Please import valid .csv file.');
      this.fileReset();
    }
  }

  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {
    const dataArr = [];

    for (let i = 1; i < csvRecordsArray.length; i++) {
      const data = (<string>csvRecordsArray[i]).split(',');

      // FOR EACH ROW IN CSV FILE IF THE NUMBER OF COLUMNS
      // ARE SAME AS NUMBER OF HEADER COLUMNS THEN PARSE THE DATA
      if (data.length == headerLength) {

        const csvRecord: CSVRecord = new CSVRecord();

        csvRecord.Content = data[0].trim();
        csvRecord.Title = data[1].trim();
        csvRecord.FirstName = data[2].trim();
        csvRecord.LastName = data[3].trim();
        csvRecord.ContectNo = data[4].trim();
        csvRecord.Language = data[5].trim();
        csvRecord.Country = data[5].trim();
        csvRecord.Description = data[7].trim();

        dataArr.push(csvRecord);
      }
    }
    return dataArr;
  }

  // CHECK IF FILE IS A VALID CSV FILE
  isCSVFile(file: any) {
    return file.name.endsWith('.csv');
  }


   // GET CSV FILE HEADER COLUMNS
   getHeaderArray(csvRecordsArr: any) {
    const headers = (<string>csvRecordsArr[0]).split(',');
    const headerArray = [];
    // tslint:disable-next-line: prefer-for-of
    for (let j = 0; j < headers.length; j++) {
      headerArray.push(headers[j]);
    }
    return headerArray;
  }

  fileReset() {
    this.fileImportInput.nativeElement.value = '';
    this.csvRecords = [];
  }


  submit() {
    this.submitted = true;
    console.log(this.myForm);

    if (this.myForm.invalid) {
      return;
    }
    // console.log(JSON.stringify(this.csvRecords));

    for(let obj of this.csvRecords) {
      // console.log(obj.Content);

      const postObj = {
          title: obj.Title,
          content: obj.Content,
          author_first_name: obj.FirstName,
          author_last_name: obj.LastName,
          author_contact: obj.ContectNo,
          other_info:{
            country: obj.Country,
            language: obj.Language,
            description: obj.Description
          }
      };
      console.log(postObj);
      this.postData(postObj);

    }

     // Clear form Value Without any Error
    this.myForm.reset();
    Object.keys(this.myForm.controls).forEach(key => {
        this.myForm.get(key).setErrors(null) ;
    });

    this.isResponse = 1;
    this.isMessage = 'All Record Created Successfully';

  }

  postData(jsonData: any) {
    this.apiUrl = environment.nodeAPIUrl;
    this.http.post<any>(this.apiUrl + 'notes', jsonData).subscribe(data => {
              console.log(data);
    });
    return;
  }

}

export class CSVRecord {

  public Content: any;
  public Title: any;
  public FirstName: any;
  public LastName: any;
  public ContectNo: any;
  public Language: any;
  public Country: any;
  public Description: any;

  constructor() {

  }
}