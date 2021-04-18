import { Component, OnInit } from '@angular/core';
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

  constructor(private administradorServ:AdministradorservicesService, private cargarScriptsService: CargarScriptsService, private administradoresComponent: AdministradoresComponent) {

    cargarScriptsService.load_js("registro-usuario.component.js");
  }

  ngOnInit(): void {
  }

  addAdmin(){
    if (this.validar_datos(this.administrador) == true) {

      this.administradorServ.crearAdmin(this.administrador).subscribe(data => {
        
        if(data.transaccion == true){
          alert("Administrador creado");
          this.administradoresComponent.readAllAdmins();
        }else{
          this.show_response(data.mensaje);
        }
        
      });
    }
  }

  validar_datos(admin: Administrador):boolean {

    if (Boolean(admin.password) && Boolean(this.confirmar_pass)) {
      if (admin.password == this.confirmar_pass) {
        return true;
      } else {
        this.show_response('Campo contraseña y confirmar contraseña son distintas');
      }
    } else {
      this.show_response('Contraseña vacía');
    }
    
    if (this.validar_rol(admin.rol) == true) {
      return true;
    }

    if (this.validar_estado(admin.estado) == true) {
      return true;
    }

    if (this.validar_correo(admin.correo) == true) {
      return true;
    }

    if (this.validar_nombres([admin.apellido, admin.nombre]) == true) {
      return true;
    }
    
    if (this.validar_usuario(admin.usuario) == true) {
      return true;
    }

     
    return false;
  }

  validar_usuario(user: String): boolean {
    if (Boolean(user)) {
      return true;
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

  public setAdministrador(admin: Administrador) {
    this.administrador = this.administrador;
  }

  public getMsg(msg: String) {
    console.log(msg);
  }
}
