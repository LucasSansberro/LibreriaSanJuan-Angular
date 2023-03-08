export class Libros {
  libro_id: number;
  libro_precio: number;
  libro_titulo: string;
  libro_autor: string;
  libro_portada: string;
  libro_cantidad?:number

  constructor(
    libro_id: number,
    libro_precio: number,
    libro_titulo: string,
    libro_autor: string,
    libro_portada: string,
  ) {
    this.libro_id = libro_id;
    this.libro_precio = libro_precio;
    this.libro_titulo = libro_titulo;
    this.libro_autor = libro_autor;
    this.libro_portada = libro_portada;
  }
}
