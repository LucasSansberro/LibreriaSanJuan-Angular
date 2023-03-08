import { Libros } from './Libros';

export class Facturas {
  usuario_id: number;
  precioFinal: number;
  libros_comprados: Array<Libros>;

  constructor(
    usuario_id: number,
    precioFinal: number,
    libros_comprados: Array<Libros>
  ) {
    this.usuario_id = usuario_id;
    this.precioFinal = precioFinal;
    this.libros_comprados = libros_comprados;
  }
}
