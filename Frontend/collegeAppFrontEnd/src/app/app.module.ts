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
import { HomePageComponent } from './home-page/home-page.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { HttpClientModule } from "@angular/common/http";
import { ApplicationPageComponent } from './application-page/application-page.component';
import { MatStepperModule, MatButtonModule, MatFormFieldModule,MatInputModule,MatSelectModule} from '@angular/material'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    NotificationComponent,
    GalleryComponent,
    LoginComponent,
    HomePageComponent,
    ApplicationPageComponent,

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
    BrowserAnimationsModule,
    FormsModule,


  ],
  providers: [
    AuthService,
    NotificationServicesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
