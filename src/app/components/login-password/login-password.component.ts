import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-password',
  templateUrl: './login-password.component.html',
  styleUrls: ['./login-password.component.css']
})
export class LoginPasswordComponent implements OnInit {
  signupForm: FormGroup;
  usuarioLogeado = 0;
  correo= localStorage.getItem('scorreo');
  contrasena: string;

  constructor(private service: UsuarioService, private builder: FormBuilder, private router: Router) {
    this.signupForm = this.builder.group({
      password: ['', Validators.required]
    });
   }

  ngOnInit(): void {
  }

  iniciarSesion(values) {
    this.contrasena = this.signupForm.get('password').value;
      this.service.login(this.correo, this.contrasena).subscribe(
        data => {
          if(data.transacción == true){
            console.log('CORREO: '+this.correo);
            console.log('Acceso Permitido');
          }else{
            console.log('Acceso Denegado1');
            alert('La contraseña es incorrecta');
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

