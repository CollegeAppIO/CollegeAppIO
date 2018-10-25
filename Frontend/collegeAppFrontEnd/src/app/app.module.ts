import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

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
import { DataService } from './data.service';
import { HomePageComponent } from './home-page/home-page.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { HttpClientModule } from "@angular/common/http";
import { ApplicationPageComponent } from './application-page/application-page.component';
import { MatStepperModule, MatButtonModule, MatFormFieldModule,MatInputModule,MatSelectModule,MatIconModule,MatSliderModule} from '@angular/material'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CollegeSpecificPageComponent } from './college-specific-page/college-specific-page.component';
import { ViewApplicationComponent } from './view-application/view-application.component';
import { AdminMainPageComponent } from './admin-main-page/admin-main-page.component';



@NgModule({
  declarations: [
    AppComponent,
    NotificationComponent,
    GalleryComponent,
    LoginComponent,
    HomePageComponent,
    ApplicationPageComponent,
    NavBarComponent,
    CollegeSpecificPageComponent,
    ViewApplicationComponent,
    AdminMainPageComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    // To initialize AngularFire
    AngularFireModule.initializeApp(environment.firebase),
    NgbModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    MatStepperModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatSliderModule,
    MatIconModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),


  ],
  providers: [
    AuthService,
    DataService,
    NotificationServicesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
