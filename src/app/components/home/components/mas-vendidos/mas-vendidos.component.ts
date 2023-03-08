import { Component, Input } from '@angular/core';
import { Libros } from 'src/app/models/Libros';

@Component({
  selector: 'app-mas-vendidos',
  templateUrl: './mas-vendidos.component.html',
  styleUrls: ['./mas-vendidos.component.css']
})
export class MasVendidosComponent {
 @Input() libros : Array<Libros> = []
}
