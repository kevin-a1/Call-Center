import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistroUsuarioComponent } from './components/registro-usuario/registro-usuario.component';
import { LoginCorreoComponent } from './components/login-correo/login-correo.component';
import { LoginPasswordComponent } from './components/login-password/login-password.component';
import { LoginAdminComponent } from './components/login-admin/login-admin.component';
import { RevisarCasoComponent } from "./components/revisar-caso/revisar-caso.component";
import { DetalleCasoComponent } from './components/detalle-caso/detalle-caso.component';
import { CrearTicketsComponent } from './components/crear-tickets/crear-tickets.component';
import { AgregarParametrosComponent } from './components/agregar-parametros/agregar-parametros.component';

const routes: Routes = [
  { path: 'registro-usuario', component:  RegistroUsuarioComponent },
  { path: 'login', component: LoginCorreoComponent},
  { path: 'login-password', component: LoginPasswordComponent },
  { path: 'login-admin', component: LoginAdminComponent},
  {path: 'casos', component: RevisarCasoComponent},
  { path: 'detalle', component: DetalleCasoComponent},
  { path: 'casos', component: RevisarCasoComponent},
  { path: 'crear-tickets', component: CrearTicketsComponent},
  { path: 'añadir dato', component: AgregarParametrosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
