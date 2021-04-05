import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Administrador } from '../models/administrador';

@Injectable({
  providedIn: 'root'
})
export class AdministradorservicesService {
  private BASE_URL = 'http://localhost:4000';
  constructor(private http:HttpClient) { 
    
  }
  getValidarCorreo(data:string):Observable<any>{
    console.log(this.http.get(`${this.BASE_URL}/administrador/login/path?data=`+data)+"verificacion en la consoal2")
    return this.http.get(`${this.BASE_URL}/administrador/login/path?data=`+data)
  }

  crearAdmin(administrador:Administrador):Observable<any>{
    return this.http.post(`${this.BASE_URL}/administrador/crear-admin`, administrador)
  }
}