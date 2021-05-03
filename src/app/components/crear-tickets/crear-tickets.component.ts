import { Component, OnInit } from '@angular/core';
import { Ticket } from '../../models/ticket';
import { TicketService } from '../../services/ticket.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CatalogosservicesService } from '../../services/catalogosservices.service';
import { Catalogos } from '../../models/catalogos';
import { DomSanitizer } from "@angular/platform-browser";
import { CargarScriptsService } from '../../services/cargar-scripts.service';

@Component({
  selector: 'app-crear-tickets',
  templateUrl: './crear-tickets.component.html',
  styleUrls: ['./crear-tickets.component.css']
})
export class CrearTicketsComponent implements OnInit {
  public archivos:any = [];
  public previsualizar:string;
  public listaIMAGENES:any=[];
  tickets:Ticket= new Ticket();
  response: boolean = false;
  catalogoArray:Catalogos[] = [];
  constructor(private sant:DomSanitizer,private ticketService:TicketService, private router:Router, private catalogoservice:CatalogosservicesService, private cargarScriptsService: CargarScriptsService) {
    cargarScriptsService.load_js("registro-usuario.component.js");
  }

  ngOnInit(): void {
    this.catalogoservice.getCatalogos()
    .subscribe(data =>{
      console.log(data)
      this.catalogoArray= data.data
    },
    error=>console.log("error fatal")
    );
  }

  onSelectNewFile(event):any{
    this.archivos=[]
    this.listaIMAGENES=[]
    for(var i=0;i<=File.length;i++){
      var read = new FileReader();
      console.log(read)
      read.readAsDataURL(event.target.files[i])
      read.onload = (event:any)=>{
        this.archivos.push(event.target.result)
      }
    }
    this.archivos.forEach(archis =>{
      this.extraerBASE64(archis).then((imagen:any)=>{
      this.previsualizar = imagen.base;
      });
    });  
    this.listaIMAGENES.push(this.archivos)
    console.log(this.listaIMAGENES)
    return this.archivos;  
  }

  extraerBASE64=async($event:any) => new Promise((resolve,reject)=>{
    try {
      const unsafeimg = window.URL.createObjectURL($event);
      const image = this.sant.bypassSecurityTrustUrl(unsafeimg);
      let reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          blob:$event,
          image,
          base:reader.result as string
        });
      };
    } catch (error) {
      return null+"error carga de imagenes";
    }
  });

  imagen1(){
    var imagen1 = this.archivos[0]
    return imagen1
  }
  imagen2(){
    var imagen2 = this.archivos[1]
    return imagen2
  }
  imagen3(){
    var imagen3 = this.archivos[2]
    return imagen3
  }

  imagenesfin(){
    var imagen1 = this.archivos[0]
    var imagen2 = this.archivos[1]
    var imagen3 = this.archivos[2]
    var finimagen = [[imagen1],[imagen2],[imagen3]]
    this.tickets.imagenes=finimagen;
    return finimagen
  }


  ticketsumbitGroup = new FormGroup({
    ticket_id : new FormControl(''),
    asunto : new FormControl(''),
    descripcion : new FormControl(''),
    imagenes : new FormControl(this.imagenesfin()),
    fecha : new FormControl(''),
    tipo_caso : new FormControl(''),
    prioridad : new FormControl(''),
    estado : new FormControl('Abierto'),
    usuario_email : new FormControl(''),
    responsable : new FormControl([])
  });
  
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
