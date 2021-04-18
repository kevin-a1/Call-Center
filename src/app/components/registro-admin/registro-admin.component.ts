import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Administrador } from '../../models/administrador';
import { AdministradorservicesService } from '../../services/administradorservices.service';
import { CargarScriptsService } from '../../services/cargar-scripts.service';
import { AdministradoresComponent } from '../administradores/administradores.component';

@Component({
  selector: 'app-registro-admin',
  templateUrl: './registro-admin.component.html',
  styleUrls: ['./registro-admin.component.css']
})
export class RegistroAdminComponent implements OnInit {

  administrador:Administrador = new Administrador();
  estados: String[]  = ["Disponible", "Ocupado", "Eliminado"];
  roles: String[] = ["Administrador", "Super Administrador"];
  confirmar_pass: String;
  response_condicion: boolean = false;
  response_msg: String;
  action: string = 'insert';

  constructor(private administradorServ:AdministradorservicesService, private cargarScriptsService: CargarScriptsService, private administradoresComponent: AdministradoresComponent) {

    cargarScriptsService.load_js("registro-usuario.component.js");
    cargarScriptsService.$emitter_update_admin.subscribe(admin => {
      this.update_admin(admin);
      cargarScriptsService.load_js("registro-usuario.component.js");
    });
  }

  ngOnInit(): void {
  }

  addAdmin(){

    console.log(this.action);

    if (this.validar_datos(this.administrador) == true) {

      this.administradorServ.crearAdmin(this.administrador, this.action).subscribe(data => {
        
        if(data.transaccion == true){

          this.administradoresComponent.readAllAdmins();
          this.administrador = new Administrador();
          this.confirmar_pass = "";
          this.action = 'insert';
          this.response_msg = "";
          this.response_condicion = false;
          alert("Administrador guardado");
          
        }else{
          this.show_response(data.mensaje);
        }
        
      });
    }
  }

  validar_datos(admin: Administrador):boolean {

    if (Boolean(admin.password) && Boolean(this.confirmar_pass) && admin.password.length > 0 && this.confirmar_pass.length > 0) {
      if (admin.password != this.confirmar_pass) {
        this.show_response('Campo contraseña y confirmar contraseña son distintas');
        return false;
      }
    } else {
      this.show_response('Contraseña vacía');
      return false;
    }
    
    if (this.validar_rol(admin.rol) == false) {
      return false;
    }

    if (this.validar_estado(admin.estado) == false) {
      return false;
    }

    if (this.validar_correo(admin.correo) == false) {
      return false;
    }

    if (this.validar_nombres([admin.apellido, admin.nombre]) == false) {
      return false;
    }
    
    if (this.validar_usuario(admin.usuario) == false) {
      return false;
    }

     
    return true;
  }

  validar_usuario(user: String): boolean {
    if (Boolean(user)) {
      
      if (user.length >= 5 || user.length <= 30) {

        var user_replaced = user.replace('_', 'a').replace('.', 'a').replace('-', 'a');

        if (/[A-Za-z0-9_]/.test(user_replaced)) {
          return true;
        } else {
          this.show_response('Usuario incorrecto, solo puede contener números, letras, guión(-), guión bajo, (_) y punto (.)');
          return false;
        }

      } else {
        this.show_response('La longitud del usuario debe ser mayor a 5 y menor a 30');
        return false;
      }

    } else {
      this.show_response('Campo usuario vacío');
      return false;
    }
  }

  validar_nombres(nombres: String[]): boolean {

    for (let n of nombres) {
      if (Boolean(n) && n.length > 0) {
        return true;
      } else {
        this.show_response('Campo nombre o apellido vacío');
        return false;
      }
    }
  }

  validar_correo(correo: String) {
    if (Boolean(correo)) {

      var EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

      if (correo.match(EMAIL_REGEX)) {
        return true;
      } else {
        this.show_response('Formato de la contraseña incorrecta');
      }
    } else {
      this.show_response('Campo correo vacío');
      return false;
    }
  }

  validar_rol(rol: String): boolean {
    
    if (Boolean(rol)) {
      
      if (this.roles.includes(rol)) {
        return true;
      } else {
        this.show_response('Campo rol incorrecto');
        return false;
      }

    } else {
      this.show_response('Campo rol vacío');
      return false;
    }
  }

  validar_estado(estado: String): boolean {
    if (Boolean(estado)) {
      
      if (this.estados.includes(estado)) {
        return true;
      } else {
        this.show_response('Campo estado incorrecto');
      }

    } else {
      this.show_response('Campo estado vacío');
      return false;
    }
  }

  show_response(msg: String) {
    this.response_condicion = true;
    this.response_msg = msg;
  }

  update_admin(admin: Administrador) {
    this.administrador = admin;
    this.action = 'update';
  }
}
