import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-libros-home',
  templateUrl: './libros-home.component.html',
  styleUrls: ['./libros-home.component.css']
})
export class LibrosHomeComponent {
@Input() libros: any
}
