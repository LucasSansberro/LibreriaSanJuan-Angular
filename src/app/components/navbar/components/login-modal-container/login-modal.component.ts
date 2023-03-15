import { Component, OnInit } from '@angular/core';
import { SesionService } from 'src/app/services/sesion.service';

@Component({
  selector: 'app-login-modal-container',
  templateUrl: './login-modal-container.component.html',
  styleUrls: ['./login-modal-container.component.css'],
})
export class LoginModalComponent implements OnInit {
  sesionIniciadaBoolean!: boolean;
  sesionIniciadaCorreo!: string;
  constructor(
    private sesionService: SesionService
  ) {}
  ngOnInit(): void {

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
