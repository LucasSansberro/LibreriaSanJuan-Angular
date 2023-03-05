import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Usuarios } from 'src/app/models/Usuarios';
import { DataService } from 'src/app/services/data.service';
import { SesionService } from 'src/app/services/sesion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css'],
})
export class LoginModalComponent implements OnInit {
  registroUsuario!: FormGroup;
  inicioSesionUsuario!: FormGroup;

  constructor(
    private dataService: DataService,
    public sesionService: SesionService
  ) {}

  registrarUsuario() {
    const registroCorreo = this.registroUsuario.value.name;
    const registroPassword = this.registroUsuario.value.password;

    this.dataService.getUsuarios().subscribe((data) => {
      const usuarioRepetido = data.find(
        (usuario: Usuarios) => usuario.usuario_correo == registroCorreo
      );
      usuarioRepetido == undefined
        ? (this.dataService
            .postUser(
              JSON.stringify({
                usuario_correo: registroCorreo,
                usuario_clave: registroPassword,
              })
            )
            .subscribe(),
          this.sesionService.renderSesion(data[data.length - 1]),
          document.getElementById('closeButton')?.click())
        : console.log('Malísimo');
    });

    this.registroUsuario.reset();
  }
  iniciarSesion() {
    const sesionCorreo = this.inicioSesionUsuario.value.name;
    const sesionPassword = this.inicioSesionUsuario.value.password;
    this.dataService.getUsuarios().subscribe((data) => {
      const user: Usuarios[] = data.filter(
        (usuario: Usuarios) =>
          usuario.usuario_correo == sesionCorreo &&
          usuario.usuario_clave == sesionPassword
      );
      user.length > 0
        ? (this.sesionService.renderSesion(user[0]),
          document.getElementById('closeButton')?.click())
        : console.log('Malísimo');
    });
    this.inicioSesionUsuario.reset();
  }

  ngOnInit(): void {
    Swal.showValidationMessage(''); //Carga de estilos de Swal para el form

    this.registroUsuario = new FormGroup({
      name: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
    this.inicioSesionUsuario = new FormGroup({
      name: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }
}

//TODO De momento el rendersesion con el post no funciona correctamente. Le falta actualizarse
//Lo ideal sería que el backend respondiese, tras el post, con el elemento creado. Línea 39
