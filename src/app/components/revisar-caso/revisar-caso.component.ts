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
 correo =  localStorage.getItem('scorreo');
  ngOnInit(): void {
    this.ticketService.data(this.correo).subscribe(
      data =>{
        console.log(data.data);
        this.ticket = data.data;
      },err =>{console.log(err);
      }
    )
  }
  back() {
    this.router.navigate(['/login'])
  }
}
