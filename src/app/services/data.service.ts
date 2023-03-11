import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Libros } from '../models/Libros';
import { Usuarios } from '../models/Usuarios';
import { Facturas } from '../models/Facturas';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  httpOptions: object = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  private URL = 'http://localhost:8080/api';
  constructor(private http: HttpClient) {}
  getLibros(): Observable<Array<Libros>> {
    return this.http.get<Array<Libros>>(`${this.URL}/libros`);
  }
  postLibro(libro: string): Observable<Libros> {
    return this.http.post<Libros>(
      `${this.URL}/libros`,
      libro,
      this.httpOptions
    );
  }
  updateLibro(libro: string, id: number): Observable<Libros> {
    return this.http.put<Libros>(
      `${this.URL}/libros/${id}`,
      libro,
      this.httpOptions
    );
  }
  deleteLibro(id: number): Observable<Libros> {
    return this.http.delete<Libros>(`${this.URL}/libros/${id}`);
  }

  getUsuarios(): Observable<Array<Usuarios>> {
    return this.http.get<Array<Usuarios>>(`${this.URL}/usuarios`);
  }
  postUser(user: string): Observable<Usuarios> {
    return this.http.post<Usuarios>(
      `${this.URL}/usuarios`,
      user,
      this.httpOptions
    );
  }
  postLoginUser(user: string): Observable<Usuarios> {
    return this.http.post<Usuarios>(
      `${this.URL}/usuarios/login`,
      user,
      this.httpOptions
    );
  }
  deleteUser(id: number): Observable<Usuarios> {
    return this.http.delete<Usuarios>(`${this.URL}/usuarios/${id}`);
  }
  postFactura(factura: string): Observable<Facturas> {
    return this.http.post<Facturas>(
      `${this.URL}/facturas`,
      factura,
      this.httpOptions
    );
  }
}
