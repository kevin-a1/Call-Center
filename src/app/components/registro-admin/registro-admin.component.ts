import { Component, OnInit } from '@angular/core';
import { Administrador } from '../../models/administrador';
import { AdministradorservicesService } from '../../services/administradorservices.service';
import { CargarScriptsService } from '../../services/cargar-scripts.service';

@Component({
  selector: 'app-registro-admin',
  templateUrl: './registro-admin.component.html',
  styleUrls: ['./registro-admin.component.css']
})
export class RegistroAdminComponent implements OnInit {
   administrador:Administrador = new Administrador();
  constructor(private administradorServ:AdministradorservicesService, private cargarScriptsService: CargarScriptsService) {
    cargarScriptsService.load_js("registro-usuario.component.js");
  }

  ngOnInit(): void {
  }

addAdmin(){
  this.administradorServ.crearAdmin(this.administrador).subscribe(data=>{
    if(data.transaccion == true){
      console.log('administrador creado')
      console.log(data.data)
    }else{
      console.log('Administrador no creado')
    }
  });
}
}
