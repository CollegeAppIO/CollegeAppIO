import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { stringify } from '@angular/compiler/src/util';


@Component({
  selector: 'app-admin-questions',
  templateUrl: './admin-questions.component.html',
  styleUrls: ['./admin-questions.component.css']
})
export class AdminQuestionsComponent implements OnInit {

 
  uid:string;
  email:string;
  collegeName:any;


  collegeQuestions: JSON;
  collegeList: any;
  list: string[] = [];
  questions:string[] = [];




  constructor(private httpClient: HttpClient,public authServ: AuthService) { }

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
        var temp = 'https://college-app-io.herokuapp.com/getQuestions';
        this.httpClient.get(temp,{headers: {'collegeName': this.collegeName}}).subscribe(data => {
              this.collegeList = data;
               for(let result of this.collegeList){
                console.log(result);
                this.questions.push(result);
              }
        })


        
      })
  
  })

  }

  addQuestion(){
    console.log("hello")
    this.questions.push(" ");
  }

  deleteQuestion(inputText: string) {
    console.log(this.questions);
    this.questions = this.questions.filter(item => item !== inputText);
  }

  submitQuestions(){
    var myString = "";
    for(let questionsIter of this.questions){
      
      
      myString += questionsIter.trim();
      myString += "||";
    }
    myString = myString.substring(0, myString.length - 2); 
    console.log(myString);

  

    
  }

  customTrackBy(index: number, obj: any): any {
    return index;
  }

}
