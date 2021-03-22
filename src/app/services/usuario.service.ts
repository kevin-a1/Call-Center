import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private BASE_URL = 'http://127.0.0.1:4000/user';

  constructor(private http:HttpClient) { }

  createUser(usuario: Object): Observable<any> {
    return this.http.post(`${this.BASE_URL}/usuario/crear`, usuario);
  }

}
