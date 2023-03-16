import { EventEmitter, Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { Usuarios } from '../models/Usuarios';
import { AlertasService } from './alertas.service';

@Injectable({
  providedIn: 'root',
})
export class SesionService {
  sesionUpdated: EventEmitter<object> = new EventEmitter();

  private sesionIniciadaBoolean: boolean = false;
  private sesionIniciada!: Usuarios;
  private sesionCorreo: string = 'Anónimo';
  private isAdmin: boolean = false;

  constructor(private alertaService: AlertasService) {}

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
  getSesionIniciadaId(): number {
    return this.sesionIniciada.usuarioId;
  }

  renderSesion(usuario: Usuarios): void {
    this.sesionIniciada = usuario;
    this.sesionCorreo = usuario.usuarioCorreo.substring(
      0,
      usuario.usuarioCorreo.indexOf('@')
    );
    this.sesionIniciadaBoolean = true;
    if (usuario.admin) {
      this.isAdmin = true;
    }
    this.sesionUpdated.emit({
      sesionCorreo: this.sesionCorreo,
      isAdmin: this.isAdmin,
      sesionIniciada: this.sesionIniciada,
    });
    return this.alertaSimple('success', `Bienvenido ${this.sesionCorreo}`);
  }

  cerrarSesion(): void {
    this.sesionIniciada = {
      usuarioId: 0,
      usuarioCorreo: '',
      admin: false,
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
    return this.alertaSimple('success', 'Sesión cerrada');
  }

  alertaSimple(icon: SweetAlertIcon, text: string): void {
    this.alertaService.alertaSimple(icon, text);
  }
}
