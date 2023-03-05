import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Usuarios } from 'src/app/models/Usuarios';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css'],
})
export class LoginModalComponent implements OnInit {
  sesionIniciadaBoolean: boolean = false;
  registroUsuario!: FormGroup;
  inicioSesionUsuario!: FormGroup;

  constructor(private dataService: DataService) {}

  registrarUsuario() {
    const registroCorreo = this.registroUsuario.value.name;
    const registroPassword = this.registroUsuario.value.password;

    this.dataService.getUsuarios().subscribe((data) => {
      const usuarioRepetido = data.find(
        (usuario: Usuarios) => usuario.usuario_correo == registroCorreo
      );
      usuarioRepetido == undefined
        ? this.dataService
            .postUser(
              JSON.stringify({
                usuario_correo: registroCorreo,
                usuario_clave: registroPassword,
              })
            )
            .subscribe()
        : console.log('Malísimo');
    });

    this.registroUsuario.reset();
  }
  iniciarSesion() {
    const sesionCorreo = this.inicioSesionUsuario.value.name;
    const sesionPassword = this.inicioSesionUsuario.value.password;
    this.dataService
      .getUsuarios()
      .subscribe((data) =>
        data.filter(
          (usuario: Usuarios) =>
            usuario.usuario_correo == sesionCorreo &&
            usuario.usuario_clave == sesionPassword
        ).length > 0
          ? console.log('Buenísimo')
          : console.log('Malísimo')
      );
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
