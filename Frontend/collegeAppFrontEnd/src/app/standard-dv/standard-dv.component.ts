import { Component, OnInit } from '@angular/core';
import { Chart }  from 'chart.js';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs/Rx';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-standard-dv',
  templateUrl: './standard-dv.component.html',
  styleUrls: ['./standard-dv.component.css']
})
export class StandardDVComponent implements OnInit {

  chart: Chart = [];
  categories: string;
  category1: string;
  category2: string;
  collegeName: any;
  uid:string;
  email:string;
  constructor(public httpClient: HttpClient, public authServ: AuthService) { }


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

    var cat1: any;
    var cat2: any;
    var temp1 = 'http://college-app-io.herokuapp.com/getStatsEachStudent';
    this.httpClient.get(temp1,{headers: {'collegeName': this.collegeName}}).subscribe(data1 => {
      console.log(data1);
           var actData = data1[0];
           var satData = data1[1]
           var numAPData = data1[2]
           var gpaData = data1[3]
           var raceData = data1[4]
           var majorData = data1[5];
           var sexData = data1[6];
           var decisionData = data1[7];

          cat1 = gpaData.map(gpaData => gpaData.gpa);
          cat2 = satData.map(satData => satData.sat);
          console.log(cat1);
          console.log(cat2);
          console.log(decisionData);
          let coords = cat1.map( (v,i) => ({ x: v, y: cat2[i] }) )
          var pointBackgroundColors = [];
          this.chart = new Chart('canvas',{
              type:'scatter',
              data: {
              datasets: [{
                label: 'GPA vs SAT',
                data: coords,
                pointBackgroundColor: pointBackgroundColors
              }

              ]
            },
              options: {
                scales: {
                  xAxes: [{
                    type: 'linear',
                    position: 'bottom'
                  }]
                }
              }
          })

          for (var i = 0; i < decisionData.length; i++) {
            console.log(decisionData[i]);
            if (decisionData[i].decision < 1) {
              pointBackgroundColors.push("#00ff00");

            } else {
              console.log("else");
              pointBackgroundColors.push("#CC0000");
            }
          }

          this.chart.update();
          console.log('what up');
    })

  })

})

  }

  }
