import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private BASE_URL = 'http://127.0.0.1:4000';

  constructor(private http:HttpClient) { }

  createUser(usuario: Usuario): Observable<any> {

    usuario.foto = "";

    return this.http.post(`${this.BASE_URL}/usuario/crear`, usuario);
  }

}
