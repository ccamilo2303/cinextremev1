import { environment } from './../../environments/environment';
import { Component, OnInit, NgZone  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthenticationService } from './../authentication.service';
import { CodeService } from '../code.service';
import { AngularFireAuth } from "@angular/fire/auth";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


declare var $: any;
declare var CryptoJS:any;

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;

  
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
  public loginForm:any;

  constructor(public ngZone: NgZone,  public authenticationService: AuthenticationService, 
    private route: ActivatedRoute, private router: Router, 
    private codeService: CodeService, private angularFireAuth: AngularFireAuth, 
    private fb: FormBuilder, private formBuilder: FormBuilder) { }

     

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
    this.scripts.push("../../assets/js/bootstrapvalidator.min.js");
    this.scripts.push("../../assets/js/hmac-sha256.js");
    this.scripts.push("../../assets/js/enc-base64-min.js");

    this.loadScript();

    
    if(window.location.href.indexOf('?l=l')){
      sessionStorage.removeItem(environment.nameToken);
      sessionStorage.removeItem("email");
    }

    if(this.router.url === '/clean'){
      console.log("elimina");
      sessionStorage.removeItem(environment.nameToken);
      sessionStorage.removeItem("email");
    }

    this.route.params.subscribe(p => {
      if (p != undefined && p['tipo'] != undefined) {
        this.tipo = p['tipo'];
      }
    });

    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });


    this.registerForm = this.formBuilder.group({
      _token: [null],
      name: ['', Validators.required],
      last: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      msg: ['', [Validators.required, Validators.minLength(10)]]
  }, {
     
  });

  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
      }

      let obj = (JSON.stringify(this.registerForm.value));

      this.codeService.formularioContacto(obj).subscribe(res => {
        console.log('', res);

       this.limpiarFormularioContacto();

       Swal.fire({
        icon: 'success',
        title: 'Mensaje enviado con éxito',
        text: 'Gracias por contactarnos, nos pondremos en contacto con usted dentro de poco.',
      })

        
      }, error=>{
        console.log('--->', error);
        this.limpiarFormularioContacto();

        Swal.fire({
          icon: 'error',
          title: 'Ocurrio un error en el envío',
          text: 'Vuelve a intentarlo más tarde.',
        })

      });
  }

  limpiarFormularioContacto(){

    $("#contact_form").data('bootstrapValidator').resetForm();
    $("#contact_form")[0].reset();
  }

  validate(){
    if(this.compra == false && 
      sessionStorage.getItem(environment.nameToken) != null &&
      sessionStorage.getItem(environment.nameToken).length > 20){

      this.redirect(sessionStorage.getItem(environment.nameToken), sessionStorage.getItem('email'));
      return;
    }
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

    if(this.compra == true){

      this.angularFireAuth.auth.signInWithEmailAndPassword(this.email, this.pass).then( (result) => {

        this.load = false;
      
        sessionStorage.setItem('email', this.email);
        
        this.pass = '';
        
        if(this.compra == true){
          sessionStorage.removeItem('cinextreme-t');
          let random = Math.floor(Math.random() * 8000001);
          sessionStorage.setItem("idPago", random.toString());
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
        
        let token = generate(this.email, environment.signature)
        
        this.redirect(token, this.email);
  
      })
      .catch(err => {
        Swal.fire('Error', err.message, 'error');
        this.load = false;
      });

    }else{

      this.angularFireAuth.auth.signInWithEmailAndPassword(this.email, this.pass).then( (result) => {

        this.codeService.valSuscripcion(this.email).subscribe(res => {
  
         
          if(res['error'] == true){
  
            Swal.fire({
              icon: 'error',
              title: 'Ocurrio un error',
              text: res['mensaje'],
            })
            this.load = false;
          }else{
            this.load = false;
        
            sessionStorage.setItem('email', this.email);
            
            this.pass = '';
            
            if(this.compra == true){
              sessionStorage.removeItem('cinextreme-t');
              let random = Math.floor(Math.random() * 8000001);
              sessionStorage.setItem("idPago", random.toString());
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
            
            let token = generate(this.email, environment.signature)
            
            this.redirect(token, this.email);
      
          }
  
          
  
        }, error=>{
          console.log('--->', error);
          Swal.fire('Error', error.message, 'error');
          this.load = false;
        });
  
        
      })
      .catch(err => {
        Swal.fire('Error', err.message, 'error');
        this.load = false;
      });
      
    }
    
    
  }

  redirect(token, email){
    $('#SignIn').modal('toggle');
    sessionStorage.setItem('cinextreme-t', token);
    
    if(this.email != undefined && this.email != ''){
      sessionStorage.setItem('email', this.email);
    }
    email = sessionStorage.getItem('email');

    setTimeout(()=>{
      window.location.href = environment.ipVersions+'?t='+sessionStorage.getItem('cinextreme-t')+'&data='+email;
    }, 250);
    //console.log(environment.ipVersions+'?t='+sessionStorage.getItem('cinextreme-t')+'&data='+email);
  }

  contact(){
     contactt();
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
      sessionStorage.setItem("idPago", random.toString());
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

        sessionStorage.setItem('nombres', this.nombres);
        sessionStorage.setItem('email', this.email);

        if(this.compra == true){
          $('#sendTemp').click();
          return;
        }else{
          $('#itemPrecios').click();
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
      await sleep(500);
    }

  }



}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}




   



function base64url(source) {
  // Encode in classical base64
  let encodedSource = CryptoJS.enc.Base64.stringify(source);
  
  // Remove padding equal characters
  encodedSource = encodedSource.replace(/=+$/, '');
  
  // Replace characters according to base64url specifications
  encodedSource = encodedSource.replace(/\+/g, '-');
  encodedSource = encodedSource.replace(/\//g, '_');
  
  return encodedSource;
}

function generate(email, localSignature){
  var header = {
    "alg": "HS256",
    "typ": "JWT"
  };
  
  let date = new Date();
  let dateAdd = new Date()
  dateAdd.setHours(date.getHours() + 12);

  var data = {
    "email": email,
    "iat": Math.round(date.getTime()/1000),
    "exp": Math.round(dateAdd.getTime()/1000)
  };
  
  var secret = localSignature;
  

  var stringifiedHeader = CryptoJS.enc.Utf8.parse(JSON.stringify(header));
  var encodedHeader = base64url(stringifiedHeader);
  console.log(encodedHeader);
  
  var stringifiedData = CryptoJS.enc.Utf8.parse(JSON.stringify(data));
  var encodedData = base64url(stringifiedData);
  console.log(encodedData);
  
  var signature = encodedHeader + "." + encodedData;
  signature = CryptoJS.HmacSHA256(signature, secret);
  signature = base64url(signature);
  
  return encodedHeader+'.'+encodedData+'.'+signature;
}

 function contactt(){
  $('#contact_form').bootstrapValidator({
      // To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
      feedbackIcons: {
          valid: 'glyphicon glyphicon-ok',
          invalid: 'glyphicon glyphicon-remove',
          validating: 'glyphicon glyphicon-refresh'
      },
      excluded: [':disabled'],
      fields: {
          first_name: {
              validators: {
                      stringLength: {
                      min: 2,
                  },
                      notEmpty: {
                      message: 'Porfavor, ingrese sus nombres'
                  }
              }
          },
           last_name: {
              validators: {
                   stringLength: {
                      min: 2,
                  },
                  notEmpty: {
                      message: 'Porfavor, ingrese sus apellidos'
                  }
              }
          },
          email: {
              validators: {
                  notEmpty: {
                      message: 'Porfavor, ingrese su correo'
                  },
                  emailAddress: {
                      message: 'Porfavor, ingrese un correo valido'
                  }
              }
          },
          comment: {
              validators: {
                    stringLength: {
                      min: 10,
                      max: 200,
                      message:'Ingrese al menos 10 caracteres y no más de 200'
                  },
                  notEmpty: {
                      message: 'Proporcione una descripción de su mensaje'
                  }
                  }
              }
          }
      })
}