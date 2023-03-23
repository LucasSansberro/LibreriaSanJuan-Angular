import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertasService } from 'src/app/services/alertas.service';
import { DataService } from 'src/app/services/data.service';
import { SesionService } from 'src/app/services/sesion.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent {
  inicioSesionUsuario!: FormGroup;

  constructor(
    private dataService: DataService,
    private sesionService: SesionService,
    private alertaService: AlertasService
  ) {}

  iniciarSesion(): void {
    const sesionCorreo = this.inicioSesionUsuario.value.name;
    const sesionPassword = this.inicioSesionUsuario.value.password;

    this.dataService
      .postLoginUser(
        JSON.stringify({
          usuarioCorreo: sesionCorreo,
          usuarioClave: sesionPassword,
        })
      )
      .subscribe({
        next: (res) => (
          this.sesionService.renderSesion(res),
          document.getElementById('closeButton')!.click(),
          this.inicioSesionUsuario.reset()
        ),
        error: (e) => this.alertaSimple('error', e.error),
      });
  }

  alertaSimple(icon: SweetAlertIcon, text: string) {
    this.alertaService.alertaSimple(icon, text);
  }

  ngOnInit(): void {
    this.inicioSesionUsuario = new FormGroup({
      name: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }
}
