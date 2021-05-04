import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Catalogos } from '../models/catalogos';

@Injectable({
  providedIn: 'root'
})
export class CatalogosservicesService {

private BASE_URL = 'http://localhost:4000';
  constructor(private http:HttpClient) {

  }
getCatalogos():Observable<any>{
  return this.http.get(`${this.BASE_URL}/catalogos/catalogos-listas`);
}
listar():Observable<any>{
  return this.http.get(`${this.BASE_URL}/catalogo/ver`);
}

Nuevo(data: Catalogos):Observable<any>{
  return this.http.post(`${this.BASE_URL}/catalogo/nuevo`, data);
}

eliminar(tipo: String, data: String){
  return this.http.get(this.BASE_URL+"/catalogo/eliminar/"+tipo+"/"+data);
}

}