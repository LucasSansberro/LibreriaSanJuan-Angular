import { Component } from '@angular/core';
import { Libros } from 'src/app/models/Libros';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css'],
})
export class LibrosComponent {
  libros: Array<Libros> = [];
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getLibros().subscribe((data) => (this.libros = data));
  }
}
