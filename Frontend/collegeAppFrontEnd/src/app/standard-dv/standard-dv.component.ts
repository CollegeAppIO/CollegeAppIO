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
  chart1: Chart = [];
  chart2: Chart = [];
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
    var act: any;
    var aps: any;
   
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

          
          act = actData.map(actData => actData.act);
          let coords1 = cat1.map( (v,i) => ({ x: v, y: act[i] }) )
          console.log(coords1);
          this.chart1 = new Chart('canvas1',{
              type:'scatter',
              data: {
              datasets: [{
                label: 'GPA vs ACT',
                data: coords1,
                pointBackgroundColor: pointBackgroundColors
              }

              ]
            },
              options: {
                scales: {
                  xAxes: [{
                    type: 'linear',
                    position: 'bottom',
                    
                  }]
                },
                showLine:'true'
              }
          })

          aps = numAPData.map(numAPData => numAPData.num_ap);
          let coords2 = cat1.map( (v,i) => ({ x: v, y: numAPData[i].num_ap }) )
          console.log(coords2);
          this.chart2 = new Chart('canvas2',{
              type:'scatter',
              data: {
              datasets: [{
                label: 'GPA vs Number of APs',
                data: coords2,
                pointBackgroundColor: pointBackgroundColors
              }

              ]
            },
              options: {
                scales: {
                  xAxes: [{
                    type: 'linear',
                    position: 'bottom',
                    
                  }]
                },
                showLine:'true'
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
          this.chart1.update();
          this.chart2.update();
          console.log('what up');
    })

  })

})

  }

  }
