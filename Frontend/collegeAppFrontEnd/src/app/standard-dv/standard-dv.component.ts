import { Component, OnInit } from '@angular/core';
import { Chart }  from 'chart.js';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs/Rx';


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
  constructor(public httpClient: HttpClient) { }


  ngOnInit() {
    var cat1: any;
    var cat2: any;
    var temp1 = 'http://college-app-io.herokuapp.com/getStatsEachStudent';
    this.httpClient.get(temp1,{headers: {'collegeName': 'Purdue University'}}).subscribe(data1 => {
      console.log(data1);
           var actData = data1[0];
           //console.log(userData);
           var satData = data1[1]
           var numAPData = data1[2]
           var gpaData = data1[3]
           var raceData = data1[4]
           var majorData = data1[5];
           var sexData = data1[6];
           var decisionData = data1[7];
           //var sexes = data1[2] as JSON;
          if(this.category1 == 'act'){
            cat1 = actData.map(actData => actData.act);
            console.log(cat1);
          }else if(this.category1 == 'sat'){
            cat1 = satData.map(satData => satData.sat);
          }
          else if(this.category1 == 'gpa'){
            cat1 = gpaData.map(gpaData => gpaData.gpa);
          }
          else if(this.category1 == 'num_ap'){
            cat1 = numAPData.map(numAPData => numAPData.num_ap);
          }
          else if(this.category1 == 'race'){
            cat1 = raceData.map(raceData => raceData.race);
          }
          else if(this.category1 == 'major'){
            cat1 = majorData.map(majorData => majorData.major);
          }
          else if(this.category1 == 'sex'){
            cat1 = sexData.map(sexData => sexData.sex);
          }
          if(this.category2 == 'act'){
            cat2 = actData.map(actData => actData.act);
            console.log(cat1);
          }else if(this.category2 == 'sat'){
            cat2 = satData.map(satData => satData.sat);
          }
          else if(this.category2 == 'gpa'){
            cat2 = gpaData.map(gpaData => gpaData.gpa);
          }
          else if(this.category2 == 'num_ap'){
            cat2 = numAPData.map(numAPData => numAPData.num_ap);
          }
          else if(this.category2 == 'race'){
            cat2 = raceData.map(raceData => raceData.race);
          }
          else if(this.category2 == 'major'){
            cat2 = majorData.map(majorData => majorData.major);
          }
          else if(this.category2 == 'sex'){
            cat2 = sexData.map(sexData => sexData.sex);
          }

          console.log('hi');
          console.log(this.category1);
          console.log(this.category2);
          console.log(cat1);
          cat1 = gpaData.map(gpaData => gpaData.gpa);
          cat2 = satData.map(satData => satData.sat);
          let coords = cat1.map( (v,i) => ({ x: v, y: cat2[i] }) )
          console.log(decisionData);
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



  }

  }
