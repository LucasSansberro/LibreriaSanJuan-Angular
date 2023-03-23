import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertasService } from 'src/app/services/alertas.service';
import { SesionService } from 'src/app/services/sesion.service';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css'],
})
export class ContactoComponent {
  formData = {
    asunto: '',
    message: '',
  };

  onSubmit(form: any) {
    if (!this.sesionService.getSesionIniciadaBoolean()) {
      this.alertaService.alertaSimple(
        'error',
        'Debe iniciar sesión para poder enviar un mensaje'
      );
    } else {
      this.alertaService.alertaSimple(
        'success',
        'Mensaje enviado. Recibirá la respuesta cuanto antes en el correo asociado a su cuenta'
      );
      form.reset();
    }
  }

  constructor(
    private alertaService: AlertasService,
    private sesionService: SesionService
  ) {}
}
