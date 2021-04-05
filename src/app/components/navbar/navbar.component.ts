import { Component, OnInit } from '@angular/core';
import { CargarScriptsService } from '../../services/cargar-scripts.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  type_user_logged_in: String = localStorage.getItem('type_user_logged_in');

  u: string = 'Usuario';
  a: string = 'Administrador';
  sa: string = 'Super Administrador';

  constructor(private cargarScriptsService:CargarScriptsService) {
    cargarScriptsService.load_js("navbar.component.js");
  }

  ngOnInit(): void {
  }

}
