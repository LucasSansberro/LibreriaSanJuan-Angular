import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css'],
})
export class LibrosComponent {
  libros: any;
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getLibros().subscribe((data) => (this.libros = data));
  }
}
