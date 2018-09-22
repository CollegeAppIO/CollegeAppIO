import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { HomePageComponent } from '../home-page/home-page.component';
import { ApplicationPageComponent } from '../application-page/application-page.component';

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
