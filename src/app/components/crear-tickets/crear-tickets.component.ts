import { Component, OnInit } from '@angular/core';
import { Ticket } from '../../models/ticket';
import { TicketService } from '../../services/ticket.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CatalogosservicesService } from '../../services/catalogosservices.service';
import { Catalogos } from '../../models/catalogos';


@Component({
  selector: 'app-crear-tickets',
  templateUrl: './crear-tickets.component.html',
  styleUrls: ['./crear-tickets.component.css']
})
export class CrearTicketsComponent implements OnInit {
  ticketsumbitGroup = new FormGroup({
    ticket_id : new FormControl(''),
    asunto : new FormControl(''),
    descripcion : new FormControl(''),
    imagenes : new FormControl([]),
    fecha : new FormControl(''),
    tipo_caso : new FormControl(''),
    prioridad : new FormControl(''),
    estado : new FormControl('Abierto'),
    usuario_email : new FormControl(''),
    resposable : new FormControl([])
  });
  tickets:Ticket= new Ticket();
  response: boolean = false;
  catalogoArray:Catalogos[] = [];
  constructor(private ticketService:TicketService, private router:Router, private catalogoservice:CatalogosservicesService) { }

  ngOnInit(): void {
    this.catalogoservice.getCatalogos()
    .subscribe(data =>{
      console.log(data)
      this.catalogoArray= data.data
    },
    error=>console.log("error fatal")
    );
  }

  mostrar_fecha(){
    var fecha = new Date();
    var años = fecha.getFullYear();
    var mes = fecha.getMonth()+1; 
    var dia = fecha.getDay();
    var hora = fecha.getHours();
    var minutos = fecha.getMinutes();
    var segundo = fecha.getSeconds();
    var milisegu = fecha.getUTCMilliseconds();
    var formato_fecha = años+"-"+mes+"-"+dia+"T05:"+hora+":"+minutos;
    this.tickets.fecha=formato_fecha
    return formato_fecha;
  }

  verificar(): boolean{  
    var next:boolean;
    if(this.tickets.asunto == null){
      next = false;  
    }else if(this.tickets.descripcion == null){
      next = false;
    }else if(this.tickets.imagenes == null){
      next = false;
    }else if(this.tickets.tipo_caso == null){ 
      next = false;
    }else if(this.tickets.prioridad == null){
      next = false;
    }else if(this.tickets.usuario_email == null){
      next = false;
    }else{
      next = true;
    }  
    return next;
  }


  crearTiktes(value){
    if(this.verificar){
       this.ticketService.crearTicket(value).subscribe(data => {
        if(data.transaccion = true){
          console.log("ticket creado");
          console.log(data.data);
          this.router.navigate(['/login-admin'])
        }          
     });
    }else{
      alert("Complete los campos vacios")
      console.log("salio mal ")
    }
  }

}
