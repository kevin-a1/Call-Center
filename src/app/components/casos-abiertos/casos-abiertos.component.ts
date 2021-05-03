import { Component, OnInit } from '@angular/core';
import { Ticket } from 'src/app/models/ticket';
import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-casos-abiertos',
  templateUrl: './casos-abiertos.component.html',
  styleUrls: ['./casos-abiertos.component.css']
})
export class CasosAbiertosComponent implements OnInit {

  tickets: Ticket[] = [];
  usuario = 'kelly_farfan_123';

  constructor(private ticketService:TicketService) { }

  ngOnInit(): void {
    this.readAllTickets();
  }

  readAllTickets() {
    this.ticketService.getAllTickets().subscribe(data => {
      
      if(data.transaccion == true){

        this.tickets = data.data;
        
      }
    });
  }

  asignarme(id:String, ticket_id) {

    let response = confirm(`¿Está seguro qye desea asignarse al ticket: ${ticket_id}?`);

    if (response == true) {

      this.ticketService.addResponsable(id, this.usuario).subscribe(data => {

        if (data.transaccion == true) {
          this.readAllTickets();
          console.log(data);

        }

      });
    }
  }
}
