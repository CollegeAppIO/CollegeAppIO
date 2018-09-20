// import { BrowserModule } from '@angular/platform-browser';
// import { NgModule } from '@angular/core';
// import { HttpClientModule } from "@angular/common/http";
//
// import { AppComponent } from './app.component';
//
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { LoginComponent } from './login/login.component';
// import { NotificationComponent } from './notification/notification.component';
//
//
// @NgModule({
//   declarations: [
//     AppComponent,
//     LoginComponent,
//     NotificationComponent
//   ],
//   imports: [
//     BrowserModule,
//     HttpClientModule,
//     NgbModule.forRoot()
//
//   ],
//   providers: [],
//   bootstrap: [AppComponent]
// })
// export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { NotificationComponent } from './notification/notification.component';
import { GalleryComponent } from './gallery/gallery.component';
import { NotificationServicesService } from './notification-services.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';



@NgModule({
  declarations: [
    AppComponent,
    NotificationComponent,
    GalleryComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    // To initialize AngularFire
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [
    AuthService,
    NotificationServicesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
