import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Chart }  from 'chart.js';
@Component({
  selector: 'app-student-dynamic',
  templateUrl: './student-dynamic.component.html',
  styleUrls: ['./student-dynamic.component.css']
})
export class StudentDynamicComponent implements OnInit {

  dropDownOne: any;
  dropDownTwo: any;
  categories = ['gpa','sat','act','num_ap'];

  majorCategory: any;
  sexCategory: any;
  raceCategory: any;

  category1: string;
  category2: string;

  collegeName: string;
  colleges: any;
  
  chart: Chart = [];
  constructor(public httpClient: HttpClient) { }

  ngOnInit() {



    this.raceCategory="All";
    this.sexCategory="All";
    this.majorCategory="All";
    this.category1="gpa";
    this.category2="act";

    var temp1 = 'http://college-app-io.herokuapp.com/getData';
    console.log(this.collegeName);

    var temp = 'https://college-app-io.herokuapp.com/getCollegeName';
    this.httpClient.get(temp).subscribe(data => {
          this.colleges = data ;
          console.log(this.colleges);

    })
    this.httpClient.get(temp1,{headers: {'collegeName': this.collegeName,'param1':"gpa",'param2':"act",'vars':"",'qualitative':""}}).subscribe(data1 => {
      console.log(data1);

           var param1 = data1[0];
           var param2 = data1[1]
           var decisionData = data1[2]

           console.log(param1)



           var cat1 = param1.map(param1 => param1.param1);
          var cat2 = param2.map(param2 => param2.param2);

          // console.log(cat1);
          // console.log(cat2);
          // console.log(decisionData);
          let coords = cat1.map( (v,i) => ({ x: v, y: cat2[i] }) )
          // console.log(coords);
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

    console.log(this.raceCategory);
    console.log(this.sexCategory);
    console.log(this.majorCategory);

    var filtercatogeries:any = [];
    var filtercatogeriesName:any = [];

    if(this.majorCategory && !(this.majorCategory === "All")){
      filtercatogeries.push(this.majorCategory);
      filtercatogeriesName.push("major");
    }else{
      console.log("major does no exist")
    }

    if(this.sexCategory && !(this.sexCategory === "All")){
      filtercatogeries.push(this.sexCategory);
      filtercatogeriesName.push("sex");
    }else{
      console.log("major does no exist")
    }

    if(this.raceCategory && !(this.raceCategory === "All")){
      filtercatogeries.push(this.raceCategory);
      filtercatogeriesName.push("race");
    }else{
      console.log("major does no exist")
    }

    var finalStr="";
    var finalCat="";
    for (let entry of filtercatogeries) {
      finalStr=finalStr+"||"+entry;
    }
    for (let entry of filtercatogeriesName) {
      finalCat=finalCat+"||"+entry;
    }
    finalCat = finalCat.substring(2);
    finalStr = finalStr.substring(2);

    console.log(finalStr);
    console.log(finalCat);


    var temp1 = 'http://college-app-io.herokuapp.com/getData';
    console.log(this.collegeName);
    this.httpClient.get(temp1,{headers: {'collegeName': this.collegeName,'param1':this.category1,'param2':this.category2,'vars':finalCat,'qualitative':finalStr}}).subscribe(data1 => {
      console.log(data1);

           var param1 = data1[0];
           var param2 = data1[1]
           var decisionData = data1[2]

           console.log(param1)



           cat1 = param1.map(param1 => param1.param1);
           cat2 = param2.map(param2 => param2.param2);

          // console.log(cat1);
          // console.log(cat2);
          // console.log(decisionData);
          let coords = cat1.map( (v,i) => ({ x: v, y: cat2[i] }) )
          // console.log(coords);
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

    })



  }

}
