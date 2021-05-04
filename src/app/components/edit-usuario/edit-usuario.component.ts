import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { CargarScriptsService } from '../../services/cargar-scripts.service';
import { UsuariosComponent } from '../usuarios/usuarios.component';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-edit-usuario',
  templateUrl: './edit-usuario.component.html',
  styleUrls: ['./edit-usuario.component.css']
})
export class EditUsuarioComponent implements OnInit {

  usuario: Usuario = new Usuario();
  confirmar_pass: String;
  response_condicion: boolean = false;
  response_msg: String;

  constructor(private usuarioService: UsuarioService, private cargarScriptsService: CargarScriptsService, 
    private router: Router, private app:AppComponent, usersComponent: UsuariosComponent) {
    cargarScriptsService.load_js("registro-usuario.component.js");
    cargarScriptsService.$emitter_update_user.subscribe(user => {
      this.usuario = user;
      this.confirmar_pass = user.password;
      cargarScriptsService.load_js("registro-usuario.component.js");
    });

  }

  ngOnInit(): void {
  }

  update() {

    if (this.validarUsuario(this.usuario) == true) {
      console.log(this.usuario.correo)

      this.usuarioService.modificarUser(this.usuario.correo, this.usuario).subscribe(data => {

        console.log(this.usuario.correo)

        if (data.transaccion == true) {
          console.log('Usuario modificado')
          console.log(data.data)
          this.usuario = new Usuario();
          this.confirmar_pass = "";

        } else {
          this.response_condicion = true
          this.response_msg = data.message
        }

      });
    } else {

    }
  }


  validarUsuario(user: Usuario):boolean {

    if (Boolean(user.password) && user.password.length > 0 && Boolean(this.confirmar_pass) && this.confirmar_pass.length > 0) {
      if (user.password != this.confirmar_pass) {
        this.show_response('Campo contraseña y confirmar contraseña son distintas');
        return false;
      }
    } else {
      this.show_response('Contraseña vacía');
      return false;
    }

    if (this.validar_correo(user.correo) == false) {
      return false;
    }

    if (this.validar_nombres([user.apellido, user.nombre]) == false) {
      return false;
    }
     
    return true;
  }

  validar_nombres(nombres: String[]): boolean {

    for (let n of nombres) {
      console.log("aquiii")
      if (Boolean(n) && n.length > 0) {
        return true;
      } else {
        this.show_response('Campo nombre o apellido vacío');
        return false;
      }
    }
  }

  validar_correo(correo: String) {
    if (Boolean(correo) && correo.length > 0) {

      var EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      var DOMINIO_CORREO_ISTA = '@tecazuay.edu.ec'
      if (correo.match(EMAIL_REGEX) && correo.length > 17) {
        
        if (correo.endsWith(DOMINIO_CORREO_ISTA)) {
          return true;
        } else {
          this.show_response('La contraseña no pertenece al dominio del ISTA');
        }

      } else {
        this.show_response('Formato de la contraseña incorrecta');
      }
    } else {
      this.show_response('Campo correo vacío');
      return false;
    }
  }

  show_response(msg: String) {
    this.response_condicion = true;
    this.response_msg = msg;
  }
}
