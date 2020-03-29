import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthenticationService } from './../authentication.service';
import { CodeService } from '../code.service';

declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  
  public scripts: Array<string> = new Array();
  public email : string;
  public pass : string;
  public load:boolean = false;

  public nombres: string;
  public registroF: boolean = true;
  public pago: boolean = false;
  public compra: boolean = false;
  public tipo: string = '';
  public codigo: string = '';


  constructor(public authenticationService: AuthenticationService, private route: ActivatedRoute, private router: Router, private codeService: CodeService) { }

  ngOnInit() {
    this.scripts.push("https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js");
    this.scripts.push("../../assets/bootstrap-3.3.7/bootstrap-3.3.7-dist/js/bootstrap.min.js");
    this.scripts.push("../../assets/js/plugins/owl-carousel/owl.carousel.min.js");
    this.scripts.push("../../assets/js/plugins/bootsnav_files/js/bootsnav.js");
    this.scripts.push("../../assets/js/plugins/typed.js-master/typed.js-master/dist/typed.min.js");
    this.scripts.push("../../assets/js/plugins/Magnific-Popup-master/Magnific-Popup-master/dist/jquery.magnific-popup.js");
    this.scripts.push("../../assets/js/plugins/particles.js-master/particles.js-master/particles.min.js");
    this.scripts.push("../../assets/js/particales-script.js");
    this.scripts.push("../../assets/js/main.js");
    
    this.loadScript();

    this.route.params.subscribe(p => {
      if (p != undefined && p['tipo'] != undefined) {
        this.tipo = p['tipo'];
      }
    });

  }

  login(){
    if(this.email == undefined || this.email.split(' ').join('') == ''){
      
      Swal.fire('Error', 'El campo Email no puede estar vacío', 'error');
      return;
    }
    if(this.pass == undefined || this.pass.split(' ').join('') == ''){
      Swal.fire('Error', 'El campo Contraseña no puede estar vacío', 'error');
      return;
    }
    this.load = true;
    this.authenticationService.login(this.email, this.pass).then(res => {
      this.load = false;
      
      localStorage.setItem('nombres', this.nombres);
      localStorage.setItem('email', this.email);

      this.pass = '';
      
      if(this.compra == true){
        let random = Math.floor(Math.random() * 8000001);
        localStorage.setItem("idPago", random.toString());
        this.codeService.generarSuscripcion(this.email, random, 1).then(res => {
          this.email = '';
          if (res['error'] == true) {
            Swal.fire('Error', res['mensaje'], 'error');
            this.load = false;
            return;
          }
          $('#sendTemp').click();
        });

        
        return;
      }

    })
    .catch(err => {
      Swal.fire('Error', err.message, 'error');
      this.load = false;
    });
  }

  loginGoogle(){
    this.authenticationService.loginConGoogle().then(res=>{
      this.authenticationService.registrarUsuario(res.user['displayName'], res.user['email']);
      

    }).catch(err => {
      Swal.fire('Error', err.message, 'error');
      this.load = false;
    });
  }

  registro() {
    if (this.nombres == undefined || this.nombres.split(' ').join('') == '') {

      Swal.fire('Error', 'El campo Nombre Completo no puede estar vacío', 'error');
      return;
    }
    if (this.email == undefined || this.email.split(' ').join('') == '') {

      Swal.fire('Error', 'El campo Email no puede estar vacío', 'error');
      return;
    }
    if (this.pass == undefined || this.pass.split(' ').join('') == '') {
      Swal.fire('Error', 'El campo Contraseña no puede estar vacío', 'error');
      return;
    }
    this.load = true;

    this.codigo = this.codigo.split(' ').join();
    if (this.codigo != '') {

      this.codeService.validarCodigo(this.codigo, this.email).then(res => {
        if (res['error'] == true) {
          Swal.fire('Error', res['mensaje'], 'error');
          this.load = false;
          return;
        }
        let random = Math.floor(Math.random() * 1000001);


        this.codeService.generarSuscripcion(this.email, random, 1).then(res => {
          if (res['error'] == true) {
            Swal.fire('Error', res['mensaje'], 'error');
            this.load = false;
            return;
          }

          this.codeService.actualzarSuscripcion(random, 'DEMO').then(res => {
            if (res['error'] == true) {
              Swal.fire('Error', res['mensaje'], 'error');
              this.load = false;
              return;
            }

            this.registrar(true);

          }, error => {
            Swal.fire('Error', 'Ocurrió un error al momento de validar el código promocional', 'error');
            console.log("", error);
            this.load = false;
            return;
          })

        }, error => {
          Swal.fire('Error', 'Ocurrió un error al momento de generar la suscripcion', 'error');
          console.log("", error);
          this.load = false;
          return;
        });

      }, error => {
        Swal.fire('Error', 'Ocurrió un error al momento de validar el código promocional', 'error');
        console.log("", error);
        this.load = false;
        return;
      })
    } else {
      let random = Math.floor(Math.random() * 8000001);
      localStorage.setItem("idPago", random.toString());
      this.codeService.generarSuscripcion(this.email, random, 1).then(res => {
        if (res['error'] == true) {
          Swal.fire('Error', res['mensaje'], 'error');
          this.load = false;
          return;
        }
        this.registrar(false);
      });
    }



  }

  
  private registrar(codigo) {
    this.authenticationService.registrar(this.email, this.pass).then(res => {
      this.load = true;
      this.authenticationService.registrarUsuario(this.nombres, this.email);

      if (codigo == false) {
        
        this.registroF = false;
        this.load = false;
        this.pago = true;

        localStorage.setItem('nombres', this.nombres);
        localStorage.setItem('email', this.email);

        if(this.compra == true){
          $('#sendTemp').click();
          return;
        }else{
          Swal.fire('Correcto!', 'Usuario registrado correctamente, escoge un plan que se ajuste a tu necesidad', 'success');
        }

        
      } else {
        Swal.fire('Correcto!', 'Usuario registrado correctamente, tu cuenta estará activa por un día para disfrutar de todo nuestro contenido.', 'success');
        
        this.login();
      }

    })
      .catch(err => {
        Swal.fire('Error', err.message, 'error');
        this.load = false;
      });
  }


  validacion(item){

    this.compra = true;

    $('#validacion').modal('toggle');
    if(item == 0){
      document.getElementById('inicio').click();
      Swal.fire('Info', "Por favor registra una cuenta para continuar", 'info');
    }else{
      document.getElementById('iniciarSesion').click();
    }
  }

  async loadScript() {

    for (let x of this.scripts) {
      let node = document.createElement('script');
      node.src = x;
      node.type = 'text/javascript';
      node.async = true;
      node.charset = 'utf-8';
      document.getElementById('scriptsTemp').appendChild(node);
      await sleep(100);
    }

  }

}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}