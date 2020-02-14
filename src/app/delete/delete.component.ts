import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  note_id: any;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) { 
    // id is defined on app.routing.module.ts
    this.note_id = this.route.snapshot.params.id;
  }

  ngOnInit(): void {
    this.deleteNote();
  }

  deleteNote(){
    return this.http.get<any>('http://localhost:3001/notesdelbyid?noteId='+this.note_id)
            .subscribe(response => {
              console.log(response);
              this.router.navigate(['/display']);
            });

  }




}
