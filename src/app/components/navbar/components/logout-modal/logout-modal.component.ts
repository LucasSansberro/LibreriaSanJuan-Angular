import { Component, Input } from '@angular/core';
import { SesionService } from 'src/app/services/sesion.service';

@Component({
  selector: 'app-logout-modal',
  templateUrl: './logout-modal.component.html'
})
export class LogoutModalComponent {
  @Input() correo: string = '';
  constructor(private sesionService: SesionService) {}
  cerrarSesion(): void {
    this.sesionService.cerrarSesion();
  }
}
