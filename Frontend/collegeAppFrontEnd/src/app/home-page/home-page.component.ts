import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import * as firebase from 'firebase/app';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(public authServ: AuthService,private router: Router) { }

  ngOnInit() {
  }

  onSignOut(){
      console.log('signed out');
      firebase.auth().signOut();
      this.router.navigateByUrl('/');

  }

}
