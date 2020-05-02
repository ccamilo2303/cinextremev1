import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CodeService {

  constructor(private httpClient: HttpClient) { }

  /**
   * @param codigo 
   * @param email 
   */
  validarCodigo(codigo, email) {

    return this.httpClient.get(environment.getIpServicio() + ('validar-codigo?code='+codigo+"&email="+email) ).toPromise();

  }

  /**
   * @param email 
   * @param idPago 
   * @param diasSuscripcion 
   */
  generarSuscripcion(email, idPago, diasSuscripcion){

    return this.httpClient.get(environment.getIpServicio()+'suscripcion?email='+email+'&id_Pago='+idPago+'&dias_Suscripcion='+ diasSuscripcion).toPromise();

  }

  /**
   * 
   * @param idPago 
   * @param idTransaccion 
   */
  actualzarSuscripcion( idPago, idTransaccion){
    
    return this.httpClient.get(environment.getIpServicio()+'suscripcion-ac?id_Pago='+idPago+'&id_Transaccion='+idTransaccion).toPromise();

  }

  actualzarSuscripcion_registro( idPago, idTransaccion, email, nombres){
    
    return this.httpClient.get(environment.getIpServicio()+'suscripcion-ac2?id_Pago='+idPago+'&id_Transaccion='+idTransaccion+'&email='+email+'&nombres='+nombres).toPromise();

  }

  formularioContacto(info){
    
    return this.httpClient.get(environment.getIpServicio()+'contactar/'+info);

  }

  valSuscripcion(emailUser){
    
    return this.httpClient.get(environment.getIpServicio()+'valsuscripcion?email='+emailUser);

  }

  actualizarDias(idPago, dias){
    return this.httpClient.get(environment.getIpServicio()+'actualizar-dias?id_pago='+idPago+"&dias="+dias);
  }


}
