import { EventEmitter, Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { Libros } from '../models/Libros';
import { DataService } from './data.service';
import { SesionService } from './sesion.service';

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  carritoUpdated: EventEmitter<object> = new EventEmitter();

  carrito: any = [];
  precioFinal: number = 0;

  getCarrito() {
    return this.carrito;
  }
  getPrecioFinal() {
    return this.precioFinal;
  }

  constructor(
    private sesionService: SesionService,
    private dataService: DataService
  ) {}
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
  agregarLibroCarrito(libro: any) {
    const libroRepetido = this.carrito.find(
      (libroBuscado: any) => libroBuscado.libro_id == libro.libro_id
    );
    if (libroRepetido == undefined) {
      this.carrito.push({ ...libro, libro_cantidad: 1 });
      this.precioFinal += libro.libro_precio;
      Swal.fire({
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
      this.carritoUpdated.emit({
        carritoLength: this.carrito.length,
        carrito: this.carrito,
        precioFinal: this.precioFinal,
      });
    } else {
      if (libroRepetido.libro_cantidad >= 10) {
        Swal.fire({
          icon: 'error',
          html: `El máximo permitido es de 10 unidades por título. Para compras mayoristas, contáctenos a través de un correo electrónico`,
          background: '#FFFDD0',
        });
      } else {
        this.incrementarCantidadCarrito(libroRepetido.libro_id);
        Swal.fire({
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
  incrementarCantidadCarrito(id: any) {
    const libro = this.carrito.find(
      (libroBuscado: any) => libroBuscado.libro_id == id
    );
    if (libro.libro_cantidad >= 10) {
      Swal.fire({
        icon: 'error',
        html: `El máximo permitido es de 10 unidades por título. Para compras mayoristas, contáctenos a través de un correo electrónico`,
        background: '#FFFDD0',
      });
    } else {
      const indexLibro = this.carrito.indexOf(libro);
      this.carrito[indexLibro].libro_cantidad++;
      this.precioFinal += libro.libro_precio;
      this.carritoUpdated.emit({
        carrito: this.carrito,
        precioFinal: this.precioFinal,
      });
    }
  }
  decrementarCantidadCarrito(id: any) {
    const libro = this.carrito.find(
      (libroBuscado: any) => libroBuscado.libro_id == id
    );
    if (libro.libro_cantidad <= 1) {
      Swal.fire({
        showCloseButton: true,
        icon: 'question',
        html: `¿Quiere eliminar a ${libro.libro_titulo} de su carrito?`,
        confirmButtonText: 'Confirmar',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        background: '#FFFDD0',
      }).then((result) => {
        if (result.isConfirmed) {
          this.eliminarLibroCarrito(libro.libro_id);
        }
      });
    } else {
      const indexLibro = this.carrito.indexOf(libro);
      this.carrito[indexLibro].libro_cantidad--;
      this.precioFinal -= libro.libro_precio;
      this.carritoUpdated.emit({
        carrito: this.carrito,
        precioFinal: this.precioFinal,
      });
    }
  }
  eliminarLibroCarrito(id: any) {
    const libro = this.carrito.find(
      (libroBuscado: any) => libroBuscado.libro_id == id
    );
    Swal.fire({
      showCloseButton: true,
      icon: 'question',
      html: `¿Quiere eliminar a ${libro.libro_titulo} de su carrito?`,
      confirmButtonText: 'Confirmar',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      background: '#FFFDD0',
    }).then((result) => {
      if (result.isConfirmed) {
        const indexLibro = this.carrito.indexOf(libro);
        this.carrito.splice(indexLibro, 1);
        this.precioFinal -= libro.libro_precio * libro.libro_cantidad;
        this.carritoUpdated.emit({
          carritoLength: this.carrito.length,
          carrito: this.carrito,
          precioFinal: this.precioFinal,
        });
      }
    });
  }
  vaciarCarrito() {
    this.carrito != '' && ((this.carrito = []), (this.precioFinal = 0));
    this.carritoUpdated.emit({
      carritoLength: this.carrito.length,
      carrito: this.carrito,
      precioFinal: this.precioFinal,
    });
  }
  ordenarCarrito() {
    this.carrito.sort((a: any, b: any) => a.libro_precio - b.libro_precio);
    this.carritoUpdated.emit({
      carrito: this.carrito,
    });
  }
  enviarCarrito() {
    if (this.carrito.length != 0) {
      if (!this.sesionService.sesionIniciadaBoolean) {
        Swal.fire({
          icon: 'error',
          html: `Debe inciar sesion para realizar una compra`,
          background: '#FFFDD0',
        });
      } else {
        Swal.fire({
          showCloseButton: true,
          icon: 'question',
          html: `Enviaremos la facturación y el método de pago al  correo que usted ha registrado: ${this.sesionService.sesionIniciada.usuario_correo}<br>¿Está de acuerdo?`,
          confirmButtonText: 'Confirmar',
          showCancelButton: true,
          cancelButtonText: 'Cancelar',
          background: '#FFFDD0',
        }).then((result) => {
          if (result.isConfirmed) {
            const factura = {
              usuario_id: this.sesionService.sesionIniciada.usuario_id,
              precio_total: this.precioFinal,
              libros_comprados: [...this.carrito],
            };
            this.dataService.postFactura(JSON.stringify(factura)).subscribe();
            Swal.fire({
              icon: 'success',
              html: `La factura y los métodos de pago han sido enviados a ${this.sesionService.sesionIniciada.usuario_correo}`,
              background: '#FFFDD0',
            });
            this.vaciarCarrito();
            this.ocultarCarrito();
          }
        });
      }
    } else {
      Swal.fire({
        icon: 'error',
        html: `Su carrito está vacío`,
        background: '#FFFDD0',
      });
    }
  }
  getCarritoLength(): any {
    return this.carrito.length;
  }
}
