import { Component, OnInit } from '@angular/core';
import { CargarScriptsService } from '../../services/cargar-scripts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  //type_user_logged_in: String = localStorage.getItem('type_user_logged_in');
  
  u: string = 'Usuario';
  a: string = 'Administrador';
  sa: string = 'Super Administrador';
  type_user_logged_in: String = this.a;

  constructor(private cargarScriptsService:CargarScriptsService, private router: Router) {
    cargarScriptsService.load_js("navbar.component.js");
  }

  ngOnInit(): void {
  }

  //Menú usuario

  goNuevoCaso_U() {
    if (this.type_user_logged_in == this.u) {
      this.router.navigate([]);
    }
  }

  goMisCasos_U() {
    if (this.type_user_logged_in == this.u) {
      this.router.navigate(['/casos']);
    }
  }

  //Menú administrador

  goCasosAbietos_A() {
    if (this.type_user_logged_in == this.a) {
      this.router.navigate(['/casos-abiertos']);
    }
  }

  goMisCasos_A() {
    if (this.type_user_logged_in == this.a) {
      this.router.navigate([]);
    }
  }

  //Menú Super Administrador

  goCasos_SA() {
    if (this.type_user_logged_in == this.sa) {
      this.router.navigate([]);
    }
  }

  goAdministradores_SA() {
    if (this.type_user_logged_in == this.sa) {
      this.router.navigate([]);
    }
  }

  goUsuarios_SA() {
    if (this.type_user_logged_in == this.sa) {
      this.router.navigate([]);
    }
  }

  goCatalogos_SA() {
    if (this.type_user_logged_in == this.sa) {
      this.router.navigate([]);
    }  
  }

  //Menú Todos

  goNosotros() {
    this.router.navigate([]);
  }

  goContactos() {
    this.router.navigate([]);
  }
}
