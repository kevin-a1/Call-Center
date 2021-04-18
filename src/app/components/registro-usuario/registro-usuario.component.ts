import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { CargarScriptsService } from '../../services/cargar-scripts.service';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';


@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css'],
})

export class RegistroUsuarioComponent implements OnInit {

  usuario: Usuario = new Usuario();
  confirmar_pass: String;
  response_condicion: boolean = false;
  response_msg: String;

  constructor(private usuarioService: UsuarioService, private cargarScriptsService: CargarScriptsService, private router: Router, private app:AppComponent) {
    cargarScriptsService.load_js("registro-usuario.component.js");
  }

  ngOnInit(): void {
    this.usuario.correo = localStorage.getItem('correo')
  }

  registrar() {

    if (this.validarUsuario(this.usuario) == true) {

      console.log("pruebas")
      
      this.usuarioService.createUser(this.usuario).subscribe(data => {

        if (data.transaccion == true) {
          console.log('Usuario registrado')
          console.log(data.data)

          localStorage.setItem('logged_in', 'true')
          localStorage.setItem('type_user_logged_in', 'Usuario')
          localStorage.setItem('correo', null)
          this.app.showNavbar();

        } else {
          this.response_condicion = true
          this.response_msg = data.message
        }

      });
    } else {

    }
  }

  back() {
    this.router.navigate(['/login'])
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
      if (Boolean(n) && n.length == 0) {
        return true;
      } else {
        this.show_response('Campo nombre o apellido vacío');
        return false;
      }
    }
  }

  validar_correo(correo: String) {
    if (Boolean(correo) && correo.length == 0) {

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
