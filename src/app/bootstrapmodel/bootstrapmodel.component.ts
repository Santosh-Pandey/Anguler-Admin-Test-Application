import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-bootstrapmodel',
  templateUrl: './bootstrapmodel.component.html',
  styleUrls: ['./bootstrapmodel.component.css']
})
export class BootstrapmodelComponent implements OnInit {

  modalOptions: NgbModalOptions;
  closeResult: string;
  myid: any;

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop'
    };
  }

  open(content, mytestid) {

    console.log(mytestid);
    this.myid = mytestid;

    this.modalService.open(content, this.modalOptions).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}
