import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { CargarScriptsService } from '../../services/cargar-scripts.service';


@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css'],
})

export class RegistroUsuarioComponent implements OnInit {

  usuario: Usuario = new Usuario();

  constructor(private usuarioService: UsuarioService, cargarScriptsService: CargarScriptsService) {
    cargarScriptsService.load_js("registro-usuario.component.js");
  }

  ngOnInit(): void {
  }

  registrar() {
    if (this.validarUsuario) {
      this.usuarioService.createUser(this.usuario).subscribe(data => {
        if (data.transaccion == true) {
          console.log('Usuario registrado')
        } else {
          console.log('Usuario no registrado')
        }
      });
    } else {

    }
  }

  back() {

  }

  validarUsuario(): boolean {
    return true;
  }

}
