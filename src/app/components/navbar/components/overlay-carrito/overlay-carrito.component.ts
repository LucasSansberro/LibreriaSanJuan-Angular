import { Component } from '@angular/core';
import { CarritoService } from 'src/app/services/carrito.service';

@Component({
  selector: 'app-overlay-carrito',
  templateUrl: './overlay-carrito.component.html',
  styleUrls: ['./overlay-carrito.component.css']
})
export class OverlayCarritoComponent {
constructor( public carritoService : CarritoService){

}
}
