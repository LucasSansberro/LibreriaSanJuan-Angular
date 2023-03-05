import { Component } from '@angular/core';
import { CarritoService } from 'src/app/services/carrito.service';
import { SesionService } from 'src/app/services/sesion.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {

  constructor(public sesionService: SesionService, public carritoService : CarritoService) {
  }
}
