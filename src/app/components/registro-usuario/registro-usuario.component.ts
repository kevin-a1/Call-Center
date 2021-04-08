import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { CargarScriptsService } from '../../services/cargar-scripts.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css'],
})

export class RegistroUsuarioComponent implements OnInit {

  usuario: Usuario = new Usuario();
  response_condicion: boolean = false
  response_msg: string = "Todo bien"

  constructor(private usuarioService: UsuarioService, private cargarScriptsService: CargarScriptsService, private router: Router) {
    cargarScriptsService.load_js("registro-usuario.component.js");
  }

  ngOnInit(): void {
    this.usuario.correo = localStorage.getItem('correo')
  }

  registrar() {
    if (this.validarUsuario) {
      this.usuarioService.createUser(this.usuario).subscribe(data => {

        if (data.transaccion == true) {
          
          console.log('Usuario registrado')
          console.log(data.data)
          localStorage.setItem('logged_in', 'true')
          localStorage.setItem('type_user_logged_in', 'Usuario')

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

  validarUsuario(): boolean {
    return true;
  }

}
