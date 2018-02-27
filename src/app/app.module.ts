import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { FormsModule, ReactiveFormsModule } from "@angular/forms";


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AgmCoreModule } from '@agm/core';

const appRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  { 
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: false}
    ),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAXXUGZcwF1Ro4s59-CONLxGS0mK5x9dSM',
      libraries: ['places']
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
