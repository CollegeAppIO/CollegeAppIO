import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-admin-college-info',
  templateUrl: './admin-college-info.component.html',
  styleUrls: ['./admin-college-info.component.css']
})
export class AdminCollegeInfoComponent implements OnInit {
  backgroundInfo: string;
  deadline: string;
  undergradStudents: string;
  gradStudents: string;
  totalEnroll: string;
  fourYear: string;
  academicCalender: string;
  yearFounded: string;
  location: string;
  studentFacaulty: string;
  telephone: string;
  inState: string;
  outState: string;
  question1: string;
  question2: string;
  question3: string;
  uid:string;
  email:string;
  collegeName:string;
  imageURL:string;

  collegeQuestions: JSON;


  constructor(private httpClient: HttpClient,public authServ: AuthService) { }

  ngOnInit() {
    this.authServ.fireAuth.authState.subscribe(user => {
        if(user) {
          this.uid = user.uid;
          this.email = user.email;          //console.log(this.uid);

        }

        var url = 'https://college-app-io.herokuapp.com/getCollegeNameForUID/' + this.uid;
        this.httpClient.get(url).subscribe(data1 =>{
          console.log(data1);
          this.collegeName = data1;
          var temp = 'https://college-app-io.herokuapp.com/getCollegeInfo';
          this.httpClient.get(temp,{headers: {'collegeName': this.collegeName}}).subscribe(data => {
                this.collegeList = data[0] as JSON;
                 console.log(this.collegeList);
                 this.backgroundInfo = this.collegeList['information'];
                 this.deadline = this.collegeList['deadlines'];
                 this.undergradStudents = this.collegeList['num_ugrads'];
                 this.gradStudents = this.collegeList['num_postgrads'];
                 this.totalEnroll = this.collegeList['num_students'];
                 this.fourYear = this.collegeList['yr_grad'];
                 this.academicCalender = this.collegeList['a_calender'];
                 this.yearFounded = this.collegeList['found_year'];
                 this.location = this.collegeList['school_locat'];
                 this.studentFacaulty = this.collegeList['stud_fac'];
                 this.telephone = this.collegeList['telephone'];
                 this.inState = this.collegeList['tuition_in'];
                 this.outState = this.collegeList['tuition_out'];
                 this.imageURL = this.collegeList['image_link'];
          })


          var temp1 = 'http://college-app-io.herokuapp.com/getQuestions';
          this.httpClient.get(temp1,{headers: {'collegeName': this.collegeName}}).subscribe(data => {
                this.collegeQuestions = data[0] as JSON;
                // console.log(data[0]);
                this.question1 = this.collegeQuestions['q1'];
                this.question2 = this.collegeQuestions['q2'];
                this.question3 = this.collegeQuestions['q3'];
          })
        })






    })


  }

  submit() {
    this.httpClient.post('https://college-app-io.herokuapp.com/setCollegeQuestions/'+this.collegeName, {
        a_calender: this.academicCalender,
        deadlines: this.deadline,
        found_year: this.yearFounded,
        image_link: this.imageURL,
        information: this.backgroundInfo,
        num_postgrads: this.gradStudents,
        num_students: this.totalEnroll,
        num_ugrads: this.undergradStudents,
        school_locat: this.location,
        stud_fac: this.studentFacaulty,
        telephone: this.telephone,
        tuition_in: this.inState,
        tuition_out: this.outState,
        yr_grad: this.fourYear,
        q1: this.question1,
        q2: this.question2,
        q3: this.question3

    })
      .subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log("Error occured");
        }
      );



  }


}
