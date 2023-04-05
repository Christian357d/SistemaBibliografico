import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutorService } from 'src/app/services/autor.service';
import { TemaService } from 'src/app/services/tema.service';
import { CentrotrabajoService } from 'src/app/services/centrotrabajo.service';
import { formatDate } from "@angular/common";
import { Mensaje } from 'src/app/validar/Mensaje';
import { ReporteService } from 'src/app/services/reporte.service';
import { NgbAlertConfig } from '@ng-bootstrap/ng-bootstrap';



declare var $: any;
@Component({
  selector: 'app-autor',
  templateUrl: './autor.component.html',
  styleUrls: ['./autor.component.css'],
})

export class AutorComponent implements OnInit {
  listaAutor:any[]=[];
  form:FormGroup;
  accion="Agregar";
  id:number|undefined;
  listaCentroTrabajo: any[] = [];
  listaTemas: any[] = [];
  idcont = 0;
  lista: Mensaje=new Mensaje();

  pageSize = 5;
  page = 1;
  pagesizee : any;

  criterio="nombreautor";
  search='';
  criterio2="autortipo";
  search2='';
  criterio3="autorcentro";
  search3='';
  alertaCentros="no";
  alertaTemas="no";
  alertaFecha="no";

   //Lista ID Temas
   public listdata:any[]=[];
   listaTemaAutor: any[] = [];
   public temas: any[]=[];
   public temasAutor: any[]=[];
   hoy = new Date();
 
  constructor(private ngbAlert:NgbAlertConfig,private reporteService:ReporteService,
    private autorservice: AutorService, private fb:FormBuilder, private temaservice: TemaService, private centrotrabajoservice: CentrotrabajoService
  ) { 
    this.form = this.fb.group({
      personaId: [''],
      nombre: ['', [Validators.required, Validators.maxLength(50), Validators.pattern('^[A-Za-zñÑáéíóúÁÉÍÓÚ ]+$')]],
      apellido: ['', [Validators.required, Validators.maxLength(50), Validators.pattern('^[A-Za-zñÑáéíóúÁÉÍÓÚ ]+$')]],
      genero: ['', [Validators.required, Validators.maxLength(50)]],
      fechanacimiento: ['', [Validators.required]],
      centroTrabajoId: ['', [Validators.required]],
      temaId: [''],
      nacionalidad: ['', [Validators.required, Validators.maxLength(50), Validators.pattern('^[A-Za-zñÑáéíóúÁÉÍÓÚ ]+$')]],
      correo: ['', [Validators.required, Validators.maxLength(50), Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      tipoautor: ['', [Validators.required, Validators.maxLength(50)]],
    });
  }
  //Restringir Fecha Nacimiento
  getFecha(event:any){  
    var fecha = new Date(); 
    var fecha2=event.value;
    event as HTMLInputElement;  
    var valor1=fecha.getUTCFullYear();
    var fecha3= new Date(fecha2);
    var valor2=fecha3.getUTCFullYear();
    var resultado=Number(valor1)-Number(valor2);
    if(resultado<15){
      this.alertaFecha="si";
      this.form.get('fechanacimiento')?.reset();
    }
      else{this.alertaFecha="no";;}  
    }
  idper = 0;
  idtemas:any[]=[]; 
  ListaAutor(){
    this.autorservice.getAutor().subscribe(resp=>{
        this.listaAutor=resp;
        this.pagesizee = this.listaAutor.length;
    })
  };

  LimpiarSearch() {
    this.search = '';
    this.search2='';
    this.search3='';
  }

  ngOnInit(): void {
    this.listadoAutor();
  }
  obtenerTemasId(){

    var options = (<HTMLSelectElement>document.getElementById('temaId')).selectedOptions;
      for (let i = 0; i < options.length; i++) {
        if(options[i].value!= undefined){
          this.listdata.push((options[i]?.value)?.split(" ")?.pop()?.replace(/[']/g, ''))
        }
      }
      this.listdata.forEach((item)=>{
        const datos:any={
          artorId:0,
          temaId:Number(item)
        }
        this.temas.push(datos);

      });
  }
  Guardar(){
    this.obtenerTemasId();
    const autor:any = {
      tipoautor: this.form.get('tipoautor')?.value,
      correo: this.form.get('correo')?.value,
      estado: 1,
      personaId: 0,
      persona:{
        nombre: this.form.get('nombre')?.value,
        apellido: this.form.get('apellido')?.value,
        genero: this.form.get('genero')?.value,
        fechaNacimiento: this.form.get('fechanacimiento')?.value,
        nacionalidad: this.form.get('nacionalidad')?.value,
      },
      centroTrabajoId: this.form.get('centroTrabajoId')?.value,
      autorTemas: this.temas
    }
    
    if(this.id == undefined){
      this.autorservice.postAutor(autor).subscribe(data => {
  
        Swal.fire({
          icon: 'success',
          title: 'Autor creado con Exito'
        });
        this.listadoAutor();
        this.form.reset();
        this.temas =[];
      },error =>{
        Swal.fire({
          icon: 'error',
          title: 'Error en el Formulario',
          html: error.error.errors[Object.keys(error.error.errors)[0]]
        })
      });
    }
    else{
      const autoredi:any = {
        tipoautor: this.form.get('tipoautor')?.value,
        correo: this.form.get('correo')?.value,
        estado: 1,
        personaId: this.idper,
        persona:{
          nombre: this.form.get('nombre')?.value,
          apellido: this.form.get('apellido')?.value,
          genero: this.form.get('genero')?.value,
          fechaNacimiento: this.form.get('fechanacimiento')?.value,
          nacionalidad: this.form.get('nacionalidad')?.value,
        },
        centroTrabajoId: this.form.get('centroTrabajoId')?.value,
      }
      autoredi.id=this.id;
      this.autorservice.putAutor(this.id,autoredi).subscribe(x=>{
        this.accion="Agregar";
        Swal.fire({
          icon: 'success',
          title: 'Autor Modificado con Exito'
        })
        this.listadoAutor();

      },error =>{
        Swal.fire({
          icon: 'error',
          title: 'Error Modificar',
          html: error.error.errors[Object.keys(error.error.errors)[0]]
                
        })
        //console.log(error);
      });
      for(let x=0; x < this.idtemas.length; x ++){      
        this.autorservice.deleteAutorTema(this.idtemas[x].id).subscribe(x=>{
        });                
      };         
     for(let x=0; x < this.temas.length; x ++){
          this.temasAutor[x] = {autorId: this.idtemas[0].autorId, temaId: this.temas[x].temaId}
          this.autorservice.postAutorTema(this.temasAutor[x]).subscribe(x=>{
          });          
        };    
      this.ngOnInit();     
    }
    document.getElementById("ModalClose")?.click();    
    this.listdata=[];
    this.temas=[];
    this.idtemas=[];
  }


  mensa: any;
  Guardarinstruct(){
    //Limpiar Form
    this.form.markAsUntouched();
    this.form.markAsPristine();
    this.lista =new Mensaje();
   
    this.mensa = "";
    this.id = undefined;
    this.form.patchValue({
      nombre:"",
      apellido:"",
      fechanacimiento:"",
      nacionalidad:"",
      genero:"",
      tipoautor:"",
      correo:"",
      centroTrabajoId:"",
      temaId: "",
    })
  }
  
  fecha= Date;
  SeleccionarAutor(autor:any){
   
    const format = 'yyyy-MM-dd';
    const locale = 'en-US';
    this.accion = "Editar";
    this.id=autor.id;
    const formattedDate = formatDate(autor.persona.fechaNacimiento, format, locale);
    this.form.patchValue({
      personaId:autor.persona.id,
      nombre:autor.persona.nombre,
      apellido:autor.persona.apellido,
      genero:autor.persona.genero,
      fechanacimiento:formattedDate,
      nacionalidad:autor.persona.nacionalidad,
      tipoautor:autor.tipoAutor,
      correo:autor.correo,
      centroTrabajoId:autor.centroTrabajo.id,
      temaId: autor.autorTemas
    })
    this.mensa= "Si desea puede cambiar de temas.."
    this.idper = this.form.value.personaId;
    this.idtemas = this.form.value.temaId;
    //Seleccionar items Select2 Temas
    var element = document.getElementById('temaId') as HTMLSelectElement;

    for (var i = 0; i < element.options.length; i++) {
      this.idtemas.forEach(obj=>
        {               
          if(element.options[i].value==i+": '"+obj.temaId+"'"){
            element.options[i].defaultSelected=true;
            element.options[i].selected=true;
          }
          
        }
        )
    }
    element.dispatchEvent(new Event("change"));
    console.log(this.idtemas);
  }

  CambiarEstado(autor: any, accion: number) {
    if(accion==0){
      Swal.fire({
        title: '¿Esta Seguro?',
        text: "Que quiere Eliminar a este Autor!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Eliminarlo!'
      }).then((result) => {
        if (result.isConfirmed) {
          //PROCESO ELIMINAR
          this.id = autor.id;           
        if (this.id != undefined) {
          const autores:any = {
            tipoautor: autor.tipoAutor,
            correo: autor.correo,
            estado: accion,
            personaId: autor.persona.id,
            persona:{
              nombre: autor.persona.nombre,
              apellido: autor.persona.apellido,
              genero: autor.persona.genero,
              fechaNacimiento: autor.persona.fechaNacimiento,
              nacionalidad: autor.persona.nacionalidad,
            },
            centroTrabajoId: autor.centroTrabajo.id,        
          }
          //console.log();
          this.autorservice.putAutor(this.id, autores)
            .subscribe((r) => {
              Swal.fire(
                'Eliminado!',
                'El registro de Autor fue Eliminado Exitosamente.',
                'success'
              )
              this.ListaAutor();
            });
              }                    
            }
          })
    }else{
      Swal.fire({
        title: '¿Esta Seguro?',
        text: "Que quiere Activar a este Autor!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Activarlo!'
      }).then((result) => {
        if (result.isConfirmed) {
          //PROCESO ACTIVAR
          this.id = autor.id;           
        if (this.id != undefined) {
          const autores:any = {
            tipoautor: autor.tipoAutor,
            correo: autor.correo,
            estado: accion,
            personaId: autor.persona.id,
            persona:{
              nombre: autor.persona.nombre,
              apellido: autor.persona.apellido,
              genero: autor.persona.genero,
              fechaNacimiento: autor.persona.fechaNacimiento,
              nacionalidad: autor.persona.nacionalidad,
            },
            centroTrabajoId: autor.centroTrabajo.id,        
          }
          //console.log();
          this.autorservice.putAutor(this.id, autores)
            .subscribe((r) => {
              Swal.fire(
                'Activado!',
                'El registro de Autor fue Activado Exitosamente.',
                'success'
              )
              this.ListaAutor();
            });
              }                    
            }
          })
    }
    

   
  }
  
  listaautorpersona: any[] = [];
  async listadoAutor() {
    await this.autorservice.getAutor().subscribe((data) => {
      this.listaAutor = data;
      this.pagesizee = this.listaAutor.length;
      
    });
    await this.centrotrabajoservice.getCentroTrabajoActivos().subscribe((data) => {
      this.listaCentroTrabajo = data;
      if(this.listaCentroTrabajo.length==0)
      {this.alertaCentros="si" }
    });
    
    await this.temaservice.getTemaActivos().subscribe((data) => {
      this.listaTemas = data;     
      if(this.listaTemas.length==0)
      {this.alertaTemas="si" }
   
    });
    await this.autorservice.getAutorTema().subscribe((data) => {
      this.listaTemaAutor = data;
   
    });
    await this.autorservice.getAutorpersona().subscribe((data) => {
      this.listaautorpersona = data;
   
    });
  }
  //REPORTE PDF
  reportePDF(){
    const format = 'dd-MM-yyyy';
    const locale = 'en-US';
    //Encabezado de Tabla
    const encabezado=['ID', 'Nombre', 'Apellido', 'Genero', 'Fecha de Nacimiento', 'Nacionalidad','Tipo','Correo', 'Centro de Trabajo','Temas', 'Estado'];
    this.autorservice.getAutor().subscribe(
      (data) => {
      const cuerpo = Object(data).map((obj:any)=>
      [
        //Datos Tabla
        obj.id,
        obj.persona.nombre,
        obj.persona.apellido,
        obj.persona.genero,
        formatDate(obj.persona.fechaNacimiento, format, locale),
        obj.persona.nacionalidad,
        obj.tipoAutor,
        obj.correo,
        obj.centroTrabajo.nombre,
        obj.autorTemas.nombre,
        (obj.estado==1)? "ACTIVO" : "INACTIVO",
      ]);
      this.reporteService.reportePDF(encabezado,cuerpo,"REPORTE AUTOR");
     
    });
    
  }
  //REPORTE EXCEL
 reporteExcel(){
  var nombreArchivo="reporteAutor.xlsx"
  var id = document.getElementById('datos');
  this.reporteService.reporteExcel(id,nombreArchivo,8);
 }

}