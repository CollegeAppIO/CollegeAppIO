// import { Component } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
//
//
// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent {
//   title = 'app';
//
//   serverData: JSON;
//   employeeData: JSON;
//   employee: JSON;
//
//   constructor(private httpClient: HttpClient, private modalService: NgbModal) {
//   }
//
//   ngOnInit() {
//   }
//
//   sayHi() {
//     this.httpClient.get('https://college-app-io.herokuapp.com/').subscribe(data => {
//       this.serverData = data as JSON;
//       console.log(this.serverData);
//     })
//   }
//
//   getAllEmployees() {
//     this.httpClient.get('https://college-app-io.herokuapp.com/employees').subscribe(data => {
//       this.employeeData = data as JSON;
//       console.log(this.employeeData);
//     })
//   }
//   getEmployee() {
//     this.httpClient.get('https://college-app-io.herokuapp.com/dbinfo').subscribe(data => {
//       this.employee = data as JSON;
//       console.log(this.employee);
//     })
//   }
//
//   openRegisterModal(){
//     console.log('enteredRegisterMode');
//   }
//
//   open(content) {
//     this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
//
//     }, (reason) => {
//
//     });
//   }
//
//   private getDismissReason(reason: any): string {
//     if (reason === ModalDismissReasons.ESC) {
//       return 'by pressing ESC';
//     } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
//       return 'by clicking on a backdrop';
//     } else {
//       return  `with: ${reason}`;
//     }
//   }
// }

import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    constructor() {   }
}
