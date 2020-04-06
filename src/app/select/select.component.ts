import { Component, OnInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

  public redirect(tipo){
    if(tipo == 'normal'){
      window.location.href = "http://cinextreme.co/appCine/";
    }else{
      window.location.href = "http://cinextreme.co/appCineL/cartelera.php";
    }
  }

}

