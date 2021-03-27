import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistroUsuarioComponent } from './components/registro-usuario/registro-usuario.component';
import { LoginCorreoComponent } from './components/login-correo/login-correo.component'
import { LoginPasswordComponent } from './components/login-password/login-password.component';

const routes: Routes = [
  { path: 'registro-usuario', component:  RegistroUsuarioComponent },
  { path: 'login', component: LoginCorreoComponent},
  { path: 'login-password', component: LoginPasswordComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
