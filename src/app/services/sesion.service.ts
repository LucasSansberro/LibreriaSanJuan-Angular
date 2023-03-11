import { EventEmitter, Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { Usuarios } from '../models/Usuarios';

@Injectable({
  providedIn: 'root',
})
export class SesionService {
  sesionUpdated: EventEmitter<object> = new EventEmitter();

  sesionIniciadaBoolean: boolean = false;
  sesionIniciada!: Usuarios;
  sesionCorreo: string = 'Anónimo';
  isAdmin: boolean = false;

  constructor() {}

  getSesionCorreo(): string {
    return this.sesionCorreo;
  }
  getIsAdmin(): boolean {
    return this.isAdmin;
  }
  getSesionIniciadaBoolean(): boolean {
    return this.sesionIniciadaBoolean;
  }
  getSesionIniciadaCorreo(): string {
    return this.sesionIniciada.usuarioCorreo;
  }

  renderSesion(usuario: Usuarios): Promise<any> {
    this.sesionIniciada = usuario;
    this.sesionCorreo = usuario.usuarioCorreo.substring(
      0,
      usuario.usuarioCorreo.indexOf('@')
    );
    this.sesionIniciadaBoolean = true;
    if (usuario.isAdmin) {
      this.isAdmin = true;
    }
    this.sesionUpdated.emit({
      sesionCorreo: this.sesionCorreo,
      isAdmin: this.isAdmin,
      sesionIniciada: this.sesionIniciada,
    });
    return Swal.fire({
      icon: 'success',
      html: `Bienvenido ${this.sesionCorreo}`,
      background: '#FFFDD0',
    });
  }

  cerrarSesion(): Promise<any> {
    this.sesionIniciada = {
      usuarioId: 0,
      usuarioCorreo: '',
      usuarioClave: '',
      isAdmin:false
    };
    this.sesionCorreo = 'Anónimo';
    this.sesionIniciadaBoolean = false;
    this.isAdmin = false;
    this.sesionUpdated.emit({
      sesionCorreo: this.sesionCorreo,
      isAdmin: this.isAdmin,
      sesionIniciada: this.sesionIniciada,
    });
    document.getElementById('closeButton')?.click();
    return Swal.fire({
      icon: 'success',
      html: `Sesion cerrada`,
      background: '#FFFDD0',
    });
  }
}
