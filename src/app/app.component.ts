import { Component } from '@angular/core';
import { LoginService } from './services/login.service';
import { HostListener } from '@angular/core';
import { ActasdecongresoService } from 'src/app/services/actasdecongreso.service';
import { ArticuloService } from 'src/app/services/articulo.service';
import { AutorService } from 'src/app/services/autor.service';
import { InformeService } from 'src/app/services/informe.service';
import { RevistacientificaService } from 'src/app/services/revistacientifica.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ClienteBibliografia';
  rol:any;

  listadoinformes: any[] = [];
  listadoactas: any[] = [];
  listadorevista: any[] = [];
  listaArticulo:any[]=[];
  listaAutor: any[] = [];
  listaArticuloAutor: any[] = [];
  constructor(public loginservice: LoginService, private informeservice: InformeService, private actaservice: ActasdecongresoService, private revistaservice: RevistacientificaService, 
    private articuloservice: ArticuloService, private autorservice: AutorService) {
    this.rol= loginservice.leerUsuario();
  }
  ngOnInit(): void {
    this.rol= this.loginservice.leerUsuario();
  }
  
}
