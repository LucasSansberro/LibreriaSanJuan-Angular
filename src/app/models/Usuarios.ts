export class Usuarios {
  usuarioId: number;
  usuarioCorreo: string;
  usuarioClave: string;
  isAdmin: boolean;

  constructor(
    usuarioId: number,
    usuarioCorreo: string,
    usuarioClave: string,
    isAdmin: boolean
  ) {
    this.usuarioId = usuarioId;
    this.usuarioCorreo = usuarioCorreo;
    this.usuarioClave = usuarioClave;
    this.isAdmin = isAdmin;
  }
}
