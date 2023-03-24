import { Component, OnInit } from '@angular/core';
import { Libros } from 'src/app/models/Libros';
import { CarritoService } from 'src/app/services/carrito.service';

@Component({
  selector: 'app-overlay-carrito',
  templateUrl: './overlay-carrito.component.html',
})
export class OverlayCarritoComponent implements OnInit {
  carrito!: Array<Libros>;
  precioFinal: number = 0

  constructor(private carritoService: CarritoService) {}
  ngOnInit(): void {
    this.carritoService.carritoUpdated.subscribe(
      () => (
        (this.carrito = this.carritoService.getCarrito()),
        (this.precioFinal = this.carritoService.getPrecioFinal())
      )
    );
  }
  incrementarCantidadCarrito(id: number): void {
    this.carritoService.incrementarCantidadCarrito(id);
  }
  decrementarCantidadCarrito(id: number): void {
    this.carritoService.decrementarCantidadCarrito(id);
  }
  eliminarLibroCarrito(id: number): void {
    this.carritoService.eliminarLibroCarrito(id);
  }
  ocultarCarrito(): void {
    this.carritoService.ocultarCarrito();
  }
  ordenarCarrito(): void {
    this.carritoService.ordenarCarrito();
  }
  vaciarCarrito(): void {
    this.carritoService.vaciarCarrito();
  }
  enviarCarrito(): void {
    this.carritoService.enviarCarrito();
  }
}
