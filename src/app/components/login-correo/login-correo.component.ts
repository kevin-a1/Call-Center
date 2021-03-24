import { Component, OnInit } from '@angular/core';
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

  constructor(private usuarioService: UsuarioService, private cargarScriptsService: CargarScriptsService,  private router: Router, private correoService:CorreoService) {
    cargarScriptsService.load_js("registro-usuario.component.js");
  }

  ngOnInit(): void {
    this.usuarioService.listUser().subscribe(
      data =>{
        console.log(data);
        this.usuario = data.data;
      },err =>{console.log(err);
      }
    )
  }

  verycorreo(co:string){
    if (!this.correoService.esEmailValido(co)) {
      alert('El formato del correo ingresado es incorrecto');
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


  ingresar(){
    let v = this.verycorreo(this.correo)
   if (v) {
     let dato;
     let very = false;
     for (const i in this.usuario) {
       dato = this.usuario[i]
       if (dato.correo == this.correo) {
         this.router.navigate(['/'])//Kelly aqui debes colocar la direccion de tu pestaña
         very = true;
       }
     }
     if (!very) {
       alert('Este usuario no se encuentra registrado')
       this.router.navigate(['/registro-usuario'])
     }
   }else if(v == false){
     alert('El correo ingresado no pertenece al Instituto Superior Tecnologico del Azuay')
   }
 }
}
