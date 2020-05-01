import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from 'rxjs';
import { auth } from  'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  userData: Observable<firebase.User>;
  

  constructor(private angularFireAuth: AngularFireAuth, public firestore: AngularFirestore) {
    this.userData = angularFireAuth.authState;

    /*this.angularFireAuth.authState.subscribe(userResponse => {
      console.log("--->: ", userResponse);
      if (userResponse) {
        localStorage.setItem('user', JSON.stringify(userResponse));
      } else {
        localStorage.setItem('user', null);
      }
    })*/

  }

  async login(email: string, password: string) {
    return this.angularFireAuth.auth.signInWithEmailAndPassword(email, password);
      
  }
  
  async registrar(email: string, password: string) {
    return await this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password);    
  }

  async loginConGoogle(){
   return await this.angularFireAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }


  async registrarUsuario(nombres, email){
    
    this.consultarUsuario(email).then(res=>{
      
      if(res.data() == null){
        this.firestore.collection('usuarios').doc(email).set({
          activo : false,
          nombres : nombres,
          email : email,
          fecha_creacion: new Date(),
          fecha_inicio_suscripcion : null,
          fecha_fin_suscripcion : null
        });
      }
    })
    
  }
  async consultarUsuario(email){
    return await this.firestore.collection('usuarios').doc(email).ref.get();
  }

  cerrarSesion() {
    this.angularFireAuth.auth.signOut();
  }  

  reestablecerPass(email){
    return this.angularFireAuth.auth.sendPasswordResetEmail(email);
  }

}