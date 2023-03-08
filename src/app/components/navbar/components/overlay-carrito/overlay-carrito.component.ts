import { Component, OnInit } from '@angular/core';
import { CarritoService } from 'src/app/services/carrito.service';

@Component({
  selector: 'app-overlay-carrito',
  templateUrl: './overlay-carrito.component.html',
  styleUrls: ['./overlay-carrito.component.css'],
})
export class OverlayCarritoComponent implements OnInit {
  carrito!: any;
  precioFinal!: any;
  constructor(private carritoService: CarritoService) {}
  ngOnInit(): void {
    this.carritoService.carritoUpdated.subscribe(
      () => (
        (this.carrito = this.carritoService.getCarrito()),
        (this.precioFinal = this.carritoService.getPrecioFinal())
      )
    );
  }
  incrementarCantidadCarrito(id: any) {
    this.carritoService.incrementarCantidadCarrito(id);
  }
  decrementarCantidadCarrito(id: any) {
    this.carritoService.decrementarCantidadCarrito(id);
  }
  eliminarLibroCarrito(id: any) {
    this.carritoService.eliminarLibroCarrito(id);
  }
  ocultarCarrito() {
    this.carritoService.ocultarCarrito();
  }
  ordenarCarrito() {
    this.carritoService.ordenarCarrito();
  }
  vaciarCarrito() {
    this.carritoService.vaciarCarrito();
  }
  enviarCarrito() {
    this.carritoService.enviarCarrito();
  }
}
