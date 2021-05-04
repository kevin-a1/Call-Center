import { Component, OnInit } from '@angular/core';
import { Ticket } from '../../models/ticket';
import { TicketService } from '../../services/ticket.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl} from '@angular/forms';

@Component({
  selector: 'app-filtro-ticket',
  templateUrl: './filtro-ticket.component.html',
  styleUrls: ['./filtro-ticket.component.css']
})
export class FiltroTicketComponent implements OnInit {
  ticket: Ticket = new Ticket();
  tiketarray: Ticket[]=[]
  usercorreo:string;
  tipo:string
  estado:string

  constructor(private ticketservice: TicketService, private router: Router) { }

  ngOnInit(): void {
    this.ticketservice.getcontotal()
    .subscribe(data=>{
      this.tiketarray = data.data;
    },
    error=>console.log(error));
    }
    buquedacorreo(){
      console.log(this.usercorreo)
      this.ticketservice.getconcorreo(this.usercorreo)
      .subscribe(data=>{
        this.tiketarray = data.data;
        console.log(data)
      },
      error=>console.log(error));
    }
    busquedaportipo(){
      this.ticketservice.getcontipo(this.tipo)
      .subscribe(data=>{
        this.tiketarray = data.data;
      },
      error=>console.log(error));
    }
  
    busquedaporestado(){
      console.log(this.estado)
      this.ticketservice.getconestado(this.estado)
      .subscribe(data=>{
        this.tiketarray = data.data;
      },
      error=>console.log(error));
    }
  
  }
  