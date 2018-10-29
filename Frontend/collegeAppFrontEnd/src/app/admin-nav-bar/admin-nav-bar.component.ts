import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import * as firebase from 'firebase/app';
import {Router,NavigationExtras} from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {HistoricalDataComponent}  from '../historical-data/historical-data.component';
import {DataVisualizationComponent}  from '../data-visualization/data-visualization.component';
@Component({
  selector: 'app-admin-nav-bar',
  templateUrl: './admin-nav-bar.component.html',
  styleUrls: ['./admin-nav-bar.component.css']
})
export class AdminNavBarComponent implements OnInit {
  collegeName: any;
  uid: any;
  constructor(public authServ: AuthService,private router: Router,private httpClient: HttpClient) { }

  ngOnInit() {
    this.authServ.fireAuth.authState.subscribe(user => {
        if(user) {
          this.uid = user.uid;
          //console.log(this.uid);

        }

        var url = 'https://college-app-io.herokuapp.com/getCollegeNameForUID/' + this.uid;
        this.httpClient.get(url).subscribe(data1 =>{
          //console.log(data1);
          this.collegeName = data1;

        })
    })
  }
  onSignOut(){
    console.log('signed out');
    firebase.auth().signOut();
    this.router.navigateByUrl('/');
  }

  toCollegeInfo(){
    console.log('to home page');
    this.router.navigateByUrl('/AdminCollegeInfo');
  }

  home(){
    console.log('go home page');
    this.router.navigateByUrl('/AdminMainPage');
  }
  onHistoricalData(){
    console.log('go historical data');
    //this.router.navigateByUrl('/HistoricalData');
    let navigationExtras: NavigationExtras = {
            queryParams: {
                "collegeName": this.collegeName+""
            }
        };
    this.router.navigate(['HistoricalData'],navigationExtras);


  }
  onDataVisualization(){
    console.log('go historical data');
    this.router.navigateByUrl('/DataVisualization');
    let navigationExtras: NavigationExtras = {
            queryParams: {
                "collegeName": this.collegeName+""
            }
        };
    this.router.navigate(['DataVisualization'],navigationExtras);

  }


}
