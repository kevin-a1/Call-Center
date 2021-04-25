import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { CargarScriptsService } from '../../services/cargar-scripts.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  users: Usuario[] = [];
  
  constructor(private route: ActivatedRoute, private cargarScriptsService: CargarScriptsService, private userService: UsuarioService) {
    cargarScriptsService.load_js("registro-usuario.component.js");
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.listUser2().subscribe(data => {
      if (data.transaccion == true) {
        this.users = data.data;
        console.log(this.users);
      }
    });
  }
  

  deleteUser(user: Usuario) {
    let response = confirm(`¿Desea eliminar al usuario: ${user.correo}?`);
    if (response == true) {
      this.userService.deleteUser(user).subscribe(data => {

        if (data.transaccion == true) {
          alert(`${user.correo} fue eliminado`);
          this.getUsers(); 
        }
      });
    }
  }

  updateUser(user: Usuario) {
    this.cargarScriptsService.emmiter_update_User(user);
  }
}
