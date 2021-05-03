import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Administrador } from '../models/administrador';
import { AdministradoresComponent } from '../components/administradores/administradores.component';

@Injectable({
  providedIn: 'root'
})
export class AdministradorservicesService {

  private BASE_URL = 'http://localhost:4000/administrador';

  constructor(private http:HttpClient) {}
  
  getValidarCorreo(data:string):Observable<any>{
    console.log(this.http.get(`${this.BASE_URL}/login/path?data=`+data)+"verificacion en la consoal2")
    return this.http.get(`${this.BASE_URL}/login/${data}`)
  }

  crearAdmin(administrador:Administrador, action:string):Observable<any>{
    administrador.foto = "";
    return this.http.post(`${this.BASE_URL}/guardar/${action}`, administrador)
  }

  getAllAdmins(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/listar`);
  }

  deleteAdmin(administrador: Administrador):Observable<any>  {
    return this.http.post(`${this.BASE_URL}/eliminar`, administrador);
  }
}