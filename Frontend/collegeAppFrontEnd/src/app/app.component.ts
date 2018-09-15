import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  serverData: JSON;
  employeeData: JSON;
  employee: JSON;

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit() {
  }

  sayHi() {
    this.httpClient.get('https://college-app-io.herokuapp.com/').subscribe(data => {
      this.serverData = data as JSON;
      console.log(this.serverData);
    })
  }

  getAllEmployees() {
    this.httpClient.get('https://college-app-io.herokuapp.com/employees').subscribe(data => {
      this.employeeData = data as JSON;
      console.log(this.employeeData);
    })
  }
  getEmployee() {
    this.httpClient.get('https://college-app-io.herokuapp.com/dbinfo').subscribe(data => {
      this.employee = data as JSON;
      console.log(this.employee);
    })
  }
}
