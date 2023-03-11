import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Usuarios } from 'src/app/models/Usuarios';
import { DataService } from 'src/app/services/data.service';
import { SesionService } from 'src/app/services/sesion.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css'],
})
export class LoginModalComponent implements OnInit {
  registroUsuario!: FormGroup;
  inicioSesionUsuario!: FormGroup;
  sesionIniciadaBoolean!: boolean;
  sesionIniciadaCorreo!: string;

  constructor(
    private dataService: DataService,
    private sesionService: SesionService
  ) {}

  registrarUsuario(): any {
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
        next: (res) => this.sesionService.renderSesion(res),
        error: () => console.log('Usuario repetido'),
      }),
      document.getElementById('closeButton')!.click();
    this.registroUsuario.reset();
  }

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
        next: (res) => this.sesionService.renderSesion(res),
        error: () => console.log('Usuario inexistente'),
      }),
      document.getElementById('closeButton')!.click();
    this.registroUsuario.reset();
  }

  cerrarSesion(): void {
    this.sesionService.cerrarSesion();
  }
  ngOnInit(): void {
    this.registroUsuario = new FormGroup({
      name: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
    this.inicioSesionUsuario = new FormGroup({
      name: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });

    this.sesionService.sesionUpdated.subscribe(
      () => (
        (this.sesionIniciadaBoolean =
          this.sesionService.getSesionIniciadaBoolean()),
        (this.sesionIniciadaCorreo =
          this.sesionService.getSesionIniciadaCorreo())
      )
    );
  }
}

//TODO De momento el rendersesion con el post no funciona correctamente. Le falta actualizarse
//Lo ideal sería que el backend respondiese, tras el post, con el elemento creado. Línea 39
