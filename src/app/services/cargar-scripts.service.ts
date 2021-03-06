import { EventEmitter, Injectable } from '@angular/core';
import { Administrador } from '../models/administrador';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class CargarScriptsService {

  constructor() { }

  $emitter_update_admin = new EventEmitter();
  $emitter_update_user = new EventEmitter();
  $emitter_reset_navbar = new EventEmitter();

  load_js(file: string) {
    let script = document.createElement('script')
    script.src = `./assets/js/${file}`;
    let body = document.getElementsByTagName('body')[0];
    body.appendChild(script);
  }

  emmiter_update_Admin(admin: Administrador) {
    this.$emitter_update_admin.emit(admin);
  }

  emmiter_update_User(user: Usuario) {
    this.$emitter_update_user.emit(user);
  }

  emmiter_reset_Navbar(any: string) {
    this.$emitter_update_user.emit(any);
  }
}
