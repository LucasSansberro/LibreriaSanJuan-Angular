import { Component, Input } from '@angular/core';
import { CarritoService } from 'src/app/services/carrito.service';

@Component({
  selector: 'app-libros-home',
  templateUrl: './libros-home.component.html',
  styleUrls: ['./libros-home.component.css'],
})
export class LibrosHomeComponent {
  @Input() libros: any;

  constructor(public carritoService: CarritoService) {}
}
