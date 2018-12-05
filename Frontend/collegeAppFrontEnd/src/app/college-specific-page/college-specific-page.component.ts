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

  questions: any;
  answers: string[] = [];

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


              if(data == 'Student Already Applied'){
                this.isDisabled = true;
                console.log("user submitted");
              }else{
                this.isDisabled = false;
              }

              console.log(data[0].major);
              console.log(data[0].questions);

              this.major = data[0].major;
              if(data[0].questions == null){
                this.answers = [''];
              }else{
                this.answers = data[0].questions;
              }

              console.log(this.answers);

              // this.q1 = data[0].q1;
              // this.q2 = data[0].q2;
              // this.q3 = data[0].q3;
              // this.major = data[0].major;


        })

        var temp = 'https://college-app-io.herokuapp.com/getQuestions';
        this.httpClient.get(temp,{headers: {'collegeName': this.message}}).subscribe(data => {
              console.log(data);
              this.questions = data;
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

  addToWatchList(){
    var url = 'http://college-app-io.herokuapp.com/addWatchList';
    this.httpClient.get(url,{headers: {'collegename': this.message, 'studentid':this.uid}}).subscribe(data => {
          // this.userData = data[0] as JSON;

          console.log(data);
    })
    console.log(this.collegeName);
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
    console.log("clicked submit");
    console.log(this.answers);

    console.log(this.major);
    console.log(this.uid);
    console.log(this.message);

    var myString = "";
    for(let questionsIter of this.answers){
      if(questionsIter.trim().length > 0){
        myString += questionsIter.trim();
        myString += "||";
      }
    }
    myString = myString.substring(0, myString.length - 2);
    console.log(myString);

    this.httpClient.post('https://college-app-io.herokuapp.com/postResponse', {

      collegeName: this.message,
      studentid: this.uid,
      questions: myString,
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

      var temp = 'http://college-app-io.herokuapp.com/sendEmail/'+this.email+'/'+this.message;
      this.httpClient.get(temp).subscribe(data => {
            console.log(data);
      })

      this.isDisabled = true;
      // this.modalReference.close();
      this.modalReferenceMainModal.close();
  }

  saveAppl(){
    console.log(this.major);
    console.log(this.uid);
    console.log(this.message);

    var myString = "";
    for(let questionsIter of this.answers){
      if(questionsIter.trim().length > 0){
        myString += questionsIter.trim();
        myString += "||";
      }
    }
    myString = myString.substring(0, myString.length - 2);
    console.log(myString);

    this.httpClient.post('https://college-app-io.herokuapp.com/postResponse', {
      collegeName: this.message,
      studentid: this.uid,
      questions: myString,
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

    console.log("clicked submit");
    console.log(this.answers);

      // console.log(!this.q1 || 0 === this.q1.length);
      // if(!this.major || 0 === this.major.length){
      //   console.log("no q1");
      //   this.toggleq0 = false;
      // }else{
      //   this.toggleq0 = true;
      // }
      // if(!this.q1 || 0 === this.q1.length){
      //   console.log("no q1");
      //   this.toggleq1 = false;
      // }else{
      //   this.toggleq1 = true;
      // }
      // if(!this.q2 || 0 === this.q2.length){
      //   console.log("no q1");
      //   this.toggleq2 = false;
      // }else{
      //   this.toggleq2 = true;
      // }
      // if(!this.q3 || 0 === this.q3.length){
      //   console.log("no q1");
      //   this.toggleq3 = false;
      // }else{
      //   this.toggleq3 = true;
      // }
      // if(this.q1 && this.q2 && this.q3 && this.major){
      //   console.log("cofirm");
      //   this.modalReference = this.modalService.open(contenttemp, { centered: true });
      // }
  }

  cancel(){
    this.modalReference.close();
  }



}
