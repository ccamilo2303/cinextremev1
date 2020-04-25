import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.css']
})
export class SendComponent implements OnInit {

  public config:any;

  constructor() { }

  ngOnInit() {

    this.config = JSON.parse(sessionStorage.getItem('payment'));

    setTimeout(() => {
      //sessionStorage.removeItem('payment');
      //eval("document.getElementById('form').submit()");
    }, 400);
    
  }

}
