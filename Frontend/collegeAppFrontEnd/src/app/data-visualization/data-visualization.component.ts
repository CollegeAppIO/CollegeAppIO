import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Chart }  from 'chart.js';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-data-visualization',
  templateUrl: './data-visualization.component.html',
  styleUrls: ['./data-visualization.component.css']
})
export class DataVisualizationComponent implements OnInit {

  dropDownOne: any;
  dropDownTwo: any;
  categories = ['gpa','sat','act','num_ap'];

  majorCategory: any;
  sexCategory: any;

  category1: string;
  category2: string;

  collegeName: string;
  chart: Chart = [];
  constructor(public httpClient: HttpClient, private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
            this.collegeName = params["collegeName"];
            console.log(params["collegeName"]);
    });
    var temp = 'http://college-app-io.herokuapp.com/getCategories';
    this.httpClient.get(temp).subscribe(data => {
          // this.userData = data[0] as JSON;
          console.log(data);
          // this.categories = data;
          
          // this.chart = new Chart('canvas',{
          //     type:'line',
          //     data:{
          //       //labels: this.categories,
          //       datasets:[
          //         {
          //           data: this.category1,
          //           borderColor: '#3cba9f',
          //           fill: false
          //         },
          //         {
          //           data: this.category2,
          //           borderColor: '#ffcc00',
          //           fill: false
          //         },

          //       ]

          //     }
          // })
          //this.studentTable = data as JSON;
    })

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

          var cat1 = gpaData.map(gpaData => gpaData.gpa);
          var cat2 = satData.map(satData => satData.sat);
          console.log(cat1);
          console.log(cat2);
          console.log(decisionData);
          let coords = cat1.map( (v,i) => ({ x: v, y: cat2[i] }) )
          console.log(coords);
          var pointBackgroundColors = [];
          // this.chart = new Chart('canvas',{
          //     type:'scatter',
          //     data: {
          //     datasets: [{
          //       label: 'GPA vs SAT',
          //       data: coords,
          //       pointBackgroundColor: pointBackgroundColors
          //     }

          //     ]
          //   },
          //     options: {
          //       scales: {
          //         xAxes: [{
          //           type: 'linear',
          //           position: 'bottom'
          //         }]
          //       }
          //     }
          // })
        })




  }
  onCategoryChange(){
    // var temp2 = 'http://college-app-io.herokuapp.com/getCollegeStats'
    // this.httpClient.get(temp1,{headers: {'collegeName': this.collegeName}}).subscribe(data1 => {
    //   console.log(data1);
    // })
    //var cat1 = this.category1;
    var param1Arr = [];
    var c = []
    var param2Arr = [];
    var decisionArr = [];
    var plotData: any= [];

    var cat1: any;
    var cat2: any;

    var temp1 = 'http://college-app-io.herokuapp.com/getData';
    console.log(this.collegeName);
    this.httpClient.get(temp1,{headers: {'collegeName': this.collegeName,'param1':"sat",'param2':"act",'vars':"sex||race||major",'qualitative':"Male||Asian||Computer Science"}}).subscribe(data1 => {
      console.log(data1);

           var param1 = data1[0];
           var param2 = data1[1]
           var decisionData = data1[2]
          
           console.log(param1)

           cat1 = param1.map(param1 => param1.param1);
           cat2 = param2.map(param2 => param2.param2);
          console.log(cat1);
          console.log(cat2);
          console.log(decisionData);
          let coords = cat1.map( (v,i) => ({ x: v, y: cat2[i] }) )
          console.log(coords);
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

    })
  


  }

}
