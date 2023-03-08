import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
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
    return this.sesionIniciada.usuario_correo;
  }

  renderSesion(usuario: Usuarios): Promise<any> {
    this.sesionIniciada = usuario;
    this.sesionCorreo = usuario.usuario_correo.substring(
      0,
      usuario.usuario_correo.indexOf('@')
    );
    this.sesionIniciadaBoolean = true;
    if (usuario.usuario_correo == 'admin@gmail.com') {
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
      usuario_id: 0,
      usuario_correo: '',
      usuario_clave: '',
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
