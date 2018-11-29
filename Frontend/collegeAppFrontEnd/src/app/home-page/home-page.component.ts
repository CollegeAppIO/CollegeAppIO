import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import * as firebase from 'firebase/app';
import {Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DataService } from "../data.service";
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {Observable} from 'rxjs';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  collegeList: JSON;
  message:string;

  //collegeList: JSON;
  colleges: any;
  collegeNameSearch:string;


  

  formatter = (result: string) => result.toUpperCase();

  search = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    map(term => term === '' ? []
      : this.colleges.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
  )



  constructor(public authServ: AuthService,private router: Router,private httpClient: HttpClient,private data: DataService,config: NgbCarouselConfig) {
      config.showNavigationArrows = false;
      config.showNavigationIndicators = false;
  }



  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.message = message)

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

  openCollege(name: string){
    console.log(name);
    this.newMessage(name);
    this.router.navigate(['/CollegePage'],{ queryParams: { collegeName: name } });
  }

  toApplication(){
    console.log('to home page');
    this.router.navigateByUrl('/application');
  }

  getCollegeList() {
        var temp = 'https://college-app-io.herokuapp.com/getColleges';
        this.httpClient.get(temp).subscribe(data => {
        console.log(data);
    })
    console.log('sent to the db');

  }

  searchMethod() {
    console.log('college search and send');
    console.log(this.collegeNameSearch);
    this.openCollege(this.collegeNameSearch);
  }

  newMessage(collegeName:string) {
    this.data.changeMessage(collegeName);
  }

}
