import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {HttpClient,HttpHeaders} from '@angular/common/http'
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-view-application',
  templateUrl: './view-application.component.html',
  styleUrls: ['./view-application.component.css']
})
export class ViewApplicationComponent implements OnInit {

  uid: string;
  firstNameStr: string;
  lastNameStr: string;
  handleStr: string;
  genderStr: string;
  bdayMonthStr: string;
  bdayDayStr: string;
  bdayYearStr: string;
  bdayStr: string;
  raceStr: string;
  religionStr: string;
  nationalityStr: string;
  streetStr: string;
  stateStr: string;
  cityStr: string;
  countryStr: string;
  zipcodeStr: string;
  phoneStr: string;
  highschoolStr: string;
  gpaStr: string;
  satStr: string;
  actStr: string;
  numLanguages: string;
  numAPs: string;
  athleteStr: string;
  speechStr: string;
  artsStr: string;
  techStr: string;
  musicStr: string;
  mathStr: string;
  studentGovStr: string;
  volunteerHoursStr: string;
  firstFormBool = true;
  academicFormBool = true;
  essayFormBool = true;
  applicationStatus: string;
  essayStr: string;
  constructor(public authServ: AuthService, public http: HttpClient) { }

  ngOnInit() {
    this.authServ.fireAuth.authState.subscribe(user => {
        if(user) {

          this.uid = user.uid
          var url = 'https://college-app-io.herokuapp.com/getStudents/' + this.uid;
          console.log(url);
          this.http.get(url).subscribe(data =>{
            console.log(data);
            this.firstNameStr = data['fname'];

            this.lastNameStr = data['lname'];
            this.genderStr = data['sex'];
            this.bdayStr = data['bday'];
            this.streetStr = data['street'];
            this.cityStr = data['city'];
            this.stateStr = data['state'];
            this.countryStr = data['country'];
            this.zipcodeStr = data['zipcode'];
            this.phoneStr = data['phone'];
            this.religionStr = data['religion'];
            this.raceStr = data['race'];
            this.nationalityStr = data['nationality'];
            this.handleStr = data['nickname'];
            this.highschoolStr = data['highschool'];
            this.numAPs = data['num_ap'];
            this.numLanguages = data['numlang'];
            this.volunteerHoursStr = data['volunteer_hours'];
            this.gpaStr = data['gpa'];
            this.satStr = data['sat'];
            this.actStr = data['act'];
            this.essayStr = data['essay'];
            if(data['athletics'] == 1){
              this.athleteStr = 'Yes';
            }else{
              this.athleteStr = 'No';
            }
            if(data['speech'] == 1){
              this.speechStr = 'Yes';
            }else{
              this.speechStr = 'No';
            }
            if(data['arts'] == 1){
              this.artsStr = 'Yes';
            }else{
              this.artsStr = 'No';
            }
            if(data['tech'] == 1){
              this.techStr = 'Yes';
            }else{
              this.techStr = 'No';
            }
            if(data['music'] == 1){
              this.musicStr = 'Yes';
            }else{
              this.musicStr = 'No';
            }
            if(data['math'] == 1){
              this.mathStr = 'Yes';
            }else{
              this.mathStr = 'No';
            }
            if(data['student_gov'] == 1){
              this.studentGovStr = 'Yes';
            }else{
              this.studentGovStr = 'No';
            }
            console.log(this.firstNameStr);
            console.log(this.lastNameStr);
            console.log(this.phoneStr);
            //this.speechStr = data['speech'];
            //console.log(data['numlang']);
          })
          //console.log(this.uid);
        }


      })



  }

}
