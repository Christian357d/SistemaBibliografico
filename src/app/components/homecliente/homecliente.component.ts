import { Component, OnInit } from '@angular/core';
import { ActasdecongresoService } from 'src/app/services/actasdecongreso.service';
import { ArticuloService } from 'src/app/services/articulo.service';
import { AutorService } from 'src/app/services/autor.service';
import { InformeService } from 'src/app/services/informe.service';
import { RevistacientificaService } from 'src/app/services/revistacientifica.service';

@Component({
  selector: 'app-homecliente',
  templateUrl: './homecliente.component.html',
  styleUrls: ['./homecliente.component.css']
})
export class HomeclienteComponent implements OnInit {

  listadoinformes: any[] = [];
  listadoactas: any[] = [];
  listadorevista: any[] = [];
  listaArticulo:any[]=[];
  listaAutor: any[] = [];
  listaArticuloAutor: any[] = [];

  constructor(private informeservice: InformeService, private actaservice: ActasdecongresoService, private revistaservice: RevistacientificaService, 
    private articuloservice: ArticuloService, private autorservice: AutorService) { }

  ngOnInit(): void {
    this.listadoPublicados();
  }

  async listadoPublicados() {
    await this.informeservice.getInformeActivos().subscribe((data) => {
      this.listadoinformes = data;
      //console.log(data);
    });
    await this.actaservice.getActaCongresoActivo().subscribe((data) => {
      this.listadoactas = data;
      //console.log(data);
    });
    
    await this.revistaservice.getRevistaCientificaActivo().subscribe((data) => {
      this.listadorevista = data;
      //console.log(data);
    });
    await this.articuloservice.getArticulo().subscribe((data) => {
      this.listaArticulo = data;
     
    });
    await this.autorservice.getAutorActivo().subscribe((data) => {
      this.listaAutor = data;
     
    });
    await this.articuloservice.getArticuloAutor().subscribe((data) => {
      this.listaArticuloAutor = data;
     
    });
  }

}
