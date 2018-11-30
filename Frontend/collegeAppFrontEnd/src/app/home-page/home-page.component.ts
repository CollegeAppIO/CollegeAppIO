import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import * as firebase from 'firebase/app';
import {Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DataService } from "../data.service";
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  collegeList: JSON;
  message:string;
  uid: string;
  watchlist: any;
  addedToWatchList: boolean = true;



  constructor(public authServ: AuthService,private router: Router,private httpClient: HttpClient,private data: DataService,config: NgbCarouselConfig) {
      config.showNavigationArrows = false;
      config.showNavigationIndicators = false;
  }



  ngOnInit() {
    console.log(this.addedToWatchList);
    this.data.currentMessage.subscribe(message => this.message = message);

    var temp = 'https://college-app-io.herokuapp.com/getColleges';
    this.httpClient.get(temp).subscribe(data => {
          this.collegeList = data as JSON;
          console.log(this.collegeList);
    })


    this.authServ.fireAuth.authState.subscribe(user => {
        if(user) {
          this.uid = user.uid;
          console.log(user.uid);
          var url = 'http://college-app-io.herokuapp.com/getWatchList';
          this.httpClient.get(url,{headers: {'studentid':user.uid}}).subscribe(data => {
                // this.userData = data[0] as JSON;
                this.watchlist = data;
                console.log(data);
          })
        }
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
  addToWatchList(collegeName){
    var url = 'http://college-app-io.herokuapp.com/addWatchList';
    this.httpClient.get(url,{headers: {'collegename': collegeName, 'studentid':this.uid}}).subscribe(data => {
          // this.userData = data[0] as JSON;
          console.log(data);
          this.getWatchList();
    })

      console.log(collegeName);


}

removeFromWatchList(college){
  console.log(college);
  var url = 'http://college-app-io.herokuapp.com/removeWatchList';
  this.httpClient.get(url,{headers: {'collegename': college, 'studentid':this.uid}}).subscribe(data => {
        // this.userData = data[0] as JSON;
        console.log(data);
        this.getWatchList();
  })



}

getWatchList(){
  var url = 'http://college-app-io.herokuapp.com/getWatchList';
  this.httpClient.get(url,{headers: {'studentid':this.uid}}).subscribe(data => {
        // this.userData = data[0] as JSON;
        this.watchlist = data;
        console.log(data);
  })
}


}
