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
  categories : any;
  category1: string;
  category2: string;

  collegeName: string;
  chart = [];
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
          this.categories = data;
          this.chart = new Chart('canvas',{
              type:'line',
              data:{
                //labels: this.categories,
                datasets:[
                  {
                    data: this.category1,
                    borderColor: '#3cba9f',
                    fill: false
                  },
                  {
                    data: this.category2,
                    borderColor: '#ffcc00',
                    fill: false
                  },

                ]

              }
          })
          //this.studentTable = data as JSON;
    })



  }
  onCategoryChange(){
    // var temp2 = 'http://college-app-io.herokuapp.com/getCollegeStats'
    // this.httpClient.get(temp1,{headers: {'collegeName': this.collegeName}}).subscribe(data1 => {
    //   console.log(data1);
    // })
    //var cat1 = this.category1;
    var cat1: JSON;
    var cat2: JSON;
    var temp1 = 'http://college-app-io.herokuapp.com/getStatsEachStudent';
    console.log(this.collegeName);
    this.httpClient.get(temp1,{headers: {'collegeName': this.collegeName}}).subscribe(data1 => {
      console.log(data1);
           var actData = data1[0];
           //console.log(userData);
           var satData = data1[1]
           var numAPData = data1[2]
           var gpaData = data1[3]
           var raceData = data1[4]
           var majorData = data1[5];
           var sexData = data1[6];
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
          //cat1 = [1500,2100,1800,1600,1750];
          //cat2 = [27,29,34,30,32];
          this.chart = new Chart('canvas',{
              type:'line',
              data:{
                labels: cat1,
                datasets:[
                  {

                    data: cat2,
                    borderColor: '#4169e1',
                    fill: false,
                    borderWidth: 1,
                  },

                ]

              },
              options: {
                  legend:{
                    display: false
                  },


              }
          })
          console.log('what up');
    })


  }

}
