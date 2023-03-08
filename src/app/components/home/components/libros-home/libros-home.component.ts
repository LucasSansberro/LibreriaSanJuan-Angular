import { Component, Input } from '@angular/core';
import { Libros } from 'src/app/models/Libros';
import { CarritoService } from 'src/app/services/carrito.service';

@Component({
  selector: 'app-libros-home',
  templateUrl: './libros-home.component.html',
  styleUrls: ['./libros-home.component.css'],
})
export class LibrosHomeComponent {
  @Input() libros!: Array<Libros>

  constructor(private carritoService: CarritoService) {}
  agregarLibroCarrito(libro : Libros){
    this.carritoService.agregarLibroCarrito(libro)
  }
}
