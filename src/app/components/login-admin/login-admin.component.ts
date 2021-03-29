import { Component, OnInit } from '@angular/core';
import { Administrador } from '../../models/administrador';
import { AdministradorservicesService } from '../../services/administradorservices.service';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {
  administrador:Administrador = new Administrador();
  constructor(private administradorservice:AdministradorservicesService) { }

  ngOnInit(): void {
  }

  validarcorreo(correo){
    this.administradorservice.getValidarCorreo(correo).subscribe(data=>{
      if(data.transaccion == true){
        console.log("Administrador ya existe")
        console.log(data.dat)
      }else{
        console.log("El administrador no existe")
      }
    });
  }

}
