import { Component, OnInit } from '@angular/core';
import { CargarScriptsService } from '../../services/cargar-scripts.service';
import { Router } from '@angular/router';

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

  constructor(private cargarScriptsService:CargarScriptsService, private router: Router) {
    cargarScriptsService.load_js("navbar.component.js");
    this.cargarScriptsService.$emitter_reset_navbar.subscribe(data => {
      this.resetTipeUserLoggedIn();
    });
  }

  ngOnInit(): void {
  }

  resetTipeUserLoggedIn() {
    this.type_user_logged_in = localStorage.getItem('type_user_logged_in');
  }

  //Menú usuario

  goNuevoCaso_U() {
    if (this.type_user_logged_in == this.u) {
      this.router.navigate(['/crear-tickets']);
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
      this.router.navigate(['/filtro-ticket']);
    }
  }

  goAdministradores_SA() {
    if (this.type_user_logged_in == this.sa) {
      this.router.navigate(['/administradores']);
    }
  }

  goUsuarios_SA() {
    if (this.type_user_logged_in == this.sa) {
      this.router.navigate(['/usuarios']);
    }
  }

  goCatalogos_SA() {
    if (this.type_user_logged_in == this.sa) {
      this.router.navigate(['/parametros']);
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
