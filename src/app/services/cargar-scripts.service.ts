import { EventEmitter, Injectable } from '@angular/core';
import { Administrador } from '../models/administrador';

@Injectable({
  providedIn: 'root'
})
export class CargarScriptsService {

  constructor() { }

  $emitter_update_admin = new EventEmitter();

  load_js(file: string) {
    let script = document.createElement('script')
    script.src = `./assets/js/${file}`;
    let body = document.getElementsByTagName('body')[0];
    body.appendChild(script);
  }

  emmiter_update_Admin(admin: Administrador) {
    this.$emitter_update_admin.emit(admin);
  }
}
