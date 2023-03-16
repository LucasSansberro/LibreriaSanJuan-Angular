import { EventEmitter, Injectable } from '@angular/core';
import Swal, { SweetAlertIcon, SweetAlertResult } from 'sweetalert2';
import { Libros } from '../models/Libros';
import { AlertasService } from './alertas.service';
import { DataService } from './data.service';
import { SesionService } from './sesion.service';

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  carritoUpdated: EventEmitter<object> = new EventEmitter();

  carrito: Array<Libros> = [];
  precioFinal: number = 0;

  constructor(
    private sesionService: SesionService,
    private dataService: DataService,
    private alertaService: AlertasService
  ) {}

  getCarrito(): Array<Libros> {
    return this.carrito;
  }
  getPrecioFinal(): number {
    return this.precioFinal;
  }

  mostrarCarrito(): void {
    document
      .getElementById('overlayCuadroScripts')!
      .classList.add('fondoTransparente');
    document.getElementById('cuadroScripts')!.classList.add('mostrarCarrito');
  }
  ocultarCarrito(): void {
    document
      .getElementById('overlayCuadroScripts')!
      .classList.remove('fondoTransparente');
    document
      .getElementById('cuadroScripts')!
      .classList.remove('mostrarCarrito');
  }
  agregarLibroCarrito(libro: Libros): void {
    const libroRepetido = this.carrito.find(
      (libroBuscado: Libros) => libroBuscado.libroId == libro.libroId
    );
    if (libroRepetido == undefined) {
      this.carrito.push({ ...libro, libroCantidad: 1 });
      this.precioFinal += libro.libroPrecio;
      this.carritoUpdated.emit({
        carritoLength: this.carrito.length,
        carrito: this.carrito,
        precioFinal: this.precioFinal,
      });
      return this.alertaToast('success', 'Libro agregado');
    } else {
      if (libroRepetido.libroCantidad! >= 10) {
        return this.alertaSimple(
          'error',
          'El máximo permitido es de 10 unidades por título. Para compras mayoristas, contáctenos a través de un correo electrónico'
        );
      } else {
        this.incrementarCantidadCarrito(libroRepetido.libroId);
        return this.alertaToast('success', 'Libro agregado');
      }
    }
  }
  incrementarCantidadCarrito(id: number): void {
    const libro = this.carrito.find(
      (libroBuscado: Libros) => libroBuscado.libroId == id
    );
    if (libro!.libroCantidad! >= 10) {
      return this.alertaSimple(
        'error',
        'El máximo permitido es de 10 unidades por título. Para compras mayoristas, contáctenos a través de un correo electrónico'
      );
    } else {
      const indexLibro = this.carrito.indexOf(libro!);
      this.carrito[indexLibro].libroCantidad!++;
      this.precioFinal += libro!.libroPrecio;
      this.carritoUpdated.emit({
        carrito: this.carrito,
        precioFinal: this.precioFinal,
      });
    }
  }
  decrementarCantidadCarrito(id: number): void {
    const libro = this.carrito.find(
      (libroBuscado: Libros) => libroBuscado.libroId == id
    );
    if (libro!.libroCantidad! <= 1) {
      this.eliminarLibroCarrito(libro!.libroId);
    } else {
      const indexLibro = this.carrito.indexOf(libro!);
      this.carrito[indexLibro].libroCantidad!--;
      this.precioFinal -= libro!.libroPrecio;
      this.carritoUpdated.emit({
        carrito: this.carrito,
        precioFinal: this.precioFinal,
      });
    }
  }
  async eliminarLibroCarrito(id: number): Promise<void> {
    const libro = this.carrito.find(
      (libroBuscado: Libros) => libroBuscado.libroId == id
    );
    const result = await Swal.fire({
      showCloseButton: true,
      icon: 'question',
      html: `¿Quiere eliminar a ${libro!.libroTitulo} de su carrito?`,
      confirmButtonText: 'Confirmar',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      background: '#FFFDD0',
    });
    if (result.isConfirmed) {
      const indexLibro = this.carrito.indexOf(libro!);
      this.carrito.splice(indexLibro, 1);
      this.precioFinal -= libro!.libroPrecio * libro!.libroCantidad!;
      this.carritoUpdated.emit({
        carritoLength: this.carrito.length,
        carrito: this.carrito,
        precioFinal: this.precioFinal,
      });
    }
  }
  vaciarCarrito(): void {
    this.carrito.length != 0 && ((this.carrito = []), (this.precioFinal = 0));
    this.carritoUpdated.emit({
      carritoLength: this.carrito.length,
      carrito: this.carrito,
      precioFinal: this.precioFinal,
    });
  }
  ordenarCarrito(): void {
    this.carrito.sort((a: any, b: any) => a.libroPrecio - b.libroPrecio);
    this.carritoUpdated.emit({
      carrito: this.carrito,
    });
  }
  async enviarCarrito(): Promise<any> {
    if (this.carrito.length != 0) {
      if (!this.sesionService.getSesionIniciadaBoolean()) {
        return this.alertaSimple(
          'error',
          'Debe inciar sesion para realizar una compra'
        );
      } else {
        const result = await Swal.fire({
          showCloseButton: true,
          icon: 'question',
          html: `Enviaremos la facturación y el método de pago al  correo que usted ha registrado: ${this.sesionService.getSesionIniciadaCorreo()}<br>¿Está de acuerdo?`,
          confirmButtonText: 'Confirmar',
          showCancelButton: true,
          cancelButtonText: 'Cancelar',
          background: '#FFFDD0',
        });
        if (result.isConfirmed) {
          const factura = {
            usuario_id: this.sesionService.getSesionIniciadaId(),
            precio_total: this.precioFinal,
            libros_comprados: [...this.carrito],
          };
          this.dataService.postFactura(JSON.stringify(factura)).subscribe();
          this.vaciarCarrito();
          this.ocultarCarrito();
          return this.alertaSimple(
            'success',
            `La factura y los métodos de pago han sido enviados a ${this.sesionService.getSesionIniciadaCorreo()}`
          );
        }
      }
    } else {
      return this.alertaSimple('error', 'Su carrito está vacío');
    }
  }
  getCarritoLength(): number {
    return this.carrito.length;
  }
  alertaSimple(icon: SweetAlertIcon, text: string): void {
    this.alertaService.alertaSimple(icon, text);
  }
  alertaToast(icon: SweetAlertIcon, text: string): void {
    this.alertaService.alertaToast(icon, text);
  }
}
