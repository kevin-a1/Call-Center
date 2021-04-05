import { Component, OnInit } from '@angular/core';
import { Administrador } from '../../models/administrador';
import { AdministradorservicesService } from '../../services/administradorservices.service';
import { FormGroup, FormControl} from '@angular/forms';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {
  adminsingGroup = new  FormGroup({
    correoadmin : new FormControl(''),
    passwordadmin : new FormControl('')
  });
  correoverificar : string;
  administrador:Administrador = new Administrador();
  constructor(private administradorservice:AdministradorservicesService) { }
    
  ngOnInit(): void {
  }

  mostrardatos(value){
    console.log(this.adminsingGroup.value)
    console.log(this.adminsingGroup.controls['passwordadmin'].value)
  }
  
  validarcorreo(value){
    this.correoverificar = this.adminsingGroup.controls['correoadmin'].value
    console.log(this.correoverificar)
    this.administradorservice.getValidarCorreo(this.correoverificar+"").subscribe(data=>{
      if(data.transaccion == true){
        console.log("Administrador ya existe")
        console.log(data)
        console.log(data.dat)
      }else{
        console.log("El administrador no existe")
      }
    });
  }

}
