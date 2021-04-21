import { Component, OnInit } from '@angular/core';
import { Catalogos } from '../../models/catalogos';
import { CatalogosservicesService} from '../../services/catalogosservices.service'
import { Router } from "@angular/router";


@Component({
  selector: 'app-agregar-parametros',
  templateUrl: './agregar-parametros.component.html',
  styleUrls: ['./agregar-parametros.component.css']
})
export class AgregarParametrosComponent implements OnInit {

  constructor(private servicio: CatalogosservicesService, private router: Router, ) { }
  datos: Catalogos[]=[];
  catalogos: Catalogos = new Catalogos();
  response_condicion = false;
  response_condicion1 = false;
  response_condicion2 = false;
  response_condicion3 = false;
  response_condicion4 = false;
  est_admin = [];
  ead="";
  est_tick =[];
  etk="";
  pr_tick =[];
  ptk="";
  rol_admin =[];
  rad="";
  tip_caso =[];
  tc="";
  data_eliminar =[];


  ngOnInit(): void {
  this.actualizar();
  }
  actualizar(){
    this.servicio.listar().subscribe(
      data => {
        this.datos = data.data;
        this.ead="";
        this.etk="";
        this.ptk="";
        this.rad="";
        this.tc="";
      },err =>{console.log(err);
      }
    );
  }
  elim(num, dato){
    switch (num) {
      case 1:
        this.servicio.eliminar("prioridad_ticket",dato).subscribe(
          data =>{
            this.actualizar();
          },err=>{console.log(err);
          }
        );
        break;
      case 2:
       this.servicio.eliminar("tipo_caso",dato).subscribe(
         data =>{
           this.actualizar();
         },err=>{console.log(err);
         }
       );
        break;
      case 3:
        this.servicio.eliminar("estado_ticket",dato).subscribe(
          data =>{
            this.actualizar();
          },err=>{console.log(err);
          }
        );
        break;
      case 4:
        this.servicio.eliminar("estado_administrador",dato).subscribe(
          data =>{
            this.actualizar();
          },err=>{console.log(err);
          }
        );
        break;
      case 5:
        this.servicio.eliminar("rol_administrador",dato).subscribe(
          data =>{
            this.actualizar();
          },err=>{console.log(err);
          }
        );
        break;
      default:
        break;
    }
  }
  agregar(){
      this.tip_caso.push(this.tc.toUpperCase());
      this.catalogos.tipo_caso = this.tip_caso;
      this.rol_admin.push(this.rad.toUpperCase());
      this.catalogos.rol_administrador = this.rol_admin;
      this.pr_tick.push(this.ptk.toUpperCase());
      this.catalogos.prioridad_ticket = this.pr_tick;
      this.est_tick.push(this.etk.toUpperCase());
      this.catalogos.estado_ticket = this.est_tick;
      this.est_admin.push(this.ead.toUpperCase());
      this.catalogos.estado_administrador = this.est_admin;
      this.servicio.Nuevo(this.catalogos).subscribe(
        data =>{
          console.log(data.message);
          this.est_admin=[];
          this.tip_caso=[];
          this.rol_admin=[];
          this.pr_tick=[];
          this.est_tick=[];
          this.actualizar();
        },err => {console.log(err);
        }
      );
  }
  nuev(num){
    switch (num) {
      case 1:
        this.response_condicion = true;
        break;
      case 2:
        this.response_condicion1 = true;
        break;
      case 3:
        this.response_condicion2 = true;
        break;
      case 4:
        this.response_condicion3 = true;
        break;
      case 5:
        this.response_condicion4 = true;
        break;
      default:
        break;
    }
  }
  fals(num){
    switch (num) {
      case 1:
        this.response_condicion = false;
        break;
      case 2:
        this.response_condicion1 = false;
        break;
      case 3:
        this.response_condicion2 = false;
        break;
      case 4:
        this.response_condicion3 = false;
        break;
      case 5:
        this.response_condicion4 = false;
        break;
      case 6:
      this.response_condicion = false;
      this.response_condicion1 = false;
      this.response_condicion2 = false;
      this.response_condicion3 = false;
      this.response_condicion4 = false;
      break;
      default:
        break;
    }
  }
}
