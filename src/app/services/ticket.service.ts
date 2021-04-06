import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ticket } from '../models/ticket';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private URL = 'http://127.0.0.1:4000';
  constructor(private http:HttpClient) { }

  data( correo: String): Observable<any>{
    return this.http.get(`${this.URL}/ticket/`+ correo)
  }
}
