
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { ResponseComponent } from './response/response.component';
import { SendComponent } from './send/send.component';


const routes: Routes = [
  {
    path : "home", 
    component : IndexComponent
  },
  {
    path: 'response',
    component: ResponseComponent
  },
  {
    path: 'send',
    component: SendComponent
  },
  
  {path : "**", component : IndexComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
