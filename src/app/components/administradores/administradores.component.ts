import { Component, OnInit, ViewChild } from '@angular/core';
import { CargarScriptsService } from '../../services/cargar-scripts.service';
import { Administrador } from '../../models/administrador';
import { AdministradorservicesService } from '../../services/administradorservices.service';
import { RegistroAdminComponent } from '../registro-admin/registro-admin.component';

@Component({
  selector: 'app-administradores',
  templateUrl: './administradores.component.html',
  styleUrls: ['./administradores.component.css']
})
export class AdministradoresComponent implements OnInit {
  
  user_logged_in: string = "super administrador";
  list_administradores: Administrador[] = [];

  constructor(private cargarScriptsService: CargarScriptsService, private administradorService: AdministradorservicesService, private registroAdminComponent:RegistroAdminComponent) {
    cargarScriptsService.load_js("administradores.component.js");
  }

  ngOnInit(): void {
    this.readAllAdmins();
  }

  public readAllAdmins() {
    if (this.user_logged_in == "super administrador") {
      
      this.administradorService.getAllAdmins().subscribe(data => {

        if (data.transaccion == true) {
          this.list_administradores = data.data;
          console.log(this.list_administradores);
        }
        
      });
    }
  }

  deleteAdmin(administrador: Administrador) {
    let response = confirm(`¿Desea eliminar al usuario: ${administrador.usuario}?`);

    if (response == true) {
      this.administradorService.deleteAdmin(administrador).subscribe(data => {

        if (data.transaccion == true) {
          alert(`${administrador.usuario} fue eliminado`);
          this.readAllAdmins();
        }
      });
    }
  }

  updateAdmin(administrador: Administrador) {
  }

  //Public Methods


}
