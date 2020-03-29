// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  firebaseConfig: {
    apiKey: "AIzaSyD-XLAe8eAQSmyMMcSkbFtYJKEM81XSzgA",
    authDomain: "cinextreme-p.firebaseapp.com",
    databaseURL: "https://cinextreme-p.firebaseio.com",
    projectId: "cinextreme-p",
    storageBucket: "cinextreme-p.appspot.com",
    messagingSenderId: "10253746863",
    appId: "1:10253746863:web:46cc892d70172f3a250a5a"
  },

  ipServicio: 'http://cinextreme.co/public/',

  ipImagenTMDB: 'https://image.tmdb.org/t/p/original/',
  ipBaseTMDB: 'https://api.themoviedb.org/3/movie/',
  keyTMDB: 'e38bdcb99eda95bae467ac8f3dd8684f',


  payUconfig: {

    // $url = 'https://checkout.payulatam.com/ppp-web-gateway-payu/', // Producción
    url: 'https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/', // Sandbox
    ApiKey: '4Vj8eK4rloUd272L48hsrarnUA', // Obtener este dato dela cuenta de Payu
    merchantId: '754685', // Obtener este dato dela cuenta de Payu
    accountId: '760533', // Obtener este dato dela cuenta de Payu
    currency: 'COP', // Moneda
    test: '1', // Variable para poder utilizar tarjetas de crédito de pruebas, los valores pueden ser 1 ó 0.
    responseUrl: 'http://localhost:4200/#/response', // URL de respuesta,
    confirmationUrl: "http://cinextreme.co/public/responsepayu", // URL de confirmación
  },

  configuracionPlanBasico : {
    description: 'Plan Básico - 30 Días de servicio + Acceso a todas las películas, Soporte por email y/o WhatsApp + Opción para pedir peliculas + 1 pantalla activa', //Descripción del pedido    
    referenceCode: 'PlanBasico', // Referencia Unica del pedido
    amount: '7000', //Es el monto total de la transacción. Puede contener dos dígitos decimales. Ej. 10000.00 ó 10000.
    tax: '0', // Es el valor del IVA de la transacción, si se envía el IVA nulo el sistema aplicará el 19% automáticamente. Puede contener dos dígitos decimales. Ej: 19000.00. En caso de no tener IVA debe enviarse en 0.
    taxReturnBase: '0', // Es el valor base sobre el cual se calcula el IVA. En caso de que no tenga IVA debe enviarse en 0.
    buyerEmail: '', // Respuesta por Payu al comprador
    buyerFullName: '',
    confirmacionEmail: '' // Confirmación email
  },

  configuracionPlanEstandar : {
    description: 'Plan Estandar - 60 Días de servicio + Acceso a todas las películas, Soporte por email y/o WhatsApp + Opción para pedir peliculas + 2 pantallas activa', //Descripción del pedido    
    referenceCode: 'PlanEstandar', // Referencia Unica del pedido
    amount: '12000', //Es el monto total de la transacción. Puede contener dos dígitos decimales. Ej. 10000.00 ó 10000.
    tax: '0', // Es el valor del IVA de la transacción, si se envía el IVA nulo el sistema aplicará el 19% automáticamente. Puede contener dos dígitos decimales. Ej: 19000.00. En caso de no tener IVA debe enviarse en 0.
    taxReturnBase: '0', // Es el valor base sobre el cual se calcula el IVA. En caso de que no tenga IVA debe enviarse en 0.
    buyerEmail: '', // Respuesta por Payu al comprador
    buyerFullName: '',
    confirmacionEmail: '' // Confirmación email
  },

  configuracionPlanPremium : {
    description: 'Plan Premium - 90 Días de servicio + Acceso a todas las películas, Soporte por email y/o WhatsApp + Opción para pedir peliculas + 3 pantalla activa', //Descripción del pedido    
    referenceCode: 'PlanPremium', // Referencia Unica del pedido
    amount: '21000', //Es el monto total de la transacción. Puede contener dos dígitos decimales. Ej. 10000.00 ó 10000.
    tax: '0', // Es el valor del IVA de la transacción, si se envía el IVA nulo el sistema aplicará el 19% automáticamente. Puede contener dos dígitos decimales. Ej: 19000.00. En caso de no tener IVA debe enviarse en 0.
    taxReturnBase: '0', // Es el valor base sobre el cual se calcula el IVA. En caso de que no tenga IVA debe enviarse en 0.
    buyerEmail: '', // Respuesta por Payu al comprador
    buyerFullName: '',
    confirmacionEmail: '' // Confirmación email
  }


};



/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
