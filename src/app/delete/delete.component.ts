import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from "@angular/router";
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  noteId: any;
  apiUrl: any;
  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) { 
    // id is defined on app.routing.module.ts
    this.noteId = this.route.snapshot.params.id;
  }

  ngOnInit(): void {
    this.deleteNote();
  }

  deleteNote(){
    this.apiUrl = environment.nodeAPIUrl;
    return this.http.get<any>(this.apiUrl + 'notesdelbyid?noteId=' + this.noteId)
            .subscribe(response => {
              console.log(response);
              this.router.navigate(['/display']);
            });

  }




}
