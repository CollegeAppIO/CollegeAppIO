import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { DataService } from "../data.service";

@Component({
  selector: 'app-college-specific-page',
  templateUrl: './college-specific-page.component.html',
  styleUrls: ['./college-specific-page.component.css'],

})
export class CollegeSpecificPageComponent implements OnInit {
  collegeList: JSON;
  collegeName: string;
  message:string;

  constructor(private httpClient: HttpClient, private route: ActivatedRoute, private data: DataService) { }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => {this.message = message);
    var temp = 'https://college-app-io.herokuapp.com/getCollegeInfo';
    this.httpClient.get(temp,{headers: {'collegeName': this.message}}).subscribe(data => {
          this.collegeList = data[0] as JSON;
          console.log(this.collegeList);
    })
  }

}
