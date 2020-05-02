import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { HashLocationStrategy, LocationStrategy, Location, PathLocationStrategy } from '@angular/common';

import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';

import { HttpClientModule } from '@angular/common/http';
import { PagoComponent } from './pago/pago.component';
import { ResponseComponent } from './response/response.component';
import { SendComponent } from './send/send.component';

import { PasswordStrengthMeterModule } from 'angular-password-strength-meter';



@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    PagoComponent,
    ResponseComponent,
    SendComponent
    
  ],
  imports: [
    BrowserModule,

    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    PasswordStrengthMeterModule,

    HttpClientModule
  ],
  providers: [
    {provide : LocationStrategy , useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
