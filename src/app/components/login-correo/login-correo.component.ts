import { Component, OnInit, Input } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { CargarScriptsService } from '../../services/cargar-scripts.service';
import { CorreoService } from '../../services/correo.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login-correo',
  templateUrl: './login-correo.component.html',
  styleUrls: ['./login-correo.component.css']
})
export class LoginCorreoComponent implements OnInit {

  usuario:Usuario[] = [];
  usuarios:Usuario = new Usuario();
  correo = "";

  response_condicion: boolean = false
  response_msg: string = "Todo bien"

  constructor(private usuarioService: UsuarioService, private cargarScriptsService: CargarScriptsService,  private router: Router, private correoService:CorreoService) {
    cargarScriptsService.load_js("registro-usuario.component.js");
  }

  ngOnInit(): void {
  }

  verycorreo(co:string){

    if (co.length <= 0) {
      this.response_condicion = true;
      this.response_msg = 'Correo vacío';

    } else if (!this.correoService.esEmailValido(co)) {

      this.response_condicion = true;
      this.response_msg = 'Formato del correo incorrecto';

      return null;

    }else{

      let dominio = "tecazuay.edu.ec";
      let corr = co.split('@');

      if (dominio == corr[1]) {
        return true;
      }else{
        return false;
      }
    }
  }

  redir(){

  }

  ingresar(){
    let v = this.verycorreo(this.correo)
   if (v) {
     this.usuarioService.listUser(this.correo).subscribe(
       data =>{
         if (data.data.length == 0) {

           localStorage.setItem('correo',this.correo)
           this.router.navigate(['/registro-usuario'])

         }else{

           localStorage.setItem('correo',JSON.stringify(data.data))
           localStorage.setItem('scorreo', this.correo)
           this.router.navigate(['/login-password'])
           
         }
       },err =>{console.log(err);
       }
     )
   }else if(v == false){
    this.response_condicion = true;
    this.response_msg = 'El correo ingresado no pertenece al Instituto Superior Tecnologico del Azuay';
   }
 }
}
