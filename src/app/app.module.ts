import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './components/admin/admin.component';
import { CentrotrabajoComponent } from './components/centrotrabajo/centrotrabajo.component';
import { AutorComponent } from './components/autor/autor.component';
import { ArticuloComponent } from './components/articulo/articulo.component';
import { TipocongresoComponent } from './components/tipocongreso/tipocongreso.component';
import { ActasdecongresoComponent } from './components/actasdecongreso/actasdecongreso.component';
import { EditorComponent } from './components/editor/editor.component';
import { TemaComponent } from './components/tema/tema.component';
import { InformeComponent } from './components/informe/informe.component';
import { HomeadminComponent } from './components/homeadmin/homeadmin.component';
import { RevistacientificaComponent } from './components/revistacientifica/revistacientifica.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClienteComponent } from './components/cliente/cliente.component';
import { HomeclienteComponent } from './components/homecliente/homecliente.component';
import { AboutComponent } from './components/about/about.component';
import { TipoactaComponent } from './components/tipoacta/tipoacta.component';
import { TipoinformeComponent } from './components/tipoinforme/tipoinforme.component';
import { TiporevistaComponent } from './components/tiporevista/tiporevista.component';
import { DetalleComponent } from './components/detalle/detalle.component';
import { RolComponent } from './components/rol/rol.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { LoginComponent } from './components/login/login.component';
import { GuardGuard } from './guards/guard.guard';
import { UsestudentComponent } from './components/usestudent/usestudent.component';
import { UsadminComponent } from './components/usadmin/usadmin.component';
import { ComunicadoComponent } from './components/comunicado/comunicado.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatDatepickerModule  } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgChartsModule } from 'ng2-charts';
import { FilteronePipe } from './pipes/filterone.pipe';
import { FiltertwoPipe } from './pipes/filtertwo.pipe';
import { FilterthreePipe } from './pipes/filterthree.pipe';



@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    CentrotrabajoComponent,
    AutorComponent,
    ArticuloComponent,
    TipocongresoComponent,
    ActasdecongresoComponent,
    EditorComponent,
    TemaComponent,
    InformeComponent,
    HomeadminComponent,
    RevistacientificaComponent,
    ClienteComponent,
    HomeclienteComponent,
    AboutComponent,
    TipoactaComponent,
    TipoinformeComponent,
    TiporevistaComponent,
    DetalleComponent,
    RolComponent,
    UsuarioComponent,
    LoginComponent,
    UsestudentComponent,
    UsadminComponent,
    ComunicadoComponent,
    FilteronePipe,
    FiltertwoPipe,
    FilterthreePipe,

  ],
  imports: [
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    NgChartsModule,
   
    
  ],
  providers: [GuardGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
