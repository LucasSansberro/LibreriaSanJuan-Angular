import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { Usuarios } from '../models/Usuarios';

@Injectable({
  providedIn: 'root',
})
export class SesionService {
  sesionIniciadaBoolean: boolean = false;
  sesionIniciada!: Usuarios;
  sesionCorreo: string = 'Anónimo';

  constructor() {}

  renderSesion(usuario: Usuarios): any {
    this.sesionIniciada = usuario;
    this.sesionCorreo = usuario.usuario_correo.substring(
      0,
      usuario.usuario_correo.indexOf('@')
    );
    this.sesionIniciadaBoolean = true;

    return Swal.fire({
      icon: 'success',
      html: `Bienvenido ${this.sesionCorreo}`,
      background: '#FFFDD0',
    });
  }
  cerrarSesion(): any {
    this.sesionIniciada = {
      usuario_id: 0,
      usuario_correo: '',
      usuario_clave: '',
    };
    this.sesionCorreo = 'Anónimo';
    this.sesionIniciadaBoolean = false;
    document.getElementById('closeButton')?.click()
    return Swal.fire({
      icon: 'success',
      html: `Sesion cerrada`,
      background: '#FFFDD0',
    });
  }
}
