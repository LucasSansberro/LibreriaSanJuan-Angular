export class Usuarios {
  usuario_id: number;
  usuario_correo: string;
  usuario_clave: string;

  constructor(
    usuario_id: number,
    usuario_correo: string,
    usuario_clave: string
  ) {
    this.usuario_id = usuario_id;
    this.usuario_correo = usuario_correo;
    this.usuario_clave = usuario_clave;
  }
}
