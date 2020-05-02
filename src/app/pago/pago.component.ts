import { Component, OnInit, Input  } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from './../../environments/environment';
import {Md5} from 'ts-md5/dist/md5';
import { CodeService } from '../code.service';
import Swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit {

  public config:any;
  
  @Input() 
  tipo :string = '';

  @Input() 
  tipoConfiguracion :string = '';

  public render:boolean = false;


  constructor(private router: Router, private codeService: CodeService) { 
    this.config = environment.payUconfig;
  }

  ngOnInit() {
    if(this.tipoConfiguracion != null && this.tipoConfiguracion != undefined && this.tipoConfiguracion != ''){
      this.config = Object.assign(this.config, environment[this.tipoConfiguracion]);
      document.getElementById('btnSend').click();
      return;
    }
    this.render = true;
  }

  public plan(tipo){

    $('#validacion').modal();
    
    this.config = Object.assign(this.config, environment[tipo]);
    sessionStorage.setItem('dias', this.config.dias);
    //this.persistenceService.set('dias',  this.config.dias);
  }

  public enviar(){
    this.codeService.actualizarDias(sessionStorage.getItem("idPago"), sessionStorage.getItem("dias")).subscribe(res=>{
      
      if (res['error'] == true) {
        Swal.fire('Error', res['mensaje'], 'error');
        return;
      }


      this.config.buyerEmail = sessionStorage.getItem('email');
      this.config.buyerFullName = sessionStorage.getItem('nombres');
      this.config.confirmacionEmail = sessionStorage.getItem('email');
      this.config.referenceCode =sessionStorage.getItem('idPago');
  
      let info = this.config.ApiKey+'~'+this.config.merchantId+'~'+this.config.referenceCode+'~'+this.config.amount+'~'+this.config.currency;
      this.config.firmaMd5 = new Md5().appendStr(info).end();
      
      setTimeout( ()=>{
        sessionStorage.setItem('payment', JSON.stringify(this.config));
        this.router.navigate(['send']);
      }, 300);
    }, error=>{ 
        Swal.fire('Error', "Ocurrió un error: "+error, 'error');
    })
    

  }

}
