import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AuthService } from '../auth.service';
import {FormBuilder, FormGroup,FormsModule, Validators,ReactiveFormsModule} from '@angular/forms';


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




  constructor(public authServ: AuthService,private router: Router, private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address1: ['',Validators.required],
      city: ['',Validators.required],
      state: ['',Validators.required],
      zip: ['',Validators.required],
    });

  }

  toHome(){
    console.log('back home');
    this.router.navigateByUrl('/home');
  }

}
