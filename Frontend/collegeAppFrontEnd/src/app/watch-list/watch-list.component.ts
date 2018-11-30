import { Component, OnInit } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { AuthService } from '../auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
@Component({
  selector: 'app-watch-list',
  templateUrl: './watch-list.component.html',
  styleUrls: ['./watch-list.component.css']
})
export class WatchListComponent implements OnInit {

  watchlist = [];
  uid: string;
  collegeName: string;
  constructor(private httpClient: HttpClient, public authServ: AuthService) { }

  ngOnInit() {
    // this.authServ.fireAuth.authState.subscribe(user => {
    //     if(user) {
    //       //this.uid = user.uid;
    //       var url = 'http://college-app-io.herokuapp.com/getWatchList';
    //       this.httpClient.get(url,{headers: {'studentid':user.uid}}).subscribe(data => {
    //             // this.userData = data[0] as JSON;
    //             this.watchlist = data;
    //             console.log(data);
    //       })
    //     }
    //   }




  }

}
