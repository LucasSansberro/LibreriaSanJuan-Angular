import { Component, OnInit } from '@angular/core';
import { Usuarios } from 'src/app/models/Usuarios';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-users-container',
  templateUrl: './admin-users-container.component.html',
})
export class AdminUsersContainerComponent implements OnInit {
  usuarios: Array<Usuarios> = [];
  constructor(private dataService: DataService) {}

  async eliminarUsuario(id: number, correo: string): Promise<void> {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Quieres eliminar al usuario ${correo}?`,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      allowOutsideClick: true,
      background: '#FFFDD0',
    });
    if (result.isConfirmed) {
      this.dataService.deleteUser(id).subscribe();
      this.usuarios = this.usuarios.filter((user) => user.usuarioId != id);
    }
  }
  ngOnInit(): void {
    this.dataService.getUsuarios().subscribe((data) => (this.usuarios = data));
  }
}
