import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  seleccion: string = 'Binario'
  seleccion2: string = 'Binario'
  alerta: string = ''
  mostrar: boolean = false
  exito: boolean = true
  hexa = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
  hexa1 = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']


  convertidor1() {
    const a = Number((document.querySelector('#decimal') as HTMLInputElement).value)
    //Resultado
    let resultado = ''

    if (this.seleccion == 'Binario') {
      resultado = a.toString(2);
    }

    if (this.seleccion == 'Octal') {
      resultado = a.toString(8)
    }

    if (this.seleccion == 'Hexadecimal') {
      resultado = a.toString(16)
    }

    (document.querySelector('#resultado1') as HTMLInputElement).value = resultado
  }

  convertidor2() {
    const a = (document.querySelector('#base') as HTMLInputElement).value;

    //Resultado
    let resultado = 0;
    if (this.seleccion2 == 'Binario') {
      resultado = this.toDecimal(a, 2);
    }

    if (this.seleccion2 == 'Octal') {
      resultado = this.toDecimal(a, 8);
    }

    if (this.seleccion2 == 'Hexadecimal') {
      resultado = this.toDecimal(a, 16);
    }

    if (isNaN(resultado)) {
      this.mostrar = true
      this.exito = false
      this.alerta = 'Fallo la conversión, compruebe los datos!'
    } else {
      this.mostrar = true
      this.exito = true
      this.alerta = 'La conversión fue hecha exitoxamente!'
    }

    (document.querySelector('#binario') as HTMLInputElement).value = resultado.toString(2);
    (document.querySelector('#octal') as HTMLInputElement).value = resultado.toString(8);
    (document.querySelector('#decimal2') as HTMLInputElement).value = resultado.toString();
    (document.querySelector('#hexadecimal') as HTMLInputElement).value = resultado.toString(16);

  }

  toDecimal(numero, base) {
    let s = numero.split('.');
    let decimal = parseInt(s[0], base);
    let suma = 0;
    if (s.length > 1) {
      let fracc = s[1].split('');

      for (let i = 0; i < fracc.length; i++) {
        let index = this.hexa1.indexOf(fracc[i]);
        if (index != -1) {
          if (Number(this.hexa[index]) >= base) {
            suma = NaN;
            break;
          } else {
            suma = suma + Number(this.hexa[index]) * Math.pow(base, -(i + 1));
          }
        }
      }
    }

    if(decimal <= 0){
      suma = suma*-1;
    }
    
    return decimal + suma;
  }
}
