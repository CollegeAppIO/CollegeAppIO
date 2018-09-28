import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import * as firebase from 'firebase/app';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(public authServ: AuthService,private router: Router) { }

  ngOnInit() {
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

}
