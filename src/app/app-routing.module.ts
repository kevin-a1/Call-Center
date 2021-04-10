import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistroUsuarioComponent } from './components/registro-usuario/registro-usuario.component';
import { LoginCorreoComponent } from './components/login-correo/login-correo.component'
import { LoginPasswordComponent } from './components/login-password/login-password.component';
import { LoginAdminComponent } from './components/login-admin/login-admin.component';
import { RevisarCasoComponent } from "./components/revisar-caso/revisar-caso.component";
import { AdministradoresComponent } from './components/administradores/administradores.component';
const routes: Routes = [
  { path: 'registro-usuario', component:  RegistroUsuarioComponent },
  { path: 'login', component: LoginCorreoComponent},
  { path: 'login-password', component: LoginPasswordComponent },
  { path: 'login-admin', component: LoginAdminComponent},
  { path: 'administradores', component: AdministradoresComponent},
  {path: 'casos', component: RevisarCasoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
