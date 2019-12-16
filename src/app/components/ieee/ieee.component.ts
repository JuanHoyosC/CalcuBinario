import { Component } from '@angular/core';

@Component({
  selector: 'app-ieee',
  templateUrl: './ieee.component.html',
  styleUrls: ['./ieee.component.scss']
})
export class IeeeComponent {

  convertir() {
    let a = Number((document.querySelector('#decimal') as HTMLInputElement).value);
    (document.querySelector('#ieee32') as HTMLInputElement).value = this.convertirIEEE32(a);
    (document.querySelector('#ieee64') as HTMLInputElement).value = this.convertirIEEE64(a);
  }

  convertirIEEE64(number) {
    let ieee64 = new Float64Array(1);
    ieee64[0] = number;
    let view64 = new Uint8Array(ieee64.buffer);
    let resultado = '';

    for (let i = view64.length - 1; i >= 0; i--) {
      var bits = view64[i].toString(2);
      if (bits.length < 8) {
        bits = new Array(8 - bits.length).fill('0').join("") + bits;
      }
      resultado += bits;
    }
    return resultado
  }

  convertirIEEE32(number) {

    let ieee32 = new Float32Array(1);

    ieee32[0] = number;

    let view32 = new Uint8Array(ieee32.buffer);
    let i, resultado = '';
    for (i = view32.length - 1; i >= 0; i--) {
      var bits = view32[i].toString(2);
      if (bits.length < 8) {
        bits = new Array(8 - bits.length).fill('0').join("") + bits;
      }
      resultado += bits;
    }
    return resultado
  }

  convertir2() {
    let a = (document.querySelector('#ieee754') as HTMLInputElement).value;
    let resultado = 0;
    if (a.length == 32) {
      let decimal = parseInt(a.slice(1, 9), 2);
      let exp = decimal - 127;
      let mantisa = '1' + a.slice(9, 32);
      resultado = this.convertirDecimal(decimal, exp, mantisa);
    } else {
      let decimal = parseInt(a.slice(1, 12), 2);
      let exp = decimal - 1023;
      let mantisa = '1' + a.slice(12, 64);
      resultado = this.convertirDecimal(decimal, exp, mantisa);

    }
    if (a.slice(0, 1) == '1') {
      resultado = resultado * -1;
    }
    (document.querySelector('#ieee') as HTMLInputElement).value = resultado.toString();
  }

  convertirDecimal(decimal, exp, mantisa) {
    let entera = '';
    let fraccion = '';

    if (exp >= 0) {
      entera = mantisa.slice(0, exp + 1);
      fraccion = mantisa.slice(exp + 1, 24);
    } else {
      let ceros = ''
      for (let i = 0; i < exp * -1; i++) {
        ceros = ceros + '0'
      }
      mantisa = ceros + mantisa
      entera = mantisa.slice(0, exp * -1)
      fraccion = mantisa.slice(1, 25)     
    }
    let suma = 0;

    for (let i = 0; i < fraccion.length; i++) {
      suma = suma + Math.pow(2, -(i + 1)) * Number(fraccion[i]);
    }

    decimal = parseInt(entera, 2);
    let resultado = decimal + suma;
    return resultado;
  }

}
