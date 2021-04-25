import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private token: string

  private saveToken(token: string): void {
    localStorage.setItem('usertoken', token)
    this.token = token
  }

  private BASE_URL = 'http://127.0.0.1:4000';

  constructor(private http:HttpClient) { }

  createUser(usuario: Usuario): Observable<any> {

    usuario.foto = "";

    return this.http.post(`${this.BASE_URL}/usuario/crear`, usuario);
  }

  listUser( correo: string): Observable<any>{
    return this.http.get(`${this.BASE_URL}/usuario/correo/`+ correo)
  }

  modificarUser(correo: string, usuario: Usuario): Observable<any>{
    return this.http.post(`${this.BASE_URL}/usuario/update/${correo}`, usuario);
  }

  deleteUser(usuario: Usuario):Observable<any>  {
    return this.http.post(`${this.BASE_URL}/usuario/eliminar`, usuario);
  }

  login(correo: string, passw:string): Observable<any>{
    return this.http.get(`${this.BASE_URL}/usuario/password/${correo}/${passw}`)
  }

  listUser2(): Observable<any>{
    return this.http.get(`${this.BASE_URL}/usuario/list`)
  }

}
