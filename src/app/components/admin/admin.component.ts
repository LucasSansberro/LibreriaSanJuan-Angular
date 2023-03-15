import { Component } from '@angular/core';
import { SesionService } from 'src/app/services/sesion.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
})
export class AdminComponent {
  isAdmin: boolean = this.sesionService.getIsAdmin();
  constructor(private sesionService: SesionService) {}
  ngOnInit(): void {
    this.sesionService.sesionUpdated.subscribe(
      () => (this.isAdmin = this.sesionService.getIsAdmin())
    );
  }
}
