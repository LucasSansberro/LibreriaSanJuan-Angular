export class Usuarios {
  usuarioId: number;
  usuarioCorreo: string;
  admin: boolean;

  constructor(
    usuarioId: number,
    usuarioCorreo: string,
    admin: boolean
  ) {
    this.usuarioId = usuarioId;
    this.usuarioCorreo = usuarioCorreo;
    this.admin = admin;
  }
}
