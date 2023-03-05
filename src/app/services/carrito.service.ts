import { Injectable } from '@angular/core';
import { Libros } from '../models/Libros';

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  carrito: any;
  precioFinal: number = 0;

  constructor() {}
  mostrarCarrito() {
    document
      .getElementById('overlayCuadroScripts')!
      .classList.add('fondoTransparente');
    document.getElementById('cuadroScripts')!.classList.add('mostrarCarrito');
  }
  ocultarCarrito() {
    document
      .getElementById('overlayCuadroScripts')!
      .classList.remove('fondoTransparente');
    document
      .getElementById('cuadroScripts')!
      .classList.remove('mostrarCarrito');
  }
}
