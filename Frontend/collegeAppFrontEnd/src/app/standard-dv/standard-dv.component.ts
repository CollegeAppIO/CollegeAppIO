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
  chart3: Chart = [];
  chart4: Chart = [];
  chart5: Chart = [];
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
           console.log(gpaData)

          cat1 = gpaData.map(gpaData => gpaData.gpa);
          cat2 = satData.map(satData => satData.sat);
          console.log(cat1);
          console.log(cat2);
          console.log(decisionData);
          let coords = cat1.map( (v,i) => ({ x: v, y: cat2[i] }) )
          var pointBackgroundColors = [];
          var gpaBackgroundColors = ['#1a1aff','#1a1aff','#1a1aff','#1a1aff']
          this.chart = new Chart('canvas',{
              type:'line',
              data: {
              datasets: [{
                label: 'GPA vs SAT',
                data: coords,
                pointBackgroundColor: pointBackgroundColors,
                borderColor: "rgba(0,0,0,0)",
                borderWidth: 0,
                backgroundColor:"rgba(0,0,0,0)"
              },
              // {
              //   label: 'Line of Best fit',
              //   data: [{x:0,y:0},{x:1,y:600},{x:2,y:1200},{x:3,y:1800},{x:4,y:2400}],
              //   type:'line',
              //   backgroundColor:"rgba(0,0,0,0)",
              //   borderColor: "rgba(0,0,204)",
              //   pointBackgroundColor: gpaBackgroundColors
              //
              // }

              ]
            },
              options: {
                scales: {
                  xAxes: [{
                    type: 'linear',
                    position: 'bottom',
                    ticks: {
                        min: 2,
                        max: 4
                    },
                  }],
                  yAxes:[{
                    ticks: {
                        min: 0,
                        max: 2400,
                        stepSize: 400,

                    }
                  }]

                }
              }
          })


          act = actData.map(actData => actData.act);
          let coords1 = cat1.map( (v,i) => ({ x: v, y: act[i] }) )
          console.log(coords1);
          this.chart1 = new Chart('canvas1',{
              type:'line',
              data: {
              datasets: [{
                label: 'GPA vs ACT',
                data: coords1,
                pointBackgroundColor: pointBackgroundColors,
                borderColor: "rgba(0,0,0,0)",
                borderWidth: 0,
                backgroundColor:"rgba(0,0,0,0)"
              },
              // {
              //   label: 'Line of Best fit',
              //   data: [{x:0,y:7},{x:1,y:14},{x:2,y:21},{x:3,y:28},{x:4,y:36}],
              //   type:'line',
              //   backgroundColor:"rgba(0,0,0,0)",
              //   borderColor: "rgba(0,0,204)",
              //   pointBackgroundColor: gpaBackgroundColors,
              //
              //
              //
              // }

              ]
            },
              options: {
                scales: {
                  xAxes: [{
                    type: 'linear',
                    position: 'bottom',
                    ticks: {
                        min: 2,
                        max: 4
                    }

                  }],
                  yAxes:[{
                    ticks: {
                        min: 0,
                        max: 36,
                        stepSize: 4,

                    }
                  }]
                },

              }
          })

          aps = numAPData.map(numAPData => numAPData.num_ap);
          let coords2 = cat1.map( (v,i) => ({ x: v, y: numAPData[i].num_ap }) )
          console.log(coords2);
          this.chart2 = new Chart('canvas2',{
              type:'line',
              data: {
              datasets: [{
                label: 'GPA vs Number of APs',
                data: coords2,
                pointBackgroundColor: pointBackgroundColors ,
                borderColor: "rgba(0,0,0,0)",
                borderWidth: 0,
                backgroundColor:"rgba(0,0,0,0)"
              },
              // {
              //   label: 'Line of Best fit',
              //   data: [{x:0,y:2},{x:1,y:4},{x:2,y:6},{x:3,y:8},{x:4,y:10}],
              //   type:'line',
              //   backgroundColor:"rgba(0,0,0,0)",
              //   borderColor: "rgba(0,0,204)",
              //   pointBackgroundColor: gpaBackgroundColors
              //
              // }

              ]
            },
              options: {
                scales: {
                  xAxes: [{
                    type: 'linear',
                    position: 'bottom',
                    ticks: {
                        min: 2,
                        max: 4
                    }
                  }],
                  yAxes:[{
                    ticks: {
                        min: 0,
                        max: 10,
                        stepSize:1,

                    }
                  }]
                },

              }
          })

          var majorCounts = [];
          var majorLabels = [];
          var list = [];
          var url1 = 'http://college-app-io.herokuapp.com/getCollegeCountMajor';
          this.httpClient.get(url1,{headers: {'collegename': this.collegeName}}).subscribe(data1 => {
                console.log(data1);

                for(var i = 0; i < Object.keys(data1).length; i++){
                  majorCounts.push(data1[i].Count);
                  majorLabels.push(data1[i].Major);
                }
                console.log(majorCounts);
                console.log(majorLabels);
                this.chart3 = new Chart('canvas3',{
                  type: 'doughnut',
                  data: {
                      datasets: [{
                          data: majorCounts,
                          backgroundColor: ["#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE", "#3D9970", "#111111", "#AAAAAA"]
                      }],
                      labels: majorLabels
                  },
                  options: {
                      responsive: true,
                      title:{
                          display: true,
                          text: "Major"
                      }
                  }
              });

          })

          var raceCounts = [];
          var raceLabels = [];
          var url2 = 'http://college-app-io.herokuapp.com/getCollegeCountRace';
          this.httpClient.get(url2,{headers: {'collegename': this.collegeName}}).subscribe(data2 => {
                console.log(data2);
                for(var i = 0; i < Object.keys(data2).length; i++){
                  raceCounts.push(data2[i].Count);
                  raceLabels.push(data2[i].Race);
                }
                console.log(raceCounts);
                console.log(raceLabels);
                this.chart4 = new Chart('canvas4',{
                  type: 'doughnut',
                  data: {
                      datasets: [{
                          data: raceCounts,
                          backgroundColor: ["#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE", "#3D9970", "#111111", "#AAAAAA"]
                      }],
                      labels: raceLabels
                  },
                  options: {
                      responsive: true,
                      title:{
                          display: true,
                          text: "Major"
                      }
                  }
              });

          })

          var sexCounts = [];
          var sexLabels = ["Male","Female"];
          var url3 = 'http://college-app-io.herokuapp.com/getCollegeCountSex';
          this.httpClient.get(url3,{headers: {'collegename': this.collegeName}}).subscribe(data2 => {
                console.log(data2);
                for(var i = 0; i < Object.keys(data2).length; i++){
                  sexCounts.push(data2[i].Count);
                  // sexLabels.push(data2[i].Sex);
                }
                console.log(sexCounts);
                console.log(sexLabels);
                this.chart5 = new Chart('canvas5',{
                  type: 'doughnut',
                  data: {
                      datasets: [{
                          data: sexCounts,
                          backgroundColor: ["#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE", "#3D9970", "#111111", "#AAAAAA"]
                      }],
                      labels: sexLabels
                  },
                  options: {
                      responsive: true,
                      title:{
                          display: true,
                          text: "Sex"
                      }
                  }
              });

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
