import { Component, OnInit, Input } from '@angular/core';
import { Ticket } from '../../models/ticket';
import { TicketService } from '../../services/ticket.service';
import { CargarScriptsService } from '../../services/cargar-scripts.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-revisar-caso',
  templateUrl: './revisar-caso.component.html',
  styleUrls: ['./revisar-caso.component.css']
})
export class RevisarCasoComponent implements OnInit {

 ticket:Ticket[]=[];

  constructor(private ticketService: TicketService, private cargarScriptsService: CargarScriptsService,  private router: Router) { }

  ngOnInit(): void {
    this.ticketService.data().subscribe(
      data =>{
        console.log(data.data);
      },err =>{console.log(err);
      }
    )
  }

}
