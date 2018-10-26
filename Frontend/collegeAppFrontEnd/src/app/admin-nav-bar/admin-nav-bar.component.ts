import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import * as firebase from 'firebase/app';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-nav-bar',
  templateUrl: './admin-nav-bar.component.html',
  styleUrls: ['./admin-nav-bar.component.css']
})
export class AdminNavBarComponent implements OnInit {

  constructor(public authServ: AuthService,private router: Router) { }

  ngOnInit() {

  }
  onSignOut(){
    console.log('signed out');
    firebase.auth().signOut();
    this.router.navigateByUrl('/');

}

}
