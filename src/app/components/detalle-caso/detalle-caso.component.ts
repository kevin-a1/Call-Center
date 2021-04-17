import { Component, OnInit } from '@angular/core';
import { Ticket } from '../../models/ticket';
import { TicketService } from '../../services/ticket.service';
import { CargarScriptsService } from '../../services/cargar-scripts.service';
import { Router } from '@angular/router';
import { Mensajes } from '../../models/mensajes';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-detalle-caso',
  templateUrl: './detalle-caso.component.html',
  styleUrls: ['./detalle-caso.component.css'],
})
export class DetalleCasoComponent implements OnInit {

  mensaje: Mensajes = new Mensajes();
  today= new Date();
  jstoday = formatDate(this.today, 'dd-MM-yyyy hh:mm:ss a', 'en-ECU', '+0593');
  ticket: Ticket[] = [];
  mensajes: Mensajes[] = [];
  id = localStorage.getItem('IDTicket');
  response_condicion: boolean = true;
  response_msg: string = 'Exito';
  listaImgs: Array<Ticket> = new Array<Ticket>();
  emisor = localStorage.getItem('scorreo');

  constructor(
    private ticketService: TicketService,
    private cargarScriptsService: CargarScriptsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.ticketService.detalleticket(this.id).subscribe(
      (data) => {
        this.ticket = data.data;
        this.listaImgs = data.respuesta;
        if (this.ticket.length == 0) {
          this.response_condicion = false;
          this.response_msg = 'Usted no tiene ingresado ningun caso';
        }
      },
      (err) => {
        console.log(err);
      }
    );

    this.cargarchat();
  }

  url = "";
  onselectFile(e){
    if(e.target.files){
      
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload=(event:any)=>{
        this.url=event.target.result;
      }
    }
  }

  back() {
    this.router.navigate(['/casos']);
  }

  subirBucket(){
    
  }
  
  guardar(){
    this.mensaje.fecha = this.jstoday;
    this.mensaje.emisor = this.emisor;
    this.mensaje.ticket_id=this.id;
    this.ticketService.addmensaje(this.mensaje).subscribe(
      (data) => {
          this.cargarchat();
      }
    )
  }

  cargarchat(){
    this.ticketService.mensajesticket(this.id).subscribe(
      (data) => {
        this.mensajes = data.data;
        if (this.mensajes.length == 0) {
          this.response_condicion = false;
          this.response_msg = 'No hay mensaje en el chat';
          console.log(this.mensajes)
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
