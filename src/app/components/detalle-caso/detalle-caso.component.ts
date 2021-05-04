import { Component, OnInit } from '@angular/core';
import { Ticket } from '../../models/ticket';
import { TicketService } from '../../services/ticket.service';
import { CargarScriptsService } from '../../services/cargar-scripts.service';
import { Router } from '@angular/router';
import { Mensajes } from '../../models/mensajes';
import { formatDate } from '@angular/common';
import * as AWS from 'aws-sdk';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-detalle-caso',
  templateUrl: './detalle-caso.component.html',
  styleUrls: ['./detalle-caso.component.css'],
})
export class DetalleCasoComponent implements OnInit {

  file: File;
  showImagen = false;
  error = false;
  subiendo = false;
  archivo = null;
  urlImagen = null;
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
  submitted = false;
  url = null;

  // propiedades del bucket
  // sube los archivos de imagenes al bucket
  albumBucketName = 'istacallcenter';
  s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    params: { Bucket: 'istacallcenter' },
  });
  photoSelected : string | ArrayBuffer;
  uploadPercent: Observable<number>;

  constructor(
    private ticketService: TicketService,
    private cargarScriptsService: CargarScriptsService,
    private router: Router
  ) {
    // Inicializar el proveedor de credenciales de Amazon Cognito
      AWS.config.region = 'us-east-1'; // Región
      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: 'us-east-1:7415687d-d6f6-4cee-9124-88724db10be1',
    });
  }

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

  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.url = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  onClickSubir = async (event:any) => {
    event.preventDefault();
    if (this.archivo) {
      try {
        this.subiendo = true;
        const data = await new AWS.S3.ManagedUpload({
          params: {
            Bucket: this.albumBucketName,
            Key: this.archivo.name,
            Body: this.archivo,
            ACL: 'public-read',
          },
        }).promise();
        this.urlImagen = data.Location;
        this.subiendo = false;
        this.showImagen = true;
      } catch (error) {
        this.error = true;
        const bucle = setInterval(() => {
          this.error = false;
          clearInterval(bucle);
        }, 2000);
      }
    } else {
      alert('Seleccione una evidencia!!!');
    }
  };

  onChange = (event:any) => {
    if (event.target.files.length > 0) {
      this.archivo = event.target.files[0];
      const reader = new FileReader();
        reader.onload = e => this.photoSelected =reader.result;
        reader.readAsDataURL(this.archivo);
    }
  }

  back() {
    this.router.navigate(['/casos']);
  }

  guardar(){
    this.mensaje.fecha = this.jstoday;
    this.mensaje.emisor = this.emisor;
    this.mensaje.ticket_id=this.id;
    this.mensaje.imagen = this.urlImagen;
    this.ticketService.addmensaje(this.mensaje).subscribe(
      (data) => {
          this.cargarchat();
          this.mensaje = new Mensajes();
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
