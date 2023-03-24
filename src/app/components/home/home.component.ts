import { Component, OnInit } from '@angular/core';
import { Libros } from 'src/app/models/Libros';
import { CarritoService } from 'src/app/services/carrito.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  libros: Array<Libros> = [];
  constructor(
    private dataService: DataService,
    private carritoService: CarritoService
  ) {}

  renderizarLibros(): void {
    this.dataService
      .getLibrosMasVendidos()
      .subscribe((data) => (this.libros = data));
  }

  ngOnInit(): void {
    this.renderizarLibros();

    this.carritoService.facturaRealizada.subscribe(() =>
      this.renderizarLibros()
    );
  }
}

//TODO Hacer unsubscribe
