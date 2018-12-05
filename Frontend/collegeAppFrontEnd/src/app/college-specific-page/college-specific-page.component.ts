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
  // userData: JSON;

  isDisabled: boolean = false;
  toggleq0:boolean = true;
  toggleq1:boolean = true;
  toggleq2:boolean = true;
  toggleq3:boolean = true;

  collegeName: string;
  message:string;
  testarea:string;
  q1: string;
  q2: string;
  q3: string;
  major: string;
  uid:string;
  email:string;
  modalReference: any;
  modalReferenceMainModal: any;
  constructor(private httpClient: HttpClient, private route: ActivatedRoute, private data: DataService, private modalService: NgbModal,public authServ: AuthService) { }

  ngOnInit() {
    this.authServ.fireAuth.authState.subscribe(user => {
        if(user) {
          this.uid = user.uid;
          this.email = user.email;          //console.log(this.uid);

        }

        var temp = 'http://college-app-io.herokuapp.com/getStudentResponse';
        this.httpClient.get(temp,{headers: {'collegeName': this.message, 'studentid':this.uid}}).subscribe(data => {
              // this.userData = data[0] as JSON;

              if(data == 'Student Already Applied'){
                this.isDisabled = true;
                console.log("user submitted");
              }else{
                this.isDisabled = false;
              }
              this.q1 = data[0].q1;
              this.q2 = data[0].q2;
              this.q3 = data[0].q3;
              this.major = data[0].major;


        })

    })

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

    // var temp = 'http://college-app-io.herokuapp.com/getStudentResponse';
    // this.httpClient.get(temp,{headers: {'collegeName': this.message, 'studentid':this.uid}}).subscribe(data => {
    //       // this.userData = data[0] as JSON;
    //       this.q1 = data[0].q1;
    //       this.q2 = data[0].q2;
    //       this.q3 = data[0].q3;
    //       this.major = data[0].major;
    //       console.log(this.userData);
    // })


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

      var temp = 'http://college-app-io.herokuapp.com/sendEmail/'+this.email+'/'+this.message;
      this.httpClient.get(temp).subscribe(data => {
            console.log(data);
      })

      this.isDisabled = true;
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
      console.log(!this.q1 || 0 === this.q1.length);
      if(!this.major || 0 === this.major.length){
        console.log("no q1");
        this.toggleq0 = false;
      }else{
        this.toggleq0 = true;
      }
      if(!this.q1 || 0 === this.q1.length){
        console.log("no q1");
        this.toggleq1 = false;
      }else{
        this.toggleq1 = true;
      }
      if(!this.q2 || 0 === this.q2.length){
        console.log("no q1");
        this.toggleq2 = false;
      }else{
        this.toggleq2 = true;
      }
      if(!this.q3 || 0 === this.q3.length){
        console.log("no q1");
        this.toggleq3 = false;
      }else{
        this.toggleq3 = true;
      }
      if(this.q1 && this.q2 && this.q3 && this.major){
        console.log("cofirm");
        this.modalReference = this.modalService.open(contenttemp, { centered: true });
      }
  }

  cancel(){
    this.modalReference.close();
  }

  addToWatchList(collegeName){
    var url = 'http://college-app-io.herokuapp.com/addWatchList';
    this.httpClient.get(url,{headers: {'collegename': collegeName, 'studentid':this.uid}}).subscribe(data => {
          // this.userData = data[0] as JSON;
          console.log(data);
    })
  }

}
