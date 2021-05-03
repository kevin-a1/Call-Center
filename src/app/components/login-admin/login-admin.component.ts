import { Component, OnInit } from '@angular/core';
import { Administrador } from '../../models/administrador';
import { AdministradorservicesService } from '../../services/administradorservices.service';
import { FormGroup, FormControl} from '@angular/forms';
import { CargarScriptsService } from '../../services/cargar-scripts.service';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';

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
  constructor(private administradorservice:AdministradorservicesService, private cargarScriptsService: CargarScriptsService, private router: Router, private app:AppComponent) {
    cargarScriptsService.load_js("registro-usuario.component.js");
  }
    
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

        let admin = data.data
        localStorage.setItem('type_user_logged_in', admin.rol);
        localStorage.setItem('logged_in', 'true')
        this.app.showNavbar();
        this.router.navigate(['/']);
      }else{
        console.log("El administrador no existe")
      }
    });
  }

}
