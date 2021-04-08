import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CargarScriptsService } from '../../services/cargar-scripts.service';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-login-password',
  templateUrl: './login-password.component.html',
  styleUrls: ['./login-password.component.css']
})
export class LoginPasswordComponent implements OnInit {
  
  signupForm: FormGroup;
  usuarioLogeado = 0;
  correo: string;
  contrasena: string;

  response_condicion: boolean = false
  response_msg: string = "Todo bien"

  constructor(private service: UsuarioService, private builder: FormBuilder, private router: Router, private cargarScriptsService: CargarScriptsService, private app: AppComponent) {

    cargarScriptsService.load_js("registro-usuario.component.js");

    this.signupForm = this.builder.group({
      password: ['', Validators.required],
    });
   }

  ngOnInit(): void {
    this.correo = localStorage.getItem('scorreo');
  }

  iniciarSesion(values) {

    this.contrasena = this.signupForm.get('password').value;
    this.service.login(this.correo, this.contrasena).subscribe( data => {

        if(data.transacción == true){

          localStorage.setItem('logged_in', 'true')
          localStorage.setItem('type_user_logged_in', 'Usuario')
          this.app.showNavbar();
          console.log('CORREO: '+this.correo);
          console.log('Acceso Permitido');

        }else{
          this.response_condicion = true;
          this.response_msg = 'Credenciales Incorrectas';
        }
      }, error => {
          console.log('Acceso Denegado');
      }
    );
  }

  back() {
    this.router.navigate(['/login'])
  }
}

