import { Libros } from './Libros';
import { Usuarios } from './Usuarios';

export interface UsuariosResponse {
  message: string;
  ok: boolean;
  response: Array<Usuarios>;
  statusCode: number;
}

export interface LibrosResponse {
  message: string;
  ok: boolean;
  response: Array<Libros>;
  statusCode: number;
}

export interface UsuarioResponse {
  message: string;
  ok: boolean;
  response: Usuarios;
  statusCode: number;
}

export interface LibroResponse {
  message: string;
  ok: boolean;
  response: Libros;
  statusCode: number;
}
