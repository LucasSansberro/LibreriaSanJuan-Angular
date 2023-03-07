import { Component, OnInit } from '@angular/core';
import { Libros } from 'src/app/models/Libros';
import { Usuarios } from 'src/app/models/Usuarios';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  libros: Array<Libros> = [];
  usuarios: Array<Usuarios> = [];
  constructor(private dataService: DataService) {}

  eliminarUsuario(id: any, correo: any) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Quieres eliminar al usuario ${correo}?`,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      allowOutsideClick: true,
      background: '#FFFDD0',
    }).then((result) => {
      if (result.isConfirmed) {
        this.dataService.deleteUser(id).subscribe();
        this.usuarios = this.usuarios.filter((user) => user.usuario_id != id);
      }
    });
  }

  editarLibro(id: any, titulo: any, precio: any, autor: any, portada: any) {
    Swal.fire({
      title: 'Editar libro',
      html: `
      <div class="d-flex flex-column justify-content-around">
      <label for="titulo">Título</label>
      <input type="text" id="titulo" class="swal2-input mb-4" name="titulo" value='${titulo}'>
      <label for="precio">Precio</label>
      <input type="number" id="precio" class="swal2-input mb-4" name="precio" value=${precio}>
      <label for="autor">Autor</label>
      <input type="text" id="autor" class="swal2-input mb-4" name="autor" value='${autor}'>
      <label for="portada">Portada</label>
      <input type="text" id="portada" class="swal2-input mb-4" name="portada" value=${portada}>
      </div>`,
      confirmButtonText: 'Confirmar cambios',
      focusConfirm: false,
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      showCloseButton: true,
      background: '#FFFDD0',
      preConfirm: () => {
        const titulo = (
          Swal.getPopup()!.querySelector('#titulo') as HTMLInputElement
        ).value;
        const precio = (
          Swal.getPopup()!.querySelector('#precio') as HTMLInputElement
        ).value;
        const autor = (
          Swal.getPopup()!.querySelector('#autor') as HTMLInputElement
        ).value;
        const portada = (
          Swal.getPopup()!.querySelector('#portada') as HTMLInputElement
        ).value;

        return { titulo, precio, autor, portada };
      },
    })
      .then((result) => {
        if (result.isConfirmed) {
          const updatedValues = {
            libro_id: id,
            libro_precio: parseInt(result.value!.precio),
            libro_titulo: result.value!.titulo,
            libro_autor: result.value!.autor,
            libro_portada: result.value!.portada,
          };

          this.dataService
            .updateLibro(JSON.stringify(updatedValues))
            .subscribe();
          const libroEditado = this.libros.find(
            (libroBuscado) => libroBuscado.libro_id == id
          );
          this.libros[this.libros.indexOf(libroEditado!)] = updatedValues;
        }
      })
      .catch(() => console.log('Error de parte del servidor'));
  }

  agregarLibro() {
    Swal.fire({
      title: 'Agregar libro',
      html: `
      <div class="d-flex flex-column justify-content-around">
      <label for="titulo">Título</label>
      <input type="text" id="titulo" class="swal2-input mb-4" name="titulo" placeholder="Título">
      <label for="precio">Precio</label>
      <input type="number" id="precio" class="swal2-input mb-4" name="precio" placeholder="Precio">
      <label for="autor">Autor</label>
      <input type="text" id="autor" class="swal2-input mb-4" name="autor" placeholder="Autor">
      <label for="portada">Portada</label>
      <input type="text" id="portada" class="swal2-input mb-4" name="portada" placeholder="Portada">
      </div>`,
      confirmButtonText: 'Confirmar',
      focusConfirm: false,
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      showCloseButton: true,
      background: '#FFFDD0',
      preConfirm: () => {
        const titulo = (
          Swal.getPopup()!.querySelector('#titulo') as HTMLInputElement
        ).value;
        const precio = (
          Swal.getPopup()!.querySelector('#precio') as HTMLInputElement
        ).value;
        const autor = (
          Swal.getPopup()!.querySelector('#autor') as HTMLInputElement
        ).value;
        const portada = (
          Swal.getPopup()!.querySelector('#portada') as HTMLInputElement
        ).value;

        return { titulo, precio, autor, portada };
      },
    })
      .then(async (result) => {
        if (result.isConfirmed) {
          const nuevoLibro = {
            libro_precio: parseInt(result.value!.precio),
            libro_titulo: result.value!.titulo,
            libro_autor: result.value!.autor,
            libro_portada: result.value!.portada,
          };
          this.dataService.postLibro(JSON.stringify(nuevoLibro)).subscribe();
          //TODO Para renderiar hace falta que el back devuelva el id del post
        }
      })
      .catch(() => {
        console.log('Error de parte del servidor');
      });
  }

  eliminarLibro(id: any, titulo: any) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Quieres eliminar a ${titulo} de la lista de libros?`,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      allowOutsideClick: true,
      background: '#FFFDD0',
    }).then((result) => {
      if (result.isConfirmed) {
        this.dataService.deleteLibro(id).subscribe();
        this.libros = this.libros.filter(
          (libroBuscado) => libroBuscado.libro_id != id
        );
      }
    });
  }

  ngOnInit(): void {
    this.dataService.getLibros().subscribe((data) => (this.libros = data));
    this.dataService.getUsuarios().subscribe((data) => (this.usuarios = data));
  }
}
