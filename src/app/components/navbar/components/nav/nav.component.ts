import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  sesionIniciadaBoolean: boolean = false;
  usuarios: any;

  constructor(private dataService: DataService) {}

  validarCorreoYPassword(correo: string, password: string): any {
    if (!correo.match(/^\S+@\S+\.\S+$/)) {
      return Swal.showValidationMessage(`Por favor, ingrese un correo válido`);
    }
    if (password == '') {
      return Swal.showValidationMessage(`Por favor, ingrese una contraseña`);
    }
    return true;
  }
  registrarUsuario() {
    const registroCorreo = this.registroUsuario.value.name;
    const registroPassword = this.registroUsuario.value.password;

    this.dataService.getUsuarios().subscribe((data) => {
      this.usuarios = data;
      const usuarioRepetido = this.usuarios.find(
        (usuario: any) => usuario.usuario_correo == registroCorreo
      );
      usuarioRepetido == undefined
        ? console.log('Buenísimo')
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
          (usuario: any) =>
            usuario.usuario_correo == sesionCorreo &&
            usuario.usuario_clave == sesionPassword
        ).length > 0
          ? console.log('Buenísimo')
          : console.log('Malísimo')
      );
    this.inicioSesionUsuario.reset();
  }
  registroUsuario!: FormGroup;
  inicioSesionUsuario!: FormGroup;
  ngOnInit(): void {
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
