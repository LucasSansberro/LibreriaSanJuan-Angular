import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  libros: any;
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService
      .getLibros()
      .subscribe(
        (data) => (
          (this.libros = data.slice(0, 3))
        )
      );
  }
}
