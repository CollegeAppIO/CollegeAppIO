import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-historical-data',
  templateUrl: './historical-data.component.html',
  styleUrls: ['./historical-data.component.css']
})
export class HistoricalDataComponent implements OnInit {
  collegeName: any;
  constructor(private route: ActivatedRoute, public http: HttpClient) { }
  studentTable: any;

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
            this.collegeName = params["collegeName"];
            console.log(params["collegeName"]);
    });
    var temp = 'http://college-app-io.herokuapp.com/getCollegeStats';
    this.http.get(temp,{headers: {'collegeName': this.collegeName}}).subscribe(data => {
          // this.userData = data[0] as JSON;
          console.log(data);
          //this.studentTable = data as JSON;
    })


    var url = 'https://college-app-io.herokuapp.com/getListOfAcceptedStudents/' + this.collegeName;
    this.http.get(url).subscribe(data1 =>{
      this.studentTable = data1;
      //console.log(data1);
      var i: number;
      for(i = 0; i < this.studentTable.length; i++){
        console.log(this.studentTable[i]);
        if(this.studentTable[i].decision == '1'){
            this.studentTable[i].decision = 'Accepted';
        }else if(this.studentTable[i].decision == '0'){
            this.studentTable[i].decision = 'Rejected';
        }
      }

    })




  }

}
