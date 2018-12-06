import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { DataService } from "../data.service";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../auth.service';
import { Chart }  from 'chart.js';
@Component({
  selector: 'app-college-specific-page',
  templateUrl: './college-specific-page.component.html',
  styleUrls: ['./college-specific-page.component.css'],

})
export class CollegeSpecificPageComponent implements OnInit {
  collegeList: JSON;
  collegeQuestions: JSON;
  // userData: JSON;

  isDisabled: boolean = false;
  toggleq0:boolean = true;
  toggleq1:boolean = true;
  toggleq2:boolean = true;
  toggleq3:boolean = true;

  collegeName: string;
  message:string;
  testarea:string;

  questions: any;
  answers: string[] = [];

  major: string;
  uid:string;
  email:string;
  modalReference: any;
  modalReferenceMainModal: any;
  chart: Chart = [];
  chart1: Chart = [];
  chart2: Chart = [];
  chart3: Chart = [];
  chart4: Chart = [];
  chart5: Chart = [];

  constructor(private httpClient: HttpClient, private route: ActivatedRoute, private data: DataService, private modalService: NgbModal,public authServ: AuthService) { }

  ngOnInit() {
    this.authServ.fireAuth.authState.subscribe(user => {
        if(user) {
          this.uid = user.uid;
          this.email = user.email;          //console.log(this.uid);

        }

        var temp = 'http://college-app-io.herokuapp.com/getStudentResponse';
        this.httpClient.get(temp,{headers: {'collegeName': this.message, 'studentid':this.uid}}).subscribe(data => {


              if(data == 'Student Already Applied'){
                this.isDisabled = true;
                console.log("user submitted");
              }else{
                this.isDisabled = false;
              }

              console.log(data[0].major);
              console.log(data[0].questions);

              this.major = data[0].major;
              if(data[0].questions == null){
                this.answers = [''];
              }else{
                this.answers = data[0].questions;
              }

              console.log(this.answers);

              // this.q1 = data[0].q1;
              // this.q2 = data[0].q2;
              // this.q3 = data[0].q3;
              // this.major = data[0].major;


        })

        var temp = 'https://college-app-io.herokuapp.com/getQuestions';
        this.httpClient.get(temp,{headers: {'collegeName': this.message}}).subscribe(data => {
              console.log(data);
              this.questions = data;
        })

    })

    this.data.currentMessage.subscribe(message => this.message = message);

    var temp = 'https://college-app-io.herokuapp.com/getCollegeInfo';
    this.httpClient.get(temp,{headers: {'collegeName': this.message}}).subscribe(data => {
          this.collegeList = data[0] as JSON;
          // console.log(this.collegeList);
    })

    var temp = 'http://college-app-io.herokuapp.com/getQuestions';
    this.httpClient.get(temp,{headers: {'collegeName': this.message}}).subscribe(data => {
          this.collegeQuestions = data[0] as JSON;
          // console.log(this.collegeQuestions);
    })

    // var temp = 'http://college-app-io.herokuapp.com/getStudentResponse';
    // this.httpClient.get(temp,{headers: {'collegeName': this.message, 'studentid':this.uid}}).subscribe(data => {
    //       // this.userData = data[0] as JSON;
    //       this.q1 = data[0].q1;
    //       this.q2 = data[0].q2;
    //       this.q3 = data[0].q3;
    //       this.major = data[0].major;
    //       console.log(this.userData);
    // })

    var cat1: any;
    var cat2: any;
    var act: any;
    var aps: any;
    var temp1 = 'http://college-app-io.herokuapp.com/getStatsEachStudent';
    this.httpClient.get(temp1,{headers: {'collegeName': this.message}}).subscribe(data1 => {
      console.log(data1);
           var actData = data1[0];
           var satData = data1[1]
           var numAPData = data1[2]
           var gpaData = data1[3]
           var raceData = data1[4]
           var majorData = data1[5];
           var sexData = data1[6];
           var decisionData = data1[7];

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
                },

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
                pointBackgroundColor: pointBackgroundColors,
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
          this.httpClient.get(url1,{headers: {'collegename': this.message}}).subscribe(data1 => {
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
          this.httpClient.get(url2,{headers: {'collegename': this.message}}).subscribe(data2 => {
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
          this.httpClient.get(url3,{headers: {'collegename': this.message}}).subscribe(data2 => {
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
            if (decisionData[i].decision === 1) {
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
  }

  change(){
    console.log("hello")
    this.ngOnInit();
  }

  onLoad() {
    this.ngOnInit();
  }
  loadData(){
    this.ngOnInit();
    }

    //on change event
    ngOnChanges(){
      this.ngOnInit();
    }

    //capture data on other event
    otherEvent(){
      this.ngOnInit();
    }

  addToWatchList(){
    var url = 'http://college-app-io.herokuapp.com/addWatchList';
    this.httpClient.get(url,{headers: {'collegename': this.message, 'studentid':this.uid}}).subscribe(data => {
          // this.userData = data[0] as JSON;

          console.log(data);
    })
    //console.log(this.collegeName);
  }

  open(content) {
    this.modalReferenceMainModal = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});

  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  submitAppl(){
    console.log("clicked submit");
    console.log(this.answers);

    console.log(this.major);
    console.log(this.uid);
    console.log(this.message);

    var myString = "";
    for(let questionsIter of this.answers){
      if(questionsIter.trim().length > 0){
        myString += questionsIter.trim();
        myString += "||";
      }
    }
    myString = myString.substring(0, myString.length - 2);
    console.log(myString);

    this.httpClient.post('https://college-app-io.herokuapp.com/postResponse', {

      collegeName: this.message,
      studentid: this.uid,
      questions: myString,
      appliedStatus: 0,
      major: this.major
    })
      .subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log("Error occured");
        }
      );
      this.modalReferenceMainModal.close();

      var temp = 'http://college-app-io.herokuapp.com/sendEmail/'+this.email+'/'+this.message;
      this.httpClient.get(temp).subscribe(data => {
            console.log(data);
      })

      this.isDisabled = true;
      // this.modalReference.close();
      this.modalReferenceMainModal.close();
  }

  saveAppl(){
    console.log(this.major);
    console.log(this.uid);
    console.log(this.message);

    var myString = "";
    for(let questionsIter of this.answers){
      if(questionsIter.trim().length > 0){
        myString += questionsIter.trim();
        myString += "||";
      }
    }
    myString = myString.substring(0, myString.length - 2);
    console.log(myString);

    this.httpClient.post('https://college-app-io.herokuapp.com/postResponse', {
      collegeName: this.message,
      studentid: this.uid,
      questions: myString,
      appliedStatus: 0,
      major: this.major
    })
      .subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log("Error occured");
        }
      );
      this.modalReferenceMainModal.close();
  }

  confirm(contenttemp){

    console.log("clicked submit");
    console.log(this.answers);

      // console.log(!this.q1 || 0 === this.q1.length);
      // if(!this.major || 0 === this.major.length){
      //   console.log("no q1");
      //   this.toggleq0 = false;
      // }else{
      //   this.toggleq0 = true;
      // }
      // if(!this.q1 || 0 === this.q1.length){
      //   console.log("no q1");
      //   this.toggleq1 = false;
      // }else{
      //   this.toggleq1 = true;
      // }
      // if(!this.q2 || 0 === this.q2.length){
      //   console.log("no q1");
      //   this.toggleq2 = false;
      // }else{
      //   this.toggleq2 = true;
      // }
      // if(!this.q3 || 0 === this.q3.length){
      //   console.log("no q1");
      //   this.toggleq3 = false;
      // }else{
      //   this.toggleq3 = true;
      // }
      // if(this.q1 && this.q2 && this.q3 && this.major){
      //   console.log("cofirm");
      //   this.modalReference = this.modalService.open(contenttemp, { centered: true });
      // }
  }

  cancel(){
    this.modalReference.close();
  }



}
