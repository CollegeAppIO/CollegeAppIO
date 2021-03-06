import { Component, OnInit, AfterViewInit,Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import * as firebase from 'firebase/app';
import * as $ from 'jquery';
import { NotificationServicesService } from '../notification-services.service';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router'
import { HttpClient } from '@angular/common/http';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import { HttpRequest } from "@angular/common/http";
import { HttpEventType } from "@angular/common/http";
import { HttpResponse } from "@angular/common/http";
import {MatProgressBarModule} from '@angular/material/progress-bar';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
@Injectable()
export class LoginComponent implements OnInit {

  public fileString
  user: string;
  loggedIn = false;
  userObj: any;

  pDone: any;

  useremail: string;
  password: string;
  //isAdmin: boolean;

  modalReference: any;

  modalStatus: boolean;
  isAdmin: boolean;
  isAdminProof: any;
  collegeName:string;

  //collegeList: JSON;
  colleges: any;
  user_file: any;

  typeOfUser: string;

  checkRegisterType: boolean = true;

  formatter = (result: string) => result.toUpperCase();

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term === '' ? []
        : this.colleges.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )





  constructor(public authServ: AuthService, private noteSvc: NotificationServicesService,private modalService: NgbModal, private router: Router, private httpClient: HttpClient) {
    this.fileString
  }

  open(content) {
    this.modalReference = this.modalService.open(content);
    this.modalStatus = true;
  }

  uploadProfilePic() {
    
    var f = (<HTMLInputElement>document.getElementById('ufile')).files[0];
    console.log({f});
    
    var r = new FileReader();
    var data;
    r.onload = () => {
      console.log(r.result)
      data = r.result
      this.uploadFileBlob(data,f.name)
    }
    
    r.readAsDataURL(f);

  }

  // progbar is used as a listener for HTML progressbar to load
  progbar() {
    return this.pDone;
  }
  
  uploadFileBlob(blob:any, filename:string) {
      console.log({blob})
      console.log({filename})

      const req = new HttpRequest('POST', 'https://college-app-io.herokuapp.com/postImage', 
      {'image':blob, 'fname':filename},
      {reportProgress: true},
      );
      this.httpClient.request(req).subscribe(event => {
        // Via this API, you get access to the raw event stream.
        // Look for upload progress events.
        if (event.type === HttpEventType.UploadProgress) {
          // This is an upload progress event. Compute and show the % done:
          const percentDone = Math.round(100 * event.loaded / event.total);
          this.pDone = percentDone;

          console.log(`File is ${percentDone}% uploaded.`);
          this.progbar();
          
          console.log(event)
        } else if (event instanceof HttpResponse) {
          console.log('File is completely uploaded!');
          console.log(event.body['ADMIN'])
          this.isAdminProof = event.body['ADMIN'];
          
          
        }
      });
      // return this.httpClient.post('https://college-app-io.herokuapp.com/postImage', {
      //   image: blob,
      //   fname: filename,
      //   headers: {
      //     reportProgress: true,
      //     'Content-Type': 'image/png',
      //     'Access-Control-Allow-Origin': '*',
      //     'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT'
      //   }
      // })
      // .subscribe(
      //     event => {
      //       console.log(event)
      //     },
      //     err => {
      //       console.log(err);
      //     }
      //   )
      //   ;

    }

  uploadToUserTable(uid:string,isAdmin:boolean) {
      this.checkRegisterType = false;
      if(this.isAdmin){
        this.httpClient.post('https://college-app-io.herokuapp.com/addAdmin', {
          adminid: uid,
          collegeName: this.collegeName

        })
          .subscribe(
            res => {
              console.log(res);
            },
            err => {
              console.log("Error occured");
            }
          );

          this.router.navigateByUrl('/AdminMainPage');
      }else{
        var temp = 'https://college-app-io.herokuapp.com/students/'+uid+'/'+'0';
        this.httpClient.get(temp).subscribe(data => {
        console.log(data);
        this.router.navigateByUrl('/home');
        console.log('really fucked up in uploadToUserTable')
    })
    console.log('sent to the db');
  }
  }

  ngOnInit() {
    this.authChanged();
    console.log(this.isAdmin);
    var temp = 'https://college-app-io.herokuapp.com/getCollegeName';
    this.httpClient.get(temp).subscribe(data => {
          this.colleges = data ;
          console.log(this.colleges);

    })
  }

  onGLogin() {

    this.authServ.loginWithGoogle();

  }

  onFBLogin() {
    this.authServ.loginWithFB();
  }

  onStudentClick(){

    console.log(this.isAdmin);
  }
  onAdminClick(){

      console.log(this.isAdmin);

  }

  onSignUp() {
    firebase.auth().signOut();
    if (this.useremail === undefined || this.password === undefined || this.isAdminProof === 'FALSE') {
        this.noteSvc.setNotification(
          'Missing Information',
          'User name and password are mandatory!'
        );
        $('.notification-btn').click();
    } else if (this.useremail.length < 4) {
        this.noteSvc.setNotification(
          'Missing Information',
          'Invalid Email address entered!'
        );
      return;
    } else if (this.password.length < 4) {
      this.noteSvc.setNotification(
        'Missing Information',
        'Invalid password entered!'
        );
      return;
    } else {
      // Sign in with email and pass.
      // [START createwithemail]
      firebase.auth().createUserWithEmailAndPassword(this.useremail, this.password)
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;

        if (errorCode === 'auth/weak-password') {
          this.noteSvc.setNotification(
            'Sign Up Failed',
            'Password entered is too weak!'
          );
          $('.notification-btn').click();
        } else {
          this.noteSvc.setNotification(
            'Error during signup',
            errorMessage
          );
          $('.notification-btn').click();
        }
        console.log(error);
      });
      console.log('hello')
    }
    //firebase.auth().signOut();
  }

  onSignIn() {
    if (firebase.auth().currentUser) {
      // [START signout]
        firebase.auth().signOut();
        document.getElementById('login-section').hidden = false;
      // [END signout]
    } else {
      if (this.useremail === undefined) {
        this.noteSvc.setNotification(
          'Invalid Information',
          'Please enter valid user name!'
        );
        $('.notification-btn').click();
        return;
      } else if (this.password === undefined) {
        this.noteSvc.setNotification(
          'Invalid Information',
          'Please enter valid password!'
        );
        $('.notification-btn').click();
        return;
      }
      const email = this.useremail;
      const pass = this.password;
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        // Existing and future Auth states are now persisted in the current
        // session only. Closing the window would clear any existing state even
        // if a user forgets to sign out.
        // ...
        // New sign-in will be persisted with session persistence.
        return firebase.auth().signInWithEmailAndPassword(email, pass);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        this.noteSvc.setNotification(
          'Error during Login',
           error.message
        );
        $('.notification-btn').click();
      });
      // [END authwithemail]
    }
  }

  onGHubLogin() {
    this.authServ.loginWithGHub();

  }

  authChanged() {
    firebase.auth().onAuthStateChanged((user) => {

        // [START_EXCLUDE silent]
      $('#quickstart-sign-in').removeAttr('disabled');
     // document.getElementById('quickstart-verify-email').disabled = true;
      // [END_EXCLUDE]
      if (user) {
        // User is signed in.
        const displayName = user.displayName;
        const email = user.email;
        const emailVerified = user.emailVerified;
        const photoURL = user.photoURL;
        const isAnonymous = user.isAnonymous;
        const uid = user.uid;
        const providerData = user.providerData;

         console.log(email);
        // console.log(uid);
        // console.log(this.status);

        if(this.modalStatus){
          this.modalReference.close();
          //this.router.navigateByUrl('/home');

          this.uploadToUserTable(user.uid,this.isAdmin);
          this.modalStatus = false;
        }
        // this.router.navigateByUrl('/home');

        var temp = 'https://college-app-io.herokuapp.com/getIDType/'+uid;
        this.httpClient.get(temp).subscribe(data => {
              console.log(data);
              // this.typeOfUser = data;
              if(data === 'student' && this.checkRegisterType){
                console.log('defintly fucked up')
                this.router.navigateByUrl('/home');
              }else if(data === 'admin' && this.checkRegisterType){
                console.log('fucked up')
                this.router.navigateByUrl('/AdminMainPage');
              }
        })

        // console.log(this.typeOfUser);
        // if(this.typeOfUser === 'student'){
        //   this.router.navigateByUrl('/home');
        // }else{
        //   console.log('fucked up')
        //   this.router.navigateByUrl('/AdminMainPage');
        // }




      } else {
          console.log('user signed out');
        // User is signed out.
      }

    });
  }

  onSendPasswordReset() {

      firebase.auth().sendPasswordResetEmail(this.useremail).then(() => {
        this.noteSvc.setNotification(
          'Email Sent',
          'Email sent with instructions. Please follow'
        );
        $('.notification-btn').click();
        // [END_EXCLUDE]
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode === 'auth/invalid-email') {
          this.noteSvc.setNotification(
            'Error during password reset',
            'Invalid Email Id provided!'
          );
          $('.notification-btn').click();
        } else if (errorCode === 'auth/user-not-found') {
          this.noteSvc.setNotification(
            'Error during password reset',
            'Sorry. User not found.'
          );
          $('.notification-btn').click();
        } else {
          this.noteSvc.setNotification(
            'Error during password reset',
            error
          );
          $('.notification-btn').click();
        }

      });
  }

}
