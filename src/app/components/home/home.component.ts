import { Component, OnInit } from '@angular/core';
import { Libros } from 'src/app/models/Libros';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  libros: Array<Libros> = [];
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService
      .getLibros()
      .subscribe((data) => (this.libros = data.slice(0, 3)));
  }
}
//TODO Hacer el sort según ventas en el back, con join
