import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistroUsuarioComponent } from './components/registro-usuario/registro-usuario.component';
import { LoginCorreoComponent } from './components/login-correo/login-correo.component';
import { CargarScriptsService } from './services/cargar-scripts.service';
import { UsuarioService } from './services/usuario.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RevisarCasoComponent } from './components/revisar-caso/revisar-caso.component';
import { LoginPasswordComponent } from './components/login-password/login-password.component';
import { RegistroAdminComponent } from './components/registro-admin/registro-admin.component';
import { LoginAdminComponent } from './components/login-admin/login-admin.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AgregarParametrosComponent } from './components/agregar-parametros/agregar-parametros.component';
import { AdministradoresComponent } from './components/administradores/administradores.component';
import { DetalleCasoComponent } from './components/detalle-caso/detalle-caso.component';


@NgModule({
  declarations: [
    AppComponent,
    RegistroUsuarioComponent,
    LoginCorreoComponent,
    RevisarCasoComponent,
    LoginPasswordComponent,
    RegistroAdminComponent,
    LoginAdminComponent,
    NavbarComponent,
    AgregarParametrosComponent,
    AdministradoresComponent,
    DetalleCasoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [UsuarioService, CargarScriptsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
