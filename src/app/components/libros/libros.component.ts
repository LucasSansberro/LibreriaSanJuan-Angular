import { Component } from '@angular/core';
import { Libros } from 'src/app/models/Libros';
import { CarritoService } from 'src/app/services/carrito.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css'],
})
export class LibrosComponent {
  libros: Array<Libros> = [];
  librosMasVendidos: Array<Libros> = [];
  constructor(
    private dataService: DataService,
    private carritoService: CarritoService
  ) {}

  agregarLibroCarrito(libro: Libros) {
    this.carritoService.agregarLibroCarrito(libro);
  }
  renderizarLibrosConDescuento(): void {
    this.dataService.getLibros().subscribe(
      (data) => (
        (this.libros = data),
        //Para aplicar el descuento, traemos por fetch el array de libros más vendidos
        this.dataService.getLibrosMasVendidos().subscribe(
          (data) => (
            (this.librosMasVendidos = data),
            //Comparamos los array para encontrar los items con mismo título
            this.librosMasVendidos.forEach((libro) => {
              const librosVendidos = this.libros.find(
                (libroBuscado) => libroBuscado.libroTitulo == libro.libroTitulo
              );
              //Una vez encontrada la coincidencia, utilizamos su posición en el array para reemplazar algunos de sus valores para aplicar el descuento
              this.libros[this.libros.indexOf(librosVendidos!)] = {
                ...this.libros[this.libros.indexOf(librosVendidos!)],
                libroPrecio: libro.libroPrecio,
                descuento: true,
              };
            })
          )
        )
      )
    );
  }

  ngOnInit(): void {
    this.renderizarLibrosConDescuento();
    this.carritoService.facturaRealizada.subscribe(() =>
      this.renderizarLibrosConDescuento()
    );
  }
}
