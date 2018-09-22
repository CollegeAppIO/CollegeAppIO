import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-application-page',
  templateUrl: './application-page.component.html',
  styleUrls: ['./application-page.component.css']
})
export class ApplicationPageComponent implements OnInit {

  constructor(public authServ: AuthService,private router: Router) { }

  ngOnInit() {
  }

  toHome(){
    console.log('back home');
    this.router.navigateByUrl('/home');
  }

}
