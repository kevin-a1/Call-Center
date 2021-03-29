import { Component, OnInit } from '@angular/core';
import { Administrador } from '../../models/administrador';
import { AdministradorservicesService } from '../../services/administradorservices.service';

@Component({
  selector: 'app-registro-admin',
  templateUrl: './registro-admin.component.html',
  styleUrls: ['./registro-admin.component.css']
})
export class RegistroAdminComponent implements OnInit {
   administrador:Administrador = new Administrador();
  constructor(private administradorServ:AdministradorservicesService) { }

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
