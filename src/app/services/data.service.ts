import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private URL = 'http://localhost:8080/apirest-1.0-SNAPSHOT/api';
  constructor(private http: HttpClient) {}
  getLibros(): Observable<any> {
    return this.http.get(`${this.URL}/libros`);
  }
  getUsuarios(): Observable<any> {
    return this.http.get(`${this.URL}/usuarios`);
  }
  postUser(user: any): Observable<any> {
    return this.http.post(`${this.URL}/usuarios`, user, httpOptions);
  }
  postFactura(factura: any): Observable<any> {
    return this.http.post(`${this.URL}/facturas`, factura, httpOptions);
  }
}
