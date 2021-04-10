import { Component, OnInit } from '@angular/core';
import { CargarScriptsService } from '../../services/cargar-scripts.service';
import { Administrador } from '../../models/administrador';

@Component({
  selector: 'app-administradores',
  templateUrl: './administradores.component.html',
  styleUrls: ['./administradores.component.css']
})
export class AdministradoresComponent implements OnInit {

  list_administradores: Administrador[] = [];

  constructor(private cargarScriptsService: CargarScriptsService, ) {
    cargarScriptsService.load_js("administradores.component.js");
  }

  ngOnInit(): void {
  }

  readAllAdmins() {
    
  }

}
