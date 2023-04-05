import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArticuloService } from 'src/app/services/articulo.service';
import { InformeService } from 'src/app/services/informe.service';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Mensaje } from 'src/app/validar/Mensaje';
import { ReporteService } from 'src/app/services/reporte.service';


@Component({
  selector: 'app-informe',
  templateUrl: './informe.component.html',
  styleUrls: ['./informe.component.css']
})
export class InformeComponent implements OnInit {
  listaInforme:any[]=[];
  form:FormGroup;
  accion="Agregar";
  id:number|undefined;
  listaArticulo: any[] = [];
  idcont=0;
  pageSize = 5;
  page = 1;
  pagesizee : any;
  today = new Date();

  criterio='numero';
  search='';
  criterio2='infarticulo';
  search2='';
  //Mensajes Error
  lista: Mensaje=new Mensaje();
  constructor(private reporteService:ReporteService,
    public modalService:NgbModal,private informeservice: InformeService, 
    private fb:FormBuilder, private articuloservice: ArticuloService
  ) { 
    this.form = this.fb.group({
      numero: ['', [Validators.required]],
      articuloId: ['', [Validators.required]],
      centrodepublicacion: ['', [Validators.required, Validators.maxLength(50)]],
      fechaPublicacion: ['', [Validators.required]],
    });
  }

  ListaInforme(){
    this.informeservice.getInforme().subscribe(resp=>{
      this.listaInforme=resp;
      this.pagesizee = this.listaInforme.length;
  })
  }

  ngOnInit(): void {
    this.listadoInforme();
  }
  LimpiarSearch() {
    this.search = ''; 
    this.search2 = '';  
    var element = document.getElementById("opInforme") as HTMLSelectElement;
    element.selectedIndex = 0;
  }
  Guardar(){
    const informe:any = {
      Numero: this.form.get('numero')?.value,
      ArticuloId: this.form.get('articuloId')?.value,
      Centrodepublicacion: this.form.get('centrodepublicacion')?.value,
      FechaPublicacion: this.form.get('fechaPublicacion')?.value,
      estado: 1,
    }
    if(this.id == undefined){
      this.informeservice.postInforme(informe).subscribe(data => {
        //console.log(informe);
        Swal.fire({
          icon: 'success',
          title: 'Informe Registrado!'
        });
        this.ListaInforme();
        this.form.reset();
      },error =>{
        //console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Error en el Formulario',
          html: error.error.errors[Object.keys(error.error.errors)[0]]
        })
      });
    }
    else{
      informe.id=this.id;
      //EDITAR
      this.informeservice.putInforme(this.id,informe).subscribe(x=>{
        this.accion="Agregar";
        Swal.fire({
          icon: 'success',
          title: 'Informe Modificado!'
        })
        this.ListaInforme();

      },error =>{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: '<a href="">Why do I have this issue?</a>'
        })
        //console.log(error);
      });
    }
  }

  Guardarinstruct(content:any){ 
    //Abrir Modal
    this.modalService.open(content);
    //Limpiar Form
    this.form.markAsUntouched();
    this.form.markAsPristine();
    this.id = undefined;
    this.form.patchValue({
      numero: "",
      centrodepublicacion: "",
      fechaPublicacion: "",
      articuloId: "",
    })
  }
  fecha=Date;
  SeleccionarInforme(content:any,informe:any){
    this.modalService.open(content);
    const format = 'yyyy-MM-dd';
    const locale = 'en-US';
    this.accion = "Editar";
    this.id=informe.id;
    const formattedDate = formatDate(informe.fechaPublicacion, format, locale);
    this.form.patchValue({
      numero:informe.numero,
      centrodepublicacion:informe.centrodepublicacion,
      fechaPublicacion:formattedDate,
      articuloId:informe.articulo.id,
    })
  }

  CambiarEstado(informe: any, accion: number) {
    this.id = informe.id;
    if (this.id != undefined) {
      const format = 'yyyy-MM-dd';
      const locale = 'en-US';
      const formattedDate = formatDate(informe.fechaPublicacion, format, locale);
      const informes:any = {
        numero:informe.numero,
        centrodepublicacion:informe.centrodepublicacion,
        fechaPublicacion:formattedDate,
        articuloId:informe.articulo.id,
        estado:accion
      }
      let valorestado = "";
      if(accion == 0){valorestado = "Desactivar"}else{valorestado ="Activar"}
      let valorestado2 = "";
      if(accion == 0){valorestado2 = "Desactivado"}else{valorestado2 ="Activado"}
      Swal.fire({  
        title: 'Estas seguro de '+ valorestado +' el Informe Tecnico?',
        icon: 'warning',  
        showCancelButton: true,  
        confirmButtonText: 'Si',  
        cancelButtonText: 'No'  
      }).then((result) => {  
        if (result.value) {
          let value = this.id;
          this.informeservice.putInforme(value!, informes).subscribe((r) => {
            if (informes.estado == 0) {
              Swal.fire({
                icon: 'error',
                title: 'El informe ha sido '+valorestado2+'!',
              });
              
            } else {
              Swal.fire({
                icon: 'success',
                title: 'El informe ha sido '+valorestado2+'!',
              });
            }  
          this.ListaInforme();
        });  
        } else if (result.dismiss === Swal.DismissReason.cancel) {  
          Swal.fire(  
            'Cancelado',  
            'El Informe Tecnico no fue '+valorestado2+'.',  
            'error'  
          )  
        }  
      })  
    }
  }

  async listadoInforme() {
    await this.informeservice.getInforme().subscribe((data) => {
      this.listaInforme = data;
      // console.log(data);
      this.pagesizee = this.listaInforme.length;
     
    });
    await this.articuloservice.getArticuloActivo().subscribe((data) => {
      this.listaArticulo = data;
      // console.log("Los articulos activos son"+data);
     
    });
  }

   //REPORTE PDF
   reportePDF(){
    //Encabezado de Tabla
    const encabezado=['ID', 'Numero', 'Centro de Publicacion','Fecha Publicacion', 'Articulo', 'Estado'];
    this.informeservice.getInforme().subscribe(
      (data) => {
      const cuerpo = Object(data).map((obj:any)=>
      [
        //Datos Tabla
        obj.id,
        obj.numero,
        obj.centrodepublicacion,
        obj.fechaPublicacion,
        obj.articulo.titulo,
        (obj.estado==1)? "ACTIVO" : "INACTIVO"
      ]);
      this.reporteService.reportePDF(encabezado,cuerpo,"REPORTE INFORME TECNICO");
     
    });
    
  }
  //REPORTE EXCEL
 reporteExcel(){
  var nombreArchivo="reporteInforme.xlsx"
  var id = document.getElementById('datos');
  this.reporteService.reporteExcel(id,nombreArchivo,6);
 }
  
}
