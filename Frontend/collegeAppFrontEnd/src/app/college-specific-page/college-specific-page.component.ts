import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { DataService } from "../data.service";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-college-specific-page',
  templateUrl: './college-specific-page.component.html',
  styleUrls: ['./college-specific-page.component.css'],

})
export class CollegeSpecificPageComponent implements OnInit {
  collegeList: JSON;
  collegeQuestions: JSON;


  collegeName: string;
  message:string;
  testarea:string;
  q1: string;
  q2: string;
  q3: string;
  major: string;
  uid:string;
  modalReference: any;
  modalReferenceMainModal: any;
  constructor(private httpClient: HttpClient, private route: ActivatedRoute, private data: DataService, private modalService: NgbModal,public authServ: AuthService) { }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.message = message);

    var temp = 'https://college-app-io.herokuapp.com/getCollegeInfo';
    this.httpClient.get(temp,{headers: {'collegeName': this.message}}).subscribe(data => {
          this.collegeList = data[0] as JSON;
          // console.log(this.collegeList);
    })

    var temp = 'http://college-app-io.herokuapp.com/getQuestions';
    this.httpClient.get(temp,{headers: {'collegeName': this.message}}).subscribe(data => {
          this.collegeQuestions = data[0] as JSON;
          // console.log(this.collegeQuestions);
    })

    this.authServ.fireAuth.authState.subscribe(user => {
        if(user) {
          this.uid = user.uid
          //console.log(this.uid);
        }
      })
  }

  open(content) {
    this.modalReferenceMainModal = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});

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

  submitAppl(){
    console.log(this.q1);
    console.log(this.q2);
    console.log(this.q3);
    console.log(this.major);
    console.log(this.uid);

    this.httpClient.post('https://college-app-io.herokuapp.com/postResponse', {
      collegeName: this.message,
      studentid: this.uid,
      q1: this.q1,
      q2: this.q2,
      q3: this.q3,
      appliedStatus: 1,
      major: this.major
    })
    .subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log("Error occured");
        }
      )
      ;
      this.modalReference.close();
      this.modalReferenceMainModal.close();
  }

  saveAppl(){
    console.log(this.q1);
    console.log(this.q2);
    console.log(this.q3);
    console.log(this.major);
    console.log(this.uid);

    this.httpClient.post('https://college-app-io.herokuapp.com/postResponse', {
      collegeName: this.message,
      studentid: this.uid,
      q1: this.q1,
      q2: this.q2,
      q3: this.q3,
      appliedStatus: 0,
      major: this.major

    })
      .subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log("Error occured");
        }
      );
      this.modalReferenceMainModal.close();
  }

  confirm(contenttemp){
      console.log("cofirm");
      this.modalReference = this.modalService.open(contenttemp, { centered: true });
  }

  cancel(){
    this.modalReference.close();
  }

}
