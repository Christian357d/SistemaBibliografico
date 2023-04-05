import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
import { ComunicadoService } from 'src/app/services/comunicado.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Mensaje } from 'src/app/validar/Mensaje';
import { ReporteService } from 'src/app/services/reporte.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-comunicado',
  templateUrl: './comunicado.component.html',
  styleUrls: ['./comunicado.component.css']

})
export class ComunicadoComponent implements OnInit {

  listaComunicado:any[]=[];
  form:FormGroup;
  accion="Agregar";
  id:number|undefined;
    //Mensajes Error
  lista: Mensaje=new Mensaje();
  tiempo=new Date().toLocaleDateString();
  listcom:any=[];
  listaUsuario:any[]=[];
  listacomuniacti:any[]=[];
  comuedi = "";
  pageSize = 5;
  page = 1;
  pagesizee : any;
  search='';
  search2='';
  criterio='titulocomuni';
  criterio2='areacomuni';


  constructor(
    private reporteService:ReporteService, private usuarioservice: UsuarioService, public modalService:NgbModal,private comunicadoservice: ComunicadoService, private fb:FormBuilder
  ) { 
    this.form = this.fb.group({
      titulo: ['', [Validators.required, Validators.maxLength(50)]],
      descripcion: ['', [Validators.required, Validators.maxLength(1000)]],
      remitente: ['', [Validators.required, Validators.maxLength(100)]],
      fechapublicacion: ['',[Validators.required]],
    });
  }
  async listadoUsuario() {
    await this.usuarioservice.getUsuarioadmin().subscribe((data) => {
      this.listaUsuario = data;
      // console.log(this.listaUsuario);
    });
  }
  ListaComunicado(){
    this.comunicadoservice.getComunicado().subscribe(resp=>{
        this.listaComunicado=resp;
        // console.log(this.listaComunicado);
        this.pagesizee = this.listaComunicado.length;
    })
  };
  LimpiarSearch() {
    this.search = '';
    this.search2 = '';
  }
  ngOnInit(): void {
    this.ListaComunicado();
    this.listadoUsuario();
  }

  comi ="'";
  mensa: any;
  Guardar(){
    const time=Date.now();
    const format = 'yyyy-MM-dd';
    const locale = 'en-US';
    const formattedDate = formatDate(time, format, locale);
    if (this.form.get('fechapublicacion')?.value<=formattedDate) {
      const comunicado:any = {
        titulo: this.form.get('titulo')?.value,
        descripcion: this.form.get('descripcion')?.value,
        fechapublicacion: this.form.get('fechapublicacion')?.value,
        remitente: this.form.get('remitente')?.value,
        usuarioid: window.localStorage.getItem('id'),
        estado: 1
      }
      
    
      if(this.id == undefined){
        this.comunicadoservice.postComunicado(comunicado).subscribe(data => {
        
          Swal.fire({
            icon: 'success',
            title: 'comunicado creado con Exito'
          });
          this.listadoComunicado();
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
        const comunicadoedi:any = {
          
          titulo: this.form.get('titulo')?.value,
          descripcion: this.form.get('descripcion')?.value,
          fechapublicacion: this.form.get('fechapublicacion')?.value,
          remitente: this.form.get('remitente')?.value,
          usuarioid: window.localStorage.getItem('id'),
          estado: 1,
        }
        comunicadoedi.id=this.id;
        this.comunicadoservice.putComunicado(this.id,comunicadoedi).subscribe(x=>{
          this.accion="Agregar";
          Swal.fire({
            icon: 'success',
            title: 'comunicado Modificado con Exito'
          })
          this.listadoComunicado();
  
        },error =>{
          Swal.fire({
            icon: 'error',
            title: 'Error Modificar',
            html: error.error.errors[Object.keys(error.error.errors)[0]]
          })
          //console.log(error);
        });
        
        this.listadoComunicado();
      }
    }else{
      Swal.fire({
        icon: 'error',
        title: 'No Registrado La Fecha de publicacion no debe sobrepasar a la fecha actual',
              
      })
    }
   
  }
 
  Guardarinstruct(content:any){
    this.modalService.open(content);
    this.form.markAsUntouched();
    this.form.markAsPristine();
    this.mensa = "";
    this.id = undefined;
    this.form.patchValue({
      titulo:"",
      descripcion:"",
      fechapublicacion:"",
      remitente:""
    })
  }
  fecha=Date;
  SeleccionarComunicado(content:any,comunicado:any){
    this.modalService.open(content);
    const format = 'yyyy-MM-dd';
    const locale = 'en-US';
    this.accion = "Editar";
    this.id=comunicado.id;
    const formattedDate = formatDate(comunicado.fechaPublicacion, format, locale);
    this.form.patchValue({
      titulo:comunicado.titulo,
      descripcion: comunicado.descripcion,
      remitente:comunicado.remitente,
      fechapublicacion:formattedDate,
    })
  }

  CambiarEstado(comunicado: any, accion: number) {
    this.id = comunicado.id;
    const tiempo=new Date();
    if (this.id != undefined) {
      const format = 'yyyy-MM-dd';
      const locale = 'en-US';
      const formattedDate = formatDate(comunicado.fechaPublicacion, format, locale);
      const comunicados:any = {
        titulo:comunicado.titulo,
        descripcion:comunicado.descripcion,
        remitente:comunicado.remitente,
        fechapublicacion:formattedDate,
        usuarioid: window.localStorage.getItem('id'),
        estado: accion,
      }
      this.comunicadoservice
        .putComunicado(this.id, comunicados)
        .subscribe((r) => {
          if (comunicados.estado == 0) {
            Swal.fire({
              icon: 'error',
              title: 'El comunicado ha sido dado de baja con Exito',
            });
          } else {
            Swal.fire({
              icon: 'success',
              title: 'El comunicado ha sido activado con Exito',
            });
          }
          this.listadoComunicado();
        });
    }

     
  }
  

  async listadoComunicado() {
    await this.comunicadoservice.getComunicado().subscribe((data) => {
      this.listaComunicado = data;
      this.pagesizee = this.listaComunicado.length;
    });
    await this.comunicadoservice.getComunicadoActivo().subscribe((data) => {
      this.listacomuniacti = data;
      window.localStorage.setItem('datoscomunicado', JSON.stringify(this.listacomuniacti));
    });
  }


  //REPORTE PDF
  reportePDF(){
    //Encabezado de Tabla
    const encabezado=['ID', 'Titulo', 'Descripción','Remitente','Fecha de Publicación','Estado'];
    this.comunicadoservice.getComunicado().subscribe(
      (data) => {
      const cuerpo = Object(data).map((obj:any)=>
      [
        
        //Datos Tabla
        obj.id,
        obj.titulo,
        obj.descripcion,
        obj.remitente,
        obj.fechaPublicacion,
        (obj.estado==1)? "ACTIVO" : "INACTIVO"
        
      ]);
      this.reporteService.reportePDF(encabezado,cuerpo,"REPORTE DE COMUNICADO");
     
    });
    
  }
  //REPORTE EXCEL
 reporteExcel(){
  var nombreArchivo="reporteComunicado.xlsx"
  var id = document.getElementById('datos');
  this.reporteService.reporteExcel(id,nombreArchivo,12);
 }



 
 
}