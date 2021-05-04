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
 id: string;
 response_condicion: boolean = true
 response_msg: string = "Exito"

  constructor(private ticketService: TicketService, private cargarScriptsService: CargarScriptsService,  private router: Router) { }
 correo =  localStorage.getItem('scorreo');
  ngOnInit(): void {
    this.ticketService.data(this.correo).subscribe(
      data =>{
        this.ticket = data.data;
        if(this.ticket.length == 0){
          this.response_condicion = false;
          this.response_msg = "Usted no tiene ingresado ningun caso";
        }
      },err =>{console.log(err);
      }
    )
  }
  back() {
    this.router.navigate(['/login'])
  }
  ver( dat: string){
    this.id = dat;
    localStorage.setItem('IDTicket',this.id);
    this.router.navigate(['/detalle'])
  }
}
