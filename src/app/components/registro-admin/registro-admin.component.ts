import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Administrador } from '../../models/administrador';
import { AdministradorservicesService } from '../../services/administradorservices.service';
import { CargarScriptsService } from '../../services/cargar-scripts.service';
import { AdministradoresComponent } from '../administradores/administradores.component';
import { CatalogosservicesService } from '../../services/catalogosservices.service';
import { Catalogos } from '../../models/catalogos';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-registro-admin',
  templateUrl: './registro-admin.component.html',
  styleUrls: ['./registro-admin.component.css']
})
export class RegistroAdminComponent implements OnInit {

  administrador:Administrador = new Administrador();
  estados: String[]  = [];
  roles: String[] = []
  confirmar_pass: String;
  response_condicion: boolean = false;
  response_msg: String;
  action: string = 'insert';

  constructor(private administradorServ:AdministradorservicesService, private cargarScriptsService: CargarScriptsService, private administradoresComponent: AdministradoresComponent, private catalogosservicesService:CatalogosservicesService) {

    cargarScriptsService.load_js("registro-usuario.component.js");
    
    cargarScriptsService.$emitter_update_admin.subscribe(admin => {
      this.update_admin(admin);
      this.confirmar_pass = admin.password
      cargarScriptsService.load_js("registro-usuario.component.js");
    });
  }

  ngOnInit(): void {
    this.readCatalogos();
  }

  readCatalogos() {
    this.catalogosservicesService.listar().subscribe(data => {
      if (data.data != null) {

        let catalogos: Catalogos[]=[];
        catalogos = data.data;

        for (let c of catalogos) {
          this.estados = c.estado_administrador;
          this.roles = c.rol_administrador;
        }
      }
    });
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
        this.show_response('Campo contrase??a y confirmar contrase??a son distintas');
        return false;
      }
    } else {
      this.show_response('Contrase??a vac??a');
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
          this.show_response('Usuario incorrecto, solo puede contener n??meros, letras, gui??n(-), gui??n bajo, (_) y punto (.)');
          return false;
        }

      } else {
        this.show_response('La longitud del usuario debe ser mayor a 5 y menor a 30');
        return false;
      }

    } else {
      this.show_response('Campo usuario vac??o');
      return false;
    }
  }

  validar_nombres(nombres: String[]): boolean {

    for (let n of nombres) {
      if (Boolean(n) && n.length > 0) {
        return true;
      } else {
        this.show_response('Campo nombre o apellido vac??o');
        return false;
      }
    }
  }

  validar_correo(correo: String) {
    if (Boolean(correo) && correo.length > 0) {

      var EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&???*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

      if (correo.match(EMAIL_REGEX)) {
        return true;
      } else {
        this.show_response('Formato de la contrase??a incorrecta');
      }
    } else {
      this.show_response('Campo correo vac??o');
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
      this.show_response('Campo rol vac??o');
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
      this.show_response('Campo estado vac??o');
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
