import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth.service';
import {Router,NavigationExtras} from '@angular/router';
import {StudentApplicationDetailsComponent}  from '../student-application-details/student-application-details.component';


@Component({
  selector: 'app-admin-main-page',
  templateUrl: './admin-main-page.component.html',
  styleUrls: ['./admin-main-page.component.css']
})
export class AdminMainPageComponent implements OnInit {
  studentTable: JSON;
  collegeName: any;


  constructor(private httpClient: HttpClient,public authServ: AuthService,private router: Router) { }

  ngOnInit() {
    this.authServ.fireAuth.authState.subscribe(user => {
        if(user) {
          this.uid = user.uid;
          this.email = user.email;          //console.log(this.uid);

        }

        var url = 'https://college-app-io.herokuapp.com/getCollegeNameForUID/' + this.uid;
        this.httpClient.get(url).subscribe(data1 =>{
          console.log(data1);
          this.collegeName = data1;

          var temp = 'http://college-app-io.herokuapp.com/getApplicationPool';
          this.httpClient.get(temp,{headers: {'collegeName': this.collegeName}}).subscribe(data => {
                // this.userData = data[0] as JSON;
                console.log(data);
                this.studentTable = data as JSON;
          })


        })
    })






    // console.log(this.studentTable);
  }

  openStudentDetails(student:any){
    console.log(student);
    console.log(this.collegeName);
    let navigationExtras: NavigationExtras = {
            queryParams: {
                "id": student.studentid+"",
                "collegeName": this.collegeName+""
            }
        };
    this.router.navigate(['AdminStudentApplication'],navigationExtras);
  }

  onAccept(student){
    console.log(student);


    // var url = 'https://college-app-io.herokuapp.com/sendEmailStatus/' + this.email+ '/' this.collegeName + '/' + student.studentid '/1'  /<collegename>/<studentid>/<accept_status>'
    // this.http.post(url, {
    //   studentid: this.uid,
    //   fname: this.firstNameStr,
    //   ,
    //
    // })
    //   .subscribe(
    //     res => {
    //       console.log(res);
    //     },
    //     err => {
    //       console.log("Error occured");
    //     }
    //   );
  }

}
