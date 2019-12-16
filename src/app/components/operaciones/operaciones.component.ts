import { Component } from '@angular/core';


@Component({
  selector: 'app-operaciones',
  templateUrl: './operaciones.component.html',
  styleUrls: ['./operaciones.component.scss']
})

export class OperacionesComponent {

  seleccion: string = 'Suma (+)'
  base: string = 'Binario'
  alerta: string = ''
  exito: boolean = false
  mostrar: boolean = false
  outputResultados = ['Resultado en binario', 'Resultado en octal', 'Resultado en decimal', 'Resultado en hexadecimal']
  resultados: any = ['', '', '', '']
  hexa = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
  hexa1 = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']

  calcular() {
    let a = (document.querySelector('#primer_numero') as HTMLInputElement).value;
    let b = (document.querySelector('#segundo_numero') as HTMLInputElement).value;
    let a1 = 0;
    let b1 = 0;
    //base
    if (this.base == 'Binario') {
      a1 = Number(this.toDecimal(a, 2))
      b1 = Number(this.toDecimal(b, 2))

    }

    if (this.base == 'Octal') {
      a1 = Number(this.toDecimal(a, 8))
      b1 = Number(this.toDecimal(b, 8))
    }

    if (this.base == 'Decimal') {
      a1 = Number(a)
      b1 = Number(b)
    }

    if (this.base == 'Hexadecimal') {
      a1 = Number(this.toDecimal(a, 16))
      b1 = Number(this.toDecimal(b, 16))
    }

    //Operaciones
    let resultado = 0
    if (this.seleccion == 'Suma (+)') {
      resultado = this.suma(a1, b1)
    }

    if (this.seleccion == 'Resta (-)') {
      resultado = this.resta(a1, b1)
    }

    if (this.seleccion == 'Multiplicación (*)') {
      resultado = this.multiplicacion(a1, b1)
    }

    if (this.seleccion == 'División (/)') {
      resultado = this.division(a1, b1)
    }
    //Resultados
    this.resultados = []
    this.resultados.push(resultado.toString(2))
    this.resultados.push(resultado.toString(8))
    this.resultados.push(resultado.toString(10))
    this.resultados.push(resultado.toString(16))

    if (isNaN(Number(resultado.toString(2))) || !isFinite(Number(this.resultados[2]))) {
      this.mostrar = true
      this.exito = false
      this.alerta = 'Operación incorrecta!'
    } else {
      this.mostrar = true
      this.exito = true
      this.alerta = 'Operación hecha con exito!'
    }
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

    let resultado = decimal + suma
    return resultado;
  }

  suma(a, b) {
    return a + b
  }

  resta(a, b) {
    return a - b
  }

  multiplicacion(a, b) {
    return a * b
  }

  division(a, b) {
    return a / b
  }
}
