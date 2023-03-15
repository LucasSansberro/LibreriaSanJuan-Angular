import { Component, OnInit } from '@angular/core';
import { CarritoService } from 'src/app/services/carrito.service';
import { SesionService } from 'src/app/services/sesion.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
})
export class NavComponent implements OnInit {
  carritoLength: number = this.carritoService.getCarritoLength();
  isAdmin: boolean = this.sesionService.getIsAdmin();
  sesionCorreo: string = this.sesionService.getSesionCorreo();

  constructor(
    private sesionService: SesionService,
    private carritoService: CarritoService
  ) {}

  ngOnInit(): void {
    this.carritoService.carritoUpdated.subscribe(
      () => (this.carritoLength = this.carritoService.getCarritoLength())
    );
    this.sesionService.sesionUpdated.subscribe(
      () => (
        (this.isAdmin = this.sesionService.getIsAdmin()),
        (this.sesionCorreo = this.sesionService.getSesionCorreo())
      )
    );
  }
  mostrarCarrito() : void {
    this.carritoService.mostrarCarrito();
  }
}
