export class Libros {
  libroId: number;
  libroPrecio: number;
  libroTitulo: string;
  libroAutor: string;
  libroPortada: string;
  libroCantidad?:number;
  descuento?:boolean;

  constructor(
    libroId: number,
    libroPrecio: number,
    libroTitulo: string,
    libroAutor: string,
    libroPortada: string,
  ) {
    this.libroId = libroId;
    this.libroPrecio = libroPrecio;
    this.libroTitulo = libroTitulo;
    this.libroAutor = libroAutor;
    this.libroPortada = libroPortada;
  }
}
