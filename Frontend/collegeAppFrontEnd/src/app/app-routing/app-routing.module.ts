import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { HomePageComponent } from '../home-page/home-page.component';
import { ApplicationPageComponent } from '../application-page/application-page.component';
import { CollegeSpecificPageComponent } from '../college-specific-page/college-specific-page.component';
import {ViewApplicationComponent}  from '../view-application/view-application.component';
import {AdminMainPageComponent}  from '../admin-main-page/admin-main-page.component';
import {AdminCollegeInfoComponent}  from '../admin-college-info/admin-college-info.component';
import {StudentApplicationDetailsComponent}  from '../student-application-details/student-application-details.component';
import {HistoricalDataComponent}  from '../historical-data/historical-data.component';
import {DataVisualizationComponent}  from '../data-visualization/data-visualization.component';
import {AdminQuestionsComponent} from '../admin-questions/admin-questions.component';
import {StandardDVComponent} from '../standard-dv/standard-dv.component';


// @NgModule({
//   imports: [
//     CommonModule
//   ],
//   declarations: []
// })
// export class AppRoutingModule { }

const routes: Routes = [
        {
            path: '',
            component: LoginComponent,
        },
        {
            path: 'home',
            component: HomePageComponent,
        },
        {
            path: 'application',
            component: ApplicationPageComponent,
        },
        {
            path: 'CollegePage',
            component: CollegeSpecificPageComponent,
        },
        {
            path: 'ViewApplication',
            component: ViewApplicationComponent,
        },{
            path: 'AdminMainPage',
            component: AdminMainPageComponent,
        },{
            path: 'AdminCollegeInfo',
            component: AdminCollegeInfoComponent,
        },{
            path: 'AdminStudentApplication',
            component: StudentApplicationDetailsComponent,
        },
        {
            path: 'HistoricalData',
            component: HistoricalDataComponent,
        },
        {
            path: 'DataVisualization',
            component: DataVisualizationComponent,
        },
        {
            path: 'AdminQuestions',
            component: AdminQuestionsComponent,
        },{
            path: 'StandardDV',
            component: StandardDVComponent,
        },

    ];

    @NgModule({
        imports: [
            RouterModule.forRoot(routes)
        ],
        exports: [
            RouterModule
        ],
        declarations: []
    })
    export class AppRoutingModule { }
