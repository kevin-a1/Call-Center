import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ticket } from '../models/ticket';
import { Mensajes } from '../models/mensajes';

@Injectable({
  providedIn: 'root'
})

export class TicketService {

  private URL = 'http://127.0.0.1:4000';
  constructor(private http:HttpClient) { }

  getcontotal(): Observable<any>{
    return this.http.get(`${this.URL}/detalle/tickets/`);
  }
  
  getconcorreo(correo: String): Observable<any>{
    return this.http.get(`${this.URL}/detalle/correo/`+correo);
  }
  
  getconestado(estado: String): Observable<any>{
    return this.http.get(`${this.URL}/detalle/estado/`+estado);
  }
  
  getcontipo(tipo_caso: String): Observable<any>{
    return this.http.get(`${this.URL}/detalle/tipocaso/`+tipo_caso);
  }


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
    return this.http.post(`${this.URL}/ticket/crear-ticket`,tickets);
  }
  
  getAllTickets():Observable<any> {
    return this.http.get(`${this.URL}/ticket/casos-abiertos`);
  }

  addResponsable(tichet_id: String, usuario: String): Observable<any> {
    return this.http.get(`${this.URL}/ticket/asignarme/${tichet_id}/${usuario}`);
  }
}
