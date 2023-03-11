import { Libros } from './Libros';

export class Facturas {
  usuarioId: number;
  precioFinal: number;
  librosComprados: Array<Libros>;

  constructor(
    usuarioId: number,
    precioFinal: number,
    librosComprados: Array<Libros>
  ) {
    this.usuarioId = usuarioId;
    this.precioFinal = precioFinal;
    this.librosComprados = librosComprados;
  }
}
