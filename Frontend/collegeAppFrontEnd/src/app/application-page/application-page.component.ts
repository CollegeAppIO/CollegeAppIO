import { ViewChild,Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AuthService } from '../auth.service';
import {FormBuilder, FormGroup,FormsModule, Validators,ReactiveFormsModule} from '@angular/forms';
import {HttpClient,HttpHeaders} from '@angular/common/http'
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-application-page',
  templateUrl: './application-page.component.html',
  styleUrls: ['./application-page.component.css']
})
export class ApplicationPageComponent implements OnInit {
  isLinear = true;
  firstFormGroup: FormGroup;
  academicInfoFormGroup: FormGroup;
  essayInfoFormGroup: FormGroup;
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
  countries = [
    'Afghanistan',
    'Albania',
    'Algeria',
    'Andorra',
    'Angola',
    'Antigua and Barbuda',
    'Argentina',
    'Armenia',
    'Australia',
    'Austria',
    'Azerbaijan',
    'The Bahamas',
    'Bahrain',
    'Bangladesh',
    'Barbados',
    'Belarus',
    'Belgium',
    'Belize',
    'Benin',
    'Bhutan',
    'Bolivia',
    'Bosnia and Herzegovina',
    'Botswana',
    'Brazil',
    'Brunei',
    'Bulgaria',
    'Burkina Faso',
    'Burundi',
    'Cabo Verde',
    'Cambodia',
    'Cameroon',
    'Canada',
    'United States'

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
  'Male','Female'
]

races = [
  {value: 'American Indian or Alaskan Native'},
  {value: 'African American'},
  {value: 'Asian'},
  {value: 'White'},
  {value: 'Native Hawaiian Or Pacific Islander'},
  {value: 'Two or more races'},
  {value: 'Decline to Self Identify'},
]

religions = [
  {value: 'Hindu'},
  {value: 'Christianity'},
  {value: 'Hinduism'},
  {value: 'Chinese traditional religion'},
  {value: 'Buddhism'},
  {value: 'Christianity'},
  {value: 'Other'},
]

nationalities = [
  {value: 'Afghanistan', code: 'AF'}, 
 {value: 'Åland Islands', code: 'AX'}, 
 {value: 'Albania', code: 'AL'}, 
 {value: 'Algeria', code: 'DZ'}, 
 {value: 'American Samoa', code: 'AS'}, 
 {value: 'AndorrA', code: 'AD'}, 
 {value: 'Angola', code: 'AO'}, 
 {value: 'Anguilla', code: 'AI'}, 
 {value: 'Antarctica', code: 'AQ'}, 
 {value: 'Antigua and Barbuda', code: 'AG'}, 
 {value: 'Argentina', code: 'AR'}, 
 {value: 'Armenia', code: 'AM'}, 
 {value: 'Aruba', code: 'AW'}, 
 {value: 'Australia', code: 'AU'}, 
 {value: 'Austria', code: 'AT'}, 
 {value: 'Azerbaijan', code: 'AZ'}, 
 {value: 'Bahamas', code: 'BS'}, 
 {value: 'Bahrain', code: 'BH'}, 
 {value: 'Bangladesh', code: 'BD'}, 
 {value: 'Barbados', code: 'BB'}, 
 {value: 'Belarus', code: 'BY'}, 
 {value: 'Belgium', code: 'BE'}, 
 {value: 'Belize', code: 'BZ'}, 
 {value: 'Benin', code: 'BJ'}, 
 {value: 'Bermuda', code: 'BM'}, 
 {value: 'Bhutan', code: 'BT'}, 
 {value: 'Bolivia', code: 'BO'}, 
 {value: 'Bosnia and Herzegovina', code: 'BA'}, 
 {value: 'Botswana', code: 'BW'}, 
 {value: 'Bouvet Island', code: 'BV'}, 
 {value: 'Brazil', code: 'BR'}, 
 {value: 'British Indian Ocean Territory', code: 'IO'}, 
 {value: 'Brunei Darussalam', code: 'BN'}, 
 {value: 'Bulgaria', code: 'BG'}, 
 {value: 'Burkina Faso', code: 'BF'}, 
 {value: 'Burundi', code: 'BI'}, 
 {value: 'Cambodia', code: 'KH'}, 
 {value: 'Cameroon', code: 'CM'}, 
 {value: 'Canada', code: 'CA'}, 
 {value: 'Cape Verde', code: 'CV'}, 
 {value: 'Cayman Islands', code: 'KY'}, 
 {value: 'Central African Republic', code: 'CF'}, 
 {value: 'Chad', code: 'TD'}, 
 {value: 'Chile', code: 'CL'}, 
 {value: 'China', code: 'CN'}, 
 {value: 'Christmas Island', code: 'CX'}, 
 {value: 'Cocos (Keeling) Islands', code: 'CC'}, 
 {value: 'Colombia', code: 'CO'}, 
 {value: 'Comoros', code: 'KM'}, 
 {value: 'Congo', code: 'CG'}, 
 {value: 'Congo, The Democratic Republic of the', code: 'CD'}, 
 {value: 'Cook Islands', code: 'CK'}, 
 {value: 'Costa Rica', code: 'CR'}, 
 {value: 'Cote D\'Ivoire', code: 'CI'}, 
 {value: 'Croatia', code: 'HR'}, 
 {value: 'Cuba', code: 'CU'}, 
 {value: 'Cyprus', code: 'CY'}, 
 {value: 'Czech Republic', code: 'CZ'}, 
 {value: 'Denmark', code: 'DK'}, 
 {value: 'Djibouti', code: 'DJ'}, 
 {value: 'Dominica', code: 'DM'}, 
 {value: 'Dominican Republic', code: 'DO'}, 
 {value: 'Ecuador', code: 'EC'}, 
 {value: 'Egypt', code: 'EG'}, 
 {value: 'El Salvador', code: 'SV'}, 
 {value: 'Equatorial Guinea', code: 'GQ'}, 
 {value: 'Eritrea', code: 'ER'}, 
 {value: 'Estonia', code: 'EE'}, 
 {value: 'Ethiopia', code: 'ET'}, 
 {value: 'Falkland Islands (Malvinas)', code: 'FK'}, 
 {value: 'Faroe Islands', code: 'FO'}, 
 {value: 'Fiji', code: 'FJ'}, 
 {value: 'Finland', code: 'FI'}, 
 {value: 'France', code: 'FR'}, 
 {value: 'French Guiana', code: 'GF'}, 
 {value: 'French Polynesia', code: 'PF'}, 
 {value: 'French Southern Territories', code: 'TF'}, 
 {value: 'Gabon', code: 'GA'}, 
 {value: 'Gambia', code: 'GM'}, 
 {value: 'Georgia', code: 'GE'}, 
 {value: 'Germany', code: 'DE'}, 
 {value: 'Ghana', code: 'GH'}, 
 {value: 'Gibraltar', code: 'GI'}, 
 {value: 'Greece', code: 'GR'}, 
 {value: 'Greenland', code: 'GL'}, 
 {value: 'Grenada', code: 'GD'}, 
 {value: 'Guadeloupe', code: 'GP'}, 
 {value: 'Guam', code: 'GU'}, 
 {value: 'Guatemala', code: 'GT'}, 
 {value: 'Guernsey', code: 'GG'}, 
 {value: 'Guinea', code: 'GN'}, 
 {value: 'Guinea-Bissau', code: 'GW'}, 
 {value: 'Guyana', code: 'GY'}, 
 {value: 'Haiti', code: 'HT'}, 
 {value: 'Heard Island and Mcdonald Islands', code: 'HM'}, 
 {value: 'Holy See (Vatican City State)', code: 'VA'}, 
 {value: 'Honduras', code: 'HN'}, 
 {value: 'Hong Kong', code: 'HK'}, 
 {value: 'Hungary', code: 'HU'}, 
 {value: 'Iceland', code: 'IS'}, 
 {value: 'India', code: 'IN'}, 
 {value: 'Indonesia', code: 'ID'}, 
 {value: 'Iran, Islamic Republic Of', code: 'IR'}, 
 {value: 'Iraq', code: 'IQ'}, 
 {value: 'Ireland', code: 'IE'}, 
 {value: 'Isle of Man', code: 'IM'}, 
 {value: 'Israel', code: 'IL'}, 
 {value: 'Italy', code: 'IT'}, 
 {value: 'Jamaica', code: 'JM'}, 
 {value: 'Japan', code: 'JP'}, 
 {value: 'Jersey', code: 'JE'}, 
 {value: 'Jordan', code: 'JO'}, 
 {value: 'Kazakhstan', code: 'KZ'}, 
 {value: 'Kenya', code: 'KE'}, 
 {value: 'Kiribati', code: 'KI'}, 
 {value: 'Korea, Democratic People\'S Republic of', code: 'KP'}, 
 {value: 'Korea, Republic of', code: 'KR'}, 
 {value: 'Kuwait', code: 'KW'}, 
 {value: 'Kyrgyzstan', code: 'KG'}, 
 {value: 'Lao People\'S Democratic Republic', code: 'LA'}, 
 {value: 'Latvia', code: 'LV'}, 
 {value: 'Lebanon', code: 'LB'}, 
 {value: 'Lesotho', code: 'LS'}, 
 {value: 'Liberia', code: 'LR'}, 
 {value: 'Libyan Arab Jamahiriya', code: 'LY'}, 
 {value: 'Liechtenstein', code: 'LI'}, 
 {value: 'Lithuania', code: 'LT'}, 
 {value: 'Luxembourg', code: 'LU'}, 
 {value: 'Macao', code: 'MO'}, 
 {value: 'Macedonia, The Former Yugoslav Republic of', code: 'MK'}, 
 {value: 'Madagascar', code: 'MG'}, 
 {value: 'Malawi', code: 'MW'}, 
 {value: 'Malaysia', code: 'MY'}, 
 {value: 'Maldives', code: 'MV'}, 
 {value: 'Mali', code: 'ML'}, 
 {value: 'Malta', code: 'MT'}, 
 {value: 'Marshall Islands', code: 'MH'}, 
 {value: 'Martinique', code: 'MQ'}, 
 {value: 'Mauritania', code: 'MR'}, 
 {value: 'Mauritius', code: 'MU'}, 
 {value: 'Mayotte', code: 'YT'}, 
 {value: 'Mexico', code: 'MX'}, 
 {value: 'Micronesia, Federated States of', code: 'FM'}, 
 {value: 'Moldova, Republic of', code: 'MD'}, 
 {value: 'Monaco', code: 'MC'}, 
 {value: 'Mongolia', code: 'MN'}, 
 {value: 'Montserrat', code: 'MS'}, 
 {value: 'Morocco', code: 'MA'}, 
 {value: 'Mozambique', code: 'MZ'}, 
 {value: 'Myanmar', code: 'MM'}, 
 {value: 'Namibia', code: 'NA'}, 
 {value: 'Nauru', code: 'NR'}, 
 {value: 'Nepal', code: 'NP'}, 
 {value: 'Netherlands', code: 'NL'}, 
 {value: 'Netherlands Antilles', code: 'AN'}, 
 {value: 'New Caledonia', code: 'NC'}, 
 {value: 'New Zealand', code: 'NZ'}, 
 {value: 'Nicaragua', code: 'NI'}, 
 {value: 'Niger', code: 'NE'}, 
 {value: 'Nigeria', code: 'NG'}, 
 {value: 'Niue', code: 'NU'}, 
 {value: 'Norfolk Island', code: 'NF'}, 
 {value: 'Northern Mariana Islands', code: 'MP'}, 
 {value: 'Norway', code: 'NO'}, 
 {value: 'Oman', code: 'OM'}, 
 {value: 'Pakistan', code: 'PK'}, 
 {value: 'Palau', code: 'PW'}, 
 {value: 'Palestinian Territory, Occupied', code: 'PS'}, 
 {value: 'Panama', code: 'PA'}, 
 {value: 'Papua New Guinea', code: 'PG'}, 
 {value: 'Paraguay', code: 'PY'}, 
 {value: 'Peru', code: 'PE'}, 
 {value: 'Philippines', code: 'PH'}, 
 {value: 'Pitcairn', code: 'PN'}, 
 {value: 'Poland', code: 'PL'}, 
 {value: 'Portugal', code: 'PT'}, 
 {value: 'Puerto Rico', code: 'PR'}, 
 {value: 'Qatar', code: 'QA'}, 
 {value: 'Reunion', code: 'RE'}, 
 {value: 'Romania', code: 'RO'}, 
 {value: 'Russian Federation', code: 'RU'}, 
 {value: 'RWANDA', code: 'RW'}, 
 {value: 'Saint Helena', code: 'SH'}, 
 {value: 'Saint Kitts and Nevis', code: 'KN'}, 
 {value: 'Saint Lucia', code: 'LC'}, 
 {value: 'Saint Pierre and Miquelon', code: 'PM'}, 
 {value: 'Saint Vincent and the Grenadines', code: 'VC'}, 
 {value: 'Samoa', code: 'WS'}, 
 {value: 'San Marino', code: 'SM'}, 
 {value: 'Sao Tome and Principe', code: 'ST'}, 
 {value: 'Saudi Arabia', code: 'SA'}, 
 {value: 'Senegal', code: 'SN'}, 
 {value: 'Serbia and Montenegro', code: 'CS'}, 
 {value: 'Seychelles', code: 'SC'}, 
 {value: 'Sierra Leone', code: 'SL'}, 
 {value: 'Singapore', code: 'SG'}, 
 {value: 'Slovakia', code: 'SK'}, 
 {value: 'Slovenia', code: 'SI'}, 
 {value: 'Solomon Islands', code: 'SB'}, 
 {value: 'Somalia', code: 'SO'}, 
 {value: 'South Africa', code: 'ZA'}, 
 {value: 'South Georgia and the South Sandwich Islands', code: 'GS'}, 
 {value: 'Spain', code: 'ES'}, 
 {value: 'Sri Lanka', code: 'LK'}, 
 {value: 'Sudan', code: 'SD'}, 
 {value: 'Surivalue', code: 'SR'}, 
 {value: 'Svalbard and Jan Mayen', code: 'SJ'}, 
 {value: 'Swaziland', code: 'SZ'}, 
 {value: 'Sweden', code: 'SE'}, 
 {value: 'Switzerland', code: 'CH'}, 
 {value: 'Syrian Arab Republic', code: 'SY'}, 
 {value: 'Taiwan, Province of China', code: 'TW'}, 
 {value: 'Tajikistan', code: 'TJ'}, 
 {value: 'Tanzania, United Republic of', code: 'TZ'}, 
 {value: 'Thailand', code: 'TH'}, 
 {value: 'Timor-Leste', code: 'TL'}, 
 {value: 'Togo', code: 'TG'}, 
 {value: 'Tokelau', code: 'TK'}, 
 {value: 'Tonga', code: 'TO'}, 
 {value: 'Trinidad and Tobago', code: 'TT'}, 
 {value: 'Tunisia', code: 'TN'}, 
 {value: 'Turkey', code: 'TR'}, 
 {value: 'Turkmenistan', code: 'TM'}, 
 {value: 'Turks and Caicos Islands', code: 'TC'}, 
 {value: 'Tuvalu', code: 'TV'}, 
 {value: 'Uganda', code: 'UG'}, 
 {value: 'Ukraine', code: 'UA'}, 
 {value: 'United Arab Emirates', code: 'AE'}, 
 {value: 'United Kingdom', code: 'GB'}, 
 {value: 'United States', code: 'US'}, 
 {value: 'United States Minor Outlying Islands', code: 'UM'}, 
 {value: 'Uruguay', code: 'UY'}, 
 {value: 'Uzbekistan', code: 'UZ'}, 
 {value: 'Vanuatu', code: 'VU'}, 
 {value: 'Venezuela', code: 'VE'}, 
 {value: 'Viet Nam', code: 'VN'}, 
 {value: 'Virgin Islands, British', code: 'VG'}, 
 {value: 'Virgin Islands, U.S.', code: 'VI'}, 
 {value: 'Wallis and Futuna', code: 'WF'}, 
 {value: 'Western Sahara', code: 'EH'}, 
 {value: 'Yemen', code: 'YE'}, 
 {value: 'Zambia', code: 'ZM'}, 
 {value: 'Zimbabwe', code: 'ZW'} 
]

years = [
  {value: '1990'},
]
yesNo = [
  'Yes',
  'No'
]
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
emailStr: string;
constructor(public authServ: AuthService,private router: Router,private _formBuilder: FormBuilder,public http: HttpClient) {
  //this.student = new Student(this.uid);

}


  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      handle: ['',Validators.required],
      gender: ['', Validators.required],
      bday: ['',Validators.required],
      race: ['', Validators.required],
      religion: ['',Validators.required],
      nationality: ['',Validators.required],
      street: ['',Validators.required],
      city: ['',Validators.required],
      state: ['',Validators.required],
      zip: ['',Validators.required],
      country: ['',Validators.required],
      phone:['',Validators.required],

    }, Validators.required);
    this.academicInfoFormGroup = this._formBuilder.group({
      highschool: ['',Validators.required],
      gpa: ['',Validators.required],
      sat: ['',Validators.required],
      act: ['',Validators.required],
      numLangs:['',Validators.required],
      numAps: ['',Validators.required],
      athletes: ['',Validators.required],
      speechdebate: ['',Validators.required],
      studentGov: ['',Validators.required],
      arts: ['',Validators.required],
      tech: ['',Validators.required],
      music:['',Validators.required],
      math:['',Validators.required],
      volunteer:['',Validators.required],
    }, Validators.required);
    this.essayInfoFormGroup = this._formBuilder.group({
      essay: ['',Validators.required],
    },Validators.required);
    //console.log('hi');
    this.authServ.fireAuth.authState.subscribe(user => {
        if(user) {

          this.uid = user.uid;
          this.emailStr = user.email;
          var url = 'https://college-app-io.herokuapp.com/getStudents/' + this.uid;
          console.log(url);
          this.http.get(url).subscribe(data =>{

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

            //this.speechStr = data['speech'];
            //console.log(data['numlang']);
          })
          //console.log(this.uid);
        }


      })



      //console.log('hi');

    //this.http.get()

  }



  // toHome(){
  //   console.log('back home');
  //   this.router.navigateByUrl('/home');
  // }
  // onFirstNameType(value:string){
  //   this.firstNameStr = value;
  //   console.log(this.firstNameStr);
  // }

  postToDataBase(){
    console.log(this.uid);
    console.log(this.firstNameStr);
    console.log(this.lastNameStr);
    console.log(this.handleStr);
    console.log(this.genderStr);
    console.log(this.bdayStr);
    console.log(this.raceStr);
    console.log(this.nationalityStr);
    console.log(this.religionStr);
    console.log(this.streetStr);
    console.log(this.cityStr);
    console.log(this.stateStr);
    console.log(this.countryStr);
    console.log(this.zipcodeStr);
    console.log(this.phoneStr);



    //var gpaNum = parseFloat(this.gpaStr);
    //var satNum = parseInt(this.satStr);
    //var actNum = parseInt(this.actStr);
    var athleteVal = 0;
    var speechVal = 0;
    var artsVal = 0;
    var studentGovVal = 0;
    var techVal = 0;
    var musicVal = 0;
    var mathVal = 0;
    var volunteerHours = parseInt(this.volunteerHoursStr);
    if(this.athleteStr == 'Yes'){
      athleteVal = 1;
    }else{
      athleteVal = 0;
    }
    if(this.speechStr == 'Yes'){
      speechVal = 1;
    }else{
      speechVal = 0;
    }
    if(this.artsStr == 'Yes'){
      artsVal = 1;
    }else{
      artsVal = 0;
    }
    if(this.studentGovStr == 'Yes'){
      studentGovVal = 1;
    }else{
      studentGovVal = 0;
    }
    if(this.techStr == 'Yes'){
      techVal = 1;
    }else{
      techVal = 0;
    }
    if(this.musicStr == 'Yes'){
      musicVal = 1;
    }else{
      musicVal = 0;
    }
    if(this.mathStr == 'Yes'){
      mathVal = 1;
    }else{
      mathVal = 0;
    }


    this.http.post('https://college-app-io.herokuapp.com/putStudents', {
      studentid: this.uid,
      fname: this.firstNameStr,
      lname: this.lastNameStr,
      sex: this.genderStr,
      bday: this.bdayStr,
      street: this.streetStr,
      city: this.cityStr,
      state: this.stateStr,
      country: this.countryStr,
      zipcode: this.zipcodeStr,
      phone: this.phoneStr,
      religion: this.religionStr,
      race: this.raceStr,
      nationality: this.nationalityStr,
      nickname: this.handleStr,
      numlang: this.numLanguages,
      highschool: this.highschoolStr,
      num_ap: this.numAPs,
      gpa: this.gpaStr,
      sat: this.satStr,
      act: this.actStr,
      athletics: this.athleteStr,
      speech: this.speechStr,
      student_gov: this.studentGovStr,
      arts: this.artsStr,
      tech: this.techStr,
      music: this.musicStr,
      math:this.mathStr,
      volunteer_hours: this.volunteerHoursStr,
      applicationstatus: this.applicationStatus,
      essay: this.essayStr,
      email: this.emailStr,

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
  onSaveContinue(){
    if(this.firstFormGroup.invalid && this.firstFormGroup.touched){
      this.firstFormBool = false;
      //console.log("something");
    }else{
      this.firstFormBool = true;
    }
    if(this.academicInfoFormGroup.invalid){
      this.academicFormBool = false;
      //console.log("something");
    }else{
      this.academicFormBool = true;
    }

    this.postToDataBase();
    //this.bdayStr = this.bdayMonthStr + ' ' + this.bdayDayStr + ' ' + this.bdayYearStr;

  }
  onSave(){

    this.firstFormBool = true;
    this.academicFormBool = true;
    this.postToDataBase();
  }
  onSubmit(){
    if(this.essayInfoFormGroup.get('essay').invalid){
      this.essayFormBool = false;
      //console.log("something");
    }else{
      this.essayFormBool = true;
      this.applicationStatus = '1';
      this.postToDataBase();
      this.router.navigateByUrl('/home');
      var url = 'https://college-app-io.herokuapp.com/sendEmailtoStudent/' + this.emailStr + '/' + this.firstNameStr;
      this.http.get(url,)
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

}
