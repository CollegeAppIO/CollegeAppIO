import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import * as firebase from 'firebase/app';
import {Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DataService } from "../data.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  collegeList: JSON;
  message:string;
  constructor(public authServ: AuthService,private router: Router,private httpClient: HttpClient,private data: DataService) { }



  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.message = message)

    var temp = 'https://college-app-io.herokuapp.com/getColleges';
    this.httpClient.get(temp).subscribe(data => {
          this.collegeList = data as JSON;
          console.log(this.collegeList);
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

  newMessage(collegeName:string) {
    this.data.changeMessage(collegeName);
  }

}
