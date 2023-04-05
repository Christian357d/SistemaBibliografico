import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticuloComponent } from './components/articulo/articulo.component';
import { AutorComponent } from './components/autor/autor.component';
import { CentrotrabajoComponent } from './components/centrotrabajo/centrotrabajo.component';
import { TipocongresoComponent } from './components/tipocongreso/tipocongreso.component';
import { EditorComponent } from './components/editor/editor.component';
import { ActasdecongresoComponent } from './components/actasdecongreso/actasdecongreso.component';
import { TemaComponent } from './components/tema/tema.component';
import { InformeComponent } from './components/informe/informe.component';
import { HomeadminComponent } from './components/homeadmin/homeadmin.component';
import { RevistacientificaComponent } from './components/revistacientifica/revistacientifica.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { AboutComponent } from './components/about/about.component';
import { HomeclienteComponent } from './components/homecliente/homecliente.component';
import { RolComponent } from './components/rol/rol.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { TipoinformeComponent } from './components/tipoinforme/tipoinforme.component';
import { TipoactaComponent } from './components/tipoacta/tipoacta.component';
import { TiporevistaComponent } from './components/tiporevista/tiporevista.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { GuardGuard } from './guards/guard.guard';
import { ClienteGuard } from './guards/cliente.guard';
import { AdminGuard } from './guards/admin.guard';
import { LoginGuard } from './guards/login.guard';
import { UsestudentComponent } from './components/usestudent/usestudent.component';
import { UsadminComponent } from './components/usadmin/usadmin.component';
import { ComunicadoComponent } from './components/comunicado/comunicado.component';
const routes: Routes = [
  { path: 'centrotrabajo', component: CentrotrabajoComponent,canActivate:[GuardGuard,ClienteGuard] },
  { path: 'tipocongreso', component: TipocongresoComponent,canActivate:[GuardGuard,ClienteGuard] },
  { path: 'autor', component: AutorComponent,canActivate:[GuardGuard,ClienteGuard] },
  { path: 'articulo', component: ArticuloComponent,canActivate:[GuardGuard,ClienteGuard] },
  { path: 'editor', component: EditorComponent,canActivate:[GuardGuard,ClienteGuard] },
  { path: 'tema', component: TemaComponent,canActivate:[GuardGuard,ClienteGuard] },
  { path: 'informe', component: InformeComponent,canActivate:[GuardGuard,ClienteGuard] },
  { path: 'actacongreso', component: ActasdecongresoComponent,canActivate:[GuardGuard,ClienteGuard] },
  { path: 'revistacientifica', component: RevistacientificaComponent,canActivate:[GuardGuard,ClienteGuard] },
  { path: 'comunicado', component: ComunicadoComponent,canActivate:[GuardGuard,ClienteGuard] },
  { path: 'homeadmin', component: HomeadminComponent,canActivate:[GuardGuard,ClienteGuard] },
  { path: 'about', component: AboutComponent,canActivate:[GuardGuard,AdminGuard] },
  { path: 'homecliente', component: HomeclienteComponent,canActivate:[GuardGuard,AdminGuard] },
  { path: 'rol', component: RolComponent,canActivate:[GuardGuard,ClienteGuard] },
  { path: 'usuario', component: UsuarioComponent,canActivate:[GuardGuard,ClienteGuard] },
  { path: 'usestudent', component: UsestudentComponent, canActivate:[GuardGuard,ClienteGuard]},
  { path: 'usadmin', component: UsadminComponent, canActivate:[GuardGuard,ClienteGuard]},
  { path: 'tipoinforme', component: TipoinformeComponent,canActivate:[GuardGuard,AdminGuard] },
  { path: 'tipoacta', component: TipoactaComponent,canActivate:[GuardGuard,AdminGuard] },
  { path: 'tiporevista', component: TiporevistaComponent,canActivate:[GuardGuard,AdminGuard] },
  { path: 'login', component: LoginComponent,canActivate:[LoginGuard] }, 
  { path: '**', canActivate: [GuardGuard,LoginGuard], component: GuardGuard},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
