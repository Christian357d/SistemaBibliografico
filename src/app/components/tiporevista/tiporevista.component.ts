import { Component, OnInit } from '@angular/core';
import { ArticuloService } from 'src/app/services/articulo.service';
import { AutorService } from 'src/app/services/autor.service';
import { EditorService } from 'src/app/services/editor.service';
import { RevistacientificaService } from 'src/app/services/revistacientifica.service';

@Component({
  selector: 'app-tiporevista',
  templateUrl: './tiporevista.component.html',
  styleUrls: ['./tiporevista.component.css']
})
export class TiporevistaComponent implements OnInit {

  listadorevista: any[] = [];
  listadoeditor: any[] = [];
  listaArticulo:any[]=[];
  listaAutor: any[] = [];
  listaArticuloAutor: any[] = [];

  constructor(private revistaservice: RevistacientificaService, 
    private articuloservice: ArticuloService, private autorservice: AutorService, private editorservice: EditorService) { }

  ngOnInit(): void {
    this.listadoPublicados();
  }

  async listadoPublicados() {
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
    await this.editorservice.getEditor().subscribe((data) => {
      this.listadoeditor = data;
     
    });
  }

}
