import { Component } from '@angular/core';

@Component({
  selector: 'app-texto',
  templateUrl: './texto.component.html',
  styleUrls: ['./texto.component.scss']
})
export class TextoComponent {
  exito: boolean = false;
  mostrar: boolean = false;
  alerta: string = '';

  convertirTexto() {
    (document.querySelector('#r-texto-binario') as HTMLInputElement).value = '';
    let input = (document.querySelector('#texto-binario') as HTMLInputElement).value;
    let caracteres = [];

    if (input != '') {
      for (var i = 0; i < input.length; i++) {
        caracteres[i] = input.charAt(i).charCodeAt(0);
      }
      (document.querySelector('#r-texto-binario') as HTMLInputElement).value = this.ascciBinario(caracteres);
      this.mostrar = true
      this.exito = true
      this.alerta = 'Texto convertido con exito!'
    } else {
      this.mostrar = true
      this.exito = false
      this.alerta = 'Hubo un error al convertir el texto!'
    }

  }



  convertirBinario() {
    const input = (document.querySelector('#binario-texto') as HTMLInputElement).value;
    let arreglo = [];
    let resultado = '';
    if (input != '') {
      let binario_sin_espacios = this.eliminarCaracteresNoPermitidos(input);
      let arreglo = this.bloquesBinarios(binario_sin_espacios);
      let ascci = this.bin_decimal(arreglo);
      resultado = this.decodificar(ascci);
    }

    if (resultado == '') {
      this.mostrar = true
      this.exito = false
      this.alerta = 'Hubo un error al convertir el texto!';
    } else {
      this.mostrar = true
      this.exito = true
      this.alerta = 'Texto convertido con exito!';
      (document.querySelector('#r-binario-texto') as HTMLInputElement).value = resultado;
    }



  }

  //Convierte los ascci en binario
  ascciBinario(caracteres) {
    let binario = "";
    for (let i = 0; i < caracteres.length; i++) {
      let ceros = "";
      let auxiliar = caracteres[i].toString(2);
      for (let j = 0; j < 8 - auxiliar.length; j++) {
        ceros = ceros + "0";
      }
      binario = binario + ceros + auxiliar + " ";
    }
    return binario;
  }


  //Elimina los caracteres distintos de 1 y 0
  eliminarCaracteresNoPermitidos(palabra) {
    let binario_sin_espacios = '';
    for (let i = 0; i < palabra.length; i++) {
      if (palabra[i] != " " && palabra[i] == "0" || palabra[i] != " " && palabra[i] == "1") {
        binario_sin_espacios = binario_sin_espacios + palabra[i];
      }
    }
    return binario_sin_espacios;
  }

  //Pone en bloque de 1byte los numeros binarios dentro de un arreglo
  bloquesBinarios(binario) {
    let auxiliar = '';
    let contador = 0;
    let arreglo = [];
    for (let i = 0; i < binario.length; i++) {
      auxiliar = auxiliar + binario[i];
      contador++;
      if (contador == 8) {
        arreglo.push(auxiliar);
        auxiliar = '';
        contador = 0;
      }
    }
    return arreglo;
  }

  //Pasa de binario a ascci
  bin_decimal(arreglo_binario) {
    let arreglo_decimal = [];
    for (let j = 0; j < arreglo_binario.length; j++) {
      let exponente = 0;
      let numero_decimal = 0;
      let numero_binario = arreglo_binario[j];
      for (let i = numero_binario.length - 1; i >= 0; i--) {
        if (numero_binario[i] == 1) {
          numero_decimal = numero_decimal + Math.pow(2, exponente);
        }
        exponente++;
      }
      arreglo_decimal.push(numero_decimal);
    }
    return arreglo_decimal;
  }

  //Decodificara el ascci a texto
  decodificar(ascci) {
    var texto = "";
    for (var i = 0; i < ascci.length; i++) {
      texto = texto + String.fromCharCode(ascci[i]);
    }
    return texto;
  }


}
