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
  nuev(){
    this.response_condicion = true;
  }
  ngOnInit(): void {
  this.actualizar();
  }

  agregar(){
      this.tip_caso.push(this.tc);
      this.catalogos.tipo_caso = this.tip_caso;
      this.rol_admin.push(this.rad);
      this.catalogos.rol_administrador = this.rol_admin;
      this.pr_tick.push(this.ptk);
      this.catalogos.prioridad_ticket = this.pr_tick;
      this.est_tick.push(this.etk);
      this.catalogos.estado_ticket = this.est_tick;
      this.est_admin.push(this.ead);
      this.catalogos.estado_administrador = this.est_admin;
      this.servicio.Nuevo(this.catalogos).subscribe(
        data =>{
          console.log(data.message);
          this.est_admin=[];
          this.tip_caso=[];
          this.rol_admin=[];
          this.pr_tick=[];
          this.est_tick=[];
        },err => {console.log(err);
        }
      );

    this.actualizar();
  }
  fals(){
    this.response_condicion = false;
  }
actualizar(){
  this.servicio.listar().subscribe(
    data => {
      this.datos = data.data;
    },err =>{console.log(err);
    }
  );
}
}
