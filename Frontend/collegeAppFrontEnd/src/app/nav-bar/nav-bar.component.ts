import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import * as firebase from 'firebase/app';
import {Router} from '@angular/router';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DataService } from "../data.service";
import {CollegeSpecificPageComponent} from '../college-specific-page/college-specific-page.component';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  colleges: any;
  collegeNameSearch:string;
  collegeNotThere: boolean = false;
  collegeList: JSON;
  message:string;

  formatter = (result: string) => result.toUpperCase();

  search = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    map(term => term === '' ? []
      : this.colleges.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
  )

  constructor(public authServ: AuthService,private router: Router,private httpClient: HttpClient,private data: DataService) { }



  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.message = message);

    var temp = 'https://college-app-io.herokuapp.com/getColleges';
    this.httpClient.get(temp).subscribe(data => {
          this.collegeList = data as JSON;
          console.log(this.collegeList);
    })

    var temp = 'https://college-app-io.herokuapp.com/getCollegeName';
    this.httpClient.get(temp).subscribe(data => {
          this.colleges = data ;
          console.log(this.colleges);

    })
  }

  onSignOut(){
      console.log('signed out');
      firebase.auth().signOut();
      this.router.navigateByUrl('/');

  }

  toApplication(){
    console.log('to home page');
    this.router.navigateByUrl('/application');
  }

  home(){
    console.log('go home page');
    this.router.navigateByUrl('/home');
  }
  toViewApplication(){
    this.router.navigateByUrl('/ViewApplication');
  }
  toDynamicDV(){
    this.router.navigateByUrl('/StudentDynamicDV');
  }

  newMessage(collegeName:string) {
    this.data.changeMessage(collegeName);
  }

  openCollege(name: string){
    console.log(name);
    this.newMessage(name);
    this.router.navigate(['/CollegePage'],{ queryParams: { collegeName: name } });
  }

  searchMethod() {
    console.log('college search and send');
    console.log(this.collegeNameSearch);

    if(this.colleges.indexOf(this.collegeNameSearch) > -1) {
      console.log('there bitch');
      this.openCollege(this.collegeNameSearch);
      this.collegeNotThere = false;
      // this.collegespecific.ngOnInit();
    }else{
      console.log('not there bitch');
      this.collegeNotThere = true;
    }

  }

}
