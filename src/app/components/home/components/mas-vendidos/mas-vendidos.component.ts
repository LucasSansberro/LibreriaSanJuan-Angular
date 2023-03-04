import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-mas-vendidos',
  templateUrl: './mas-vendidos.component.html',
  styleUrls: ['./mas-vendidos.component.css']
})
export class MasVendidosComponent {
 @Input() libros : any
}
