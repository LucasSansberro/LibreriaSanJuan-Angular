import { EventEmitter, Injectable } from '@angular/core';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { Libros } from '../models/Libros';
import { DataService } from './data.service';
import { SesionService } from './sesion.service';

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  //TODO Queda como object? Podemos hacerlo mejor con un modelo de carrito?
  carritoUpdated: EventEmitter<object> = new EventEmitter();

  carrito: Array<Libros> = [];
  precioFinal: number = 0;

  constructor(
    private sesionService: SesionService,
    private dataService: DataService
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
  agregarLibroCarrito(libro: Libros): Promise<SweetAlertResult<any>> {
    const libroRepetido = this.carrito.find(
      (libroBuscado: Libros) => libroBuscado.libro_id == libro.libro_id
    );
    if (libroRepetido == undefined) {
      this.carrito.push({ ...libro, libro_cantidad: 1 });
      this.precioFinal += libro.libro_precio;
      this.carritoUpdated.emit({
        carritoLength: this.carrito.length,
        carrito: this.carrito,
        precioFinal: this.precioFinal,
      });
      return Swal.fire({
        toast: true,
        icon: 'success',
        title: 'Libro agregado',
        position: 'top-right',
        iconColor: 'green',
        background: '#FFFDD0',
        customClass: {
          popup: 'colored-toast',
        },
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      });
    } else {
      if (libroRepetido.libro_cantidad! >= 10) {
        return Swal.fire({
          icon: 'error',
          html: `El máximo permitido es de 10 unidades por título. Para compras mayoristas, contáctenos a través de un correo electrónico`,
          background: '#FFFDD0',
        });
      } else {
        this.incrementarCantidadCarrito(libroRepetido.libro_id);
        return Swal.fire({
          toast: true,
          icon: 'success',
          title: 'Libro agregado',
          position: 'top-right',
          iconColor: 'green',
          background: '#FFFDD0',
          customClass: {
            popup: 'colored-toast',
          },
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        });
      }
    }
  }
  incrementarCantidadCarrito(id: number): void {
    const libro = this.carrito.find(
      (libroBuscado: Libros) => libroBuscado.libro_id == id
    );
    if (libro!.libro_cantidad! >= 10) {
      Swal.fire({
        icon: 'error',
        html: `El máximo permitido es de 10 unidades por título. Para compras mayoristas, contáctenos a través de un correo electrónico`,
        background: '#FFFDD0',
      });
    } else {
      const indexLibro = this.carrito.indexOf(libro!);
      this.carrito[indexLibro].libro_cantidad!++;
      this.precioFinal += libro!.libro_precio;
      this.carritoUpdated.emit({
        carrito: this.carrito,
        precioFinal: this.precioFinal,
      });
    }
  }
  decrementarCantidadCarrito(id: number): void {
    const libro = this.carrito.find(
      (libroBuscado: Libros) => libroBuscado.libro_id == id
    );
    if (libro!.libro_cantidad! <= 1) {
      this.eliminarLibroCarrito(libro!.libro_id);
    } else {
      const indexLibro = this.carrito.indexOf(libro!);
      this.carrito[indexLibro].libro_cantidad!--;
      this.precioFinal -= libro!.libro_precio;
      this.carritoUpdated.emit({
        carrito: this.carrito,
        precioFinal: this.precioFinal,
      });
    }
  }
  async eliminarLibroCarrito(id: number): Promise<void> {
    const libro = this.carrito.find(
      (libroBuscado: Libros) => libroBuscado.libro_id == id
    );
    const result = await Swal.fire({
      showCloseButton: true,
      icon: 'question',
      html: `¿Quiere eliminar a ${libro!.libro_titulo} de su carrito?`,
      confirmButtonText: 'Confirmar',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      background: '#FFFDD0',
    });
    if (result.isConfirmed) {
      const indexLibro = this.carrito.indexOf(libro!);
      this.carrito.splice(indexLibro, 1);
      this.precioFinal -= libro!.libro_precio * libro!.libro_cantidad!;
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
    this.carrito.sort((a: any, b: any) => a.libro_precio - b.libro_precio);
    this.carritoUpdated.emit({
      carrito: this.carrito,
    });
  }
  async enviarCarrito(): Promise<any> {
    if (this.carrito.length != 0) {
      if (!this.sesionService.sesionIniciadaBoolean) {
        return Swal.fire({
          icon: 'error',
          html: `Debe inciar sesion para realizar una compra`,
          background: '#FFFDD0',
        });
      } else {
        const result = await Swal.fire({
          showCloseButton: true,
          icon: 'question',
          html: `Enviaremos la facturación y el método de pago al  correo que usted ha registrado: ${this.sesionService.sesionIniciada.usuario_correo}<br>¿Está de acuerdo?`,
          confirmButtonText: 'Confirmar',
          showCancelButton: true,
          cancelButtonText: 'Cancelar',
          background: '#FFFDD0',
        });
        if (result.isConfirmed) {
          const factura = {
            usuario_id: this.sesionService.sesionIniciada.usuario_id,
            precio_total: this.precioFinal,
            libros_comprados: [...this.carrito],
          };
          this.dataService.postFactura(JSON.stringify(factura)).subscribe();
          this.vaciarCarrito();
          this.ocultarCarrito();
          return Swal.fire({
            icon: 'success',
            html: `La factura y los métodos de pago han sido enviados a ${this.sesionService.sesionIniciada.usuario_correo}`,
            background: '#FFFDD0',
          });
        }
      }
    } else {
      return Swal.fire({
        icon: 'error',
        html: `Su carrito está vacío`,
        background: '#FFFDD0',
      });
    }
  }
  getCarritoLength(): number {
    return this.carrito.length;
  }
}
