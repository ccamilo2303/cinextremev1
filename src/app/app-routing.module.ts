
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { ResponseComponent } from './response/response.component';
import { SendComponent } from './send/send.component';


const routes: Routes = [
  
  {
    path: 'response',
    component: ResponseComponent
  },
  {
    path: 'send',
    component: SendComponent
  },
  {
    path : "clean", 
    component : IndexComponent
  },
  {
    path : "home", 
    component : IndexComponent
  },
  {
    path : "**", 
    redirectTo : 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
