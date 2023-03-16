import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertasService } from 'src/app/services/alertas.service';
import { DataService } from 'src/app/services/data.service';
import { SesionService } from 'src/app/services/sesion.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
})
export class RegisterFormComponent implements OnInit {
  registroUsuario!: FormGroup;
  constructor(
    private dataService: DataService,
    private sesionService: SesionService,
    private alertasService: AlertasService
  ) {}
  registrarUsuario(): void {
    const registroCorreo = this.registroUsuario.value.name;
    const registroPassword = this.registroUsuario.value.password;

    this.dataService
      .postUser(
        JSON.stringify({
          usuarioCorreo: registroCorreo,
          usuarioClave: registroPassword,
          isAdmin: false,
        })
      )
      .subscribe({
        next: (res) => (
          this.sesionService.renderSesion(res),
          document.getElementById('closeButton')!.click(),
          this.registroUsuario.reset()
        ),
        error: (e) => {
          if (e.status == 400) {
            this.alertaSimple('error', e.error);
          } else if ((e.status = 400)) {
            this.alertaSimple('error', e.error.message);
          }
        },
      });
  }

  alertaSimple(icon: SweetAlertIcon, text: string) {
    this.alertasService.alertaSimple(icon, text);
  }

  ngOnInit(): void {
    this.registroUsuario = new FormGroup({
      name: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }
}
