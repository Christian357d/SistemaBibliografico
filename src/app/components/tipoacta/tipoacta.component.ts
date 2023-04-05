import { Component, OnInit } from '@angular/core';
import { ActasdecongresoService } from 'src/app/services/actasdecongreso.service';
import { ArticuloService } from 'src/app/services/articulo.service';
import { AutorService } from 'src/app/services/autor.service';

@Component({
  selector: 'app-tipoacta',
  templateUrl: './tipoacta.component.html',
  styleUrls: ['./tipoacta.component.css']
})
export class TipoactaComponent implements OnInit {

  listadoactas: any[] = [];
  listaArticulo:any[]=[];
  listaAutor: any[] = [];
  listaArticuloAutor: any[] = [];

  constructor(private actaservice: ActasdecongresoService, 
    private articuloservice: ArticuloService, private autorservice: AutorService) { }

  ngOnInit(): void {
    this.listadoPublicados();
  }

  async listadoPublicados() {
    await this.actaservice.getActaCongresoActivo().subscribe((data) => {
      this.listadoactas = data;
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
