import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ticket } from '../models/ticket';
import { map } from 'rxjs/operators';
import { Mensajes } from '../models/mensajes';

@Injectable({
  providedIn: 'root'
})

export class TicketService {

  private URL = 'http://127.0.0.1:4000';
  constructor(private http:HttpClient) { }

  data( correo: String): Observable<any>{
    return this.http.get(`${this.URL}/detalle/caso/`+ correo);
  }

  detalleticket(id: String): Observable<any>{
    return this.http.get(`${this.URL}/detalle/ticket/`+ id);
  }

  mensajesticket(id: String): Observable<any> {
    return this.http.get(`${this.URL}/detalle/mensajes/`+ id);
  }

  addmensaje(mensajes: Mensajes): Observable<any> {
    return this.http.post(`${this.URL}/mensajes/chat`, mensajes);

  }

  crearTicket(tickets: Ticket): Observable<any> {
    return this.http.post(`${this.URL}/ticket/crear-ticket`,Ticket);
  }
  
}
