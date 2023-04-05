import { Component, OnInit } from '@angular/core';
import { ArticuloService } from 'src/app/services/articulo.service';
import { AutorService } from 'src/app/services/autor.service';
import { InformeService } from 'src/app/services/informe.service';

@Component({
  selector: 'app-tipoinforme',
  templateUrl: './tipoinforme.component.html',
  styleUrls: ['./tipoinforme.component.css']
})
export class TipoinformeComponent implements OnInit {

  listadoinformes: any[] = [];
  listaArticulo:any[]=[];
  listaAutor: any[] = [];
  listaArticuloAutor: any[] = [];

  constructor(private informeservice: InformeService, private articuloservice: ArticuloService, private autorservice: AutorService) { }

  ngOnInit(): void {
    this.listadoPTipoInforme();
  }

  async listadoPTipoInforme() {
    await this.informeservice.getInformeActivos().subscribe((data) => {
      this.listadoinformes = data;
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
