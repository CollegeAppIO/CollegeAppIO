import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AuthService } from '../auth.service';
import {FormBuilder, FormGroup,FormsModule, Validators,ReactiveFormsModule} from '@angular/forms';
import {Student} from '../../data/Student'
import {HttpClient,HttpHeaders} from '@angular/common/http'
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-application-page',
  templateUrl: './application-page.component.html',
  styleUrls: ['./application-page.component.css']
})
export class ApplicationPageComponent implements OnInit {
  isLinear = true;
  firstFormGroup: FormGroup;
  states = [
    {value: 'Alabama'},
    {value: 'Alaska'},
    {value: 'Arizona'},
    {value: 'Arkansas'},
    {value: 'California'},
    {value: 'Colorado'},
    {value: 'Connecticut'},
    {value: 'Delaware'},
    {value: 'Florida'},
    {value: 'Georgia'},
    {value: 'Hawaii'},
    {value: 'Idaho'},
    {value: 'Illinois'},
    {value: 'Indiana'},
    {value: 'Iowa'},
    {value: 'Kansas'},
    {value: 'Kentucky'},
    {value: 'Louisiana'},
    {value: 'Maine'},
    {value: 'Maryland'},
    {value: 'Massachusetts'},
    {value: 'Michigan'},
    {value: 'Minnesota'},
    {value: 'Mississippi'},
    {value: 'Missouri'},
    {value: 'Montana'},
    {value: 'Nebraska'},
    {value: 'Nevada'},
    {value: 'New Hampshire'},
    {value: 'New Jersey'},
    {value: 'New Mexico'},
    {value: 'New York'},
    {value: 'North Carolina'},
    {value: 'North Dakota'},
    {value: 'Ohio'},
    {value: 'Oklahoma'},
    {value: 'Oregon'},
    {value: 'Pennsylvania'},
    {value: 'Rhode Island'},
    {value: 'South Carolina'},
    {value: 'South Dakota'},
    {value: 'Tennessee'},
    {value: 'Texas'},
    {value: 'Utah'},
    {value: 'Vermont'},
    {value: 'Virginia'},
    {value: 'Washington'},
    {value: 'West Virginia'},
    {value: 'Wisconsin'},
    {value: 'Wyoming'},
    {value: 'District of Columbia'},
    {value: 'Puerto Rico'},
    {value: 'Guam'},
    {value: 'American Samoa'},
    {value: 'U.S. Virgin Islands'},
    {value: 'Northern Mariana Islands'},
  ]

months = [
  {value: 'January'},
  {value: 'February'},
  {value: 'March'},
  {value: 'April'},
  {value: 'May'},
  {value: 'June'},
  {value: 'July'},
  {value: 'August'},
  {value: 'September'},
  {value: 'October'},
  {value: 'November'},
  {value: 'December'},
]

dates = [
  {value: '1'},
  {value: '2'},
  {value: '3'},
  {value: '4'},
  {value: '5'},
  {value: '6'},
  {value: '7'},
  {value: '8'},
  {value: '9'},
  {value: '10'},
  {value: '11'},
  {value: '12'},
  {value: '13'},
  {value: '14'},
  {value: '15'},
  {value: '16'},
  {value: '17'},
  {value: '18'},
  {value: '19'},
  {value: '20'},
  {value: '21'},
  {value: '22'},
  {value: '23'},
  {value: '24'},
  {value: '25'},
  {value: '26'},
  {value: '27'},
  {value: '28'},
  {value: '29'},
  {value: '30'},
  {value: '31'},
]
genders = [
  {value: 'Male'},
  {value: 'Female'},
]

uid = '';
firstNameStr='';
lastNameStr='';
genderStr = '';
bdayMonthStr = '';
bdayDayStr = '';
bdayYearStr = '';
bdayStr = '';
streetStr='';
stateStr='';
cityStr='';
countryStr='';
zipcodeStr='';
phoneStr='';


student: Student;

constructor(public authServ: AuthService,private router: Router,private _formBuilder: FormBuilder,public http: HttpClient,public fireAuth: AngularFireAuth) {
  //this.student = new Student(this.uid);

}


  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      month: ['', Validators.required],
      date : ['', Validators.required],
      year: ['', Validators.required, Validators.minLength(4)],
      address1: ['',Validators.required],
      city: ['',Validators.required],
      state: ['',Validators.required],
      zip: ['',Validators.required],
      phone:['',Validators.required, Validators.minLength(10)],
    });
    //console.log('hi');
    this.fireAuth.authState.subscribe(user => {
        if(user) {
          this.uid = user.uid
          //console.log(this.uid);
        }


      })
      console.log('hi');

    //this.http.get()

  }



  toHome(){
    console.log('back home');
    this.router.navigateByUrl('/home');
  }
  onFirstNameType(value:string){
    this.firstNameStr = value;
    console.log(this.firstNameStr);
  }
  onLastNameType(value:string){
    this.lastNameStr = value;
    console.log(this.lastNameStr);
  }
  onGenderSelect(value:string){
    this.genderStr = value;
    console.log(this.genderStr);
  }
  onMonthSelect(value:string){
    this.bdayMonthStr = value;
    console.log(this.bdayMonthStr);

  }
  onDaySelect(value:string){
    this.bdayDayStr = value;
    console.log(this.bdayDayStr);
  }
  onYearType(value:string){
    this.bdayYearStr = value;
  }
  onStreetType(value:string){
    this.streetStr = value;
  }
  onStateSelect(value:string){
    this.stateStr = value;
    console.log(this.bdayDayStr);
  }
  onCityType(value:string){
    this.cityStr = value;
  }
  onZipcodeType(value:string){
    this.zipcodeStr = value;
  }
  onPhoneType(value:string){
    this.phoneStr = value;
  }

  onSave(){
    this.bdayStr = this.bdayMonthStr + ' ' + this.bdayDayStr + ' ' + this.bdayYearStr;
    console.log(this.bdayStr);
    console.log(this.uid);


    this.http.post('', {
      studentid: this.uid,
      fname: this.firstNameStr,
      lname: this.lastNameStr,
      sex: this.genderStr,
      bday: this.bdayStr,
      street: this.streetStr,
      city: this.cityStr,
      country: this.countryStr,
      zipcode: this.zipcodeStr,
      phone: this.phoneStr,

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
