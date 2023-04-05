import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArticuloService } from 'src/app/services/articulo.service';
import { AutorService } from 'src/app/services/autor.service';
import { formatDate } from "@angular/common";
import { Mensaje } from 'src/app/validar/Mensaje';
import { ReporteService } from 'src/app/services/reporte.service';


@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.component.html',
  styleUrls: ['./articulo.component.css']
})
export class ArticuloComponent implements OnInit {
  listaArticulo:any[]=[];
  form:FormGroup;
  accion="Agregar";
  id:number|undefined;
  listaAutor: any[] = [];
  //Mensajes Error
  lista: Mensaje=new Mensaje();
  pageSize = 5;
  page = 1;
  pagesizee : any;
  copias = 'no';
  criterio='copia';
  search='';
  criterio2='ubicacionCopia';
  search2='';
  criterio3='titulo';
  search3='';
  
  //Lista ID autores
  public listdata:any[]=[];
  listaArticuloAutor: any[] = [];
  public autores: any[]=[];
  public autoresArticulos: any[]=[];
 
  
  constructor(private reporteService:ReporteService,
    private articuloservice: ArticuloService, private fb:FormBuilder, private autorservice: AutorService
  ) { 
    this.form = this.fb.group({
      
      titulo: ['', [Validators.required, Validators.maxLength(50)]],
      palabrasclave: ['', [Validators.required, Validators.maxLength(100)]],
      correo: ['', [Validators.required, Validators.maxLength(100), Validators.email]],
      copia: ['', [Validators.required, Validators.maxLength(150)]],
      ubicacioncopia: ['', [ Validators.maxLength(150)]],
      autorId: [''],
    });
  }

  LimpiarSearch() {
    this.search = '';
    this.search2 = '';
    this.search3 = '';
    var element = document.getElementById("opArt") as HTMLSelectElement;
    element.selectedIndex = 0;
  }

  idautoress:any[]=[];
  ListaArticulo(){
    this.articuloservice.getArticulo().subscribe(resp=>{
        this.listaArticulo=resp;
        this.pagesizee = this.listaArticulo.length;
    })
  };

  ngOnInit(): void {
    this.listadoArticulo();
  }
  comi ="'";
  
  obtenerAutoresId(){
   
    var options = (<HTMLSelectElement>document.getElementById('autorId')).selectedOptions;
      for (let i = 0; i < options.length; i++) {
        if(options[i].value!= undefined){
          this.listdata.push((options[i]?.value)?.split(" ")?.pop()?.replace(/[']/g, ''))
        }
      }
      this.listdata.forEach((item)=>{
        const datos:any={
          articuloId:0,
          autorId:Number(item)
        }
        this.autores.push(datos);

      });
  }
 
  Guardar(){
    this.obtenerAutoresId();
    const articulo:any = {
      titulo: this.form.get('titulo')?.value,
      palabrasclave: this.form.get('palabrasclave')?.value,
      correo: this.form.get('correo')?.value,
      copia: this.form.get('copia')?.value,
      ubicacioncopia: this.form.get('ubicacioncopia')?.value,
      estado: 1,
      articuloAutors: this.autores
    }
    
  
    if(this.id == undefined){
      this.articuloservice.postArticulo(articulo).subscribe(data => {
      
        Swal.fire({
          icon: 'success',
          title: 'Articulo creado con Exito'
        });
        this.listadoArticulo();
        this.form.reset();
        this.autores = [];
      },error =>{
        // console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Error en el Formulario',
          html: error.error.errors[Object.keys(error.error.errors)[0]]
        })
      });
    }
    else{
      const articuloedi:any = {
        titulo: this.form.get('titulo')?.value,
        palabrasclave: this.form.get('palabrasclave')?.value,
        correo: this.form.get('correo')?.value,
        copia: this.form.get('copia')?.value,
        ubicacioncopia: this.form.get('ubicacioncopia')?.value,
        estado: 1,
      }
      articuloedi.id=this.id;
      this.articuloservice.putArticulo(this.id,articuloedi).subscribe(x=>{
        this.accion="Agregar";
        Swal.fire({
          icon: 'success',
          title: 'Articulo Modificado con Exito'
        })
        this.listadoArticulo();

      },error =>{
        Swal.fire({
          icon: 'error',
          title: 'Error Modificar',
          html: error.error.errors[Object.keys(error.error.errors)[0]]
        })
        // console.log(error);
      });
      for(let x=0; x < this.idautores.length; x ++){      
        this.articuloservice.deleteArticuloAutor(this.idautores[x].id).subscribe(x=>{
        });                
      };         
     for(let x=0; x < this.autores.length; x ++){
          this.autoresArticulos[x] = {articuloId: this.idautores[0].articuloId, autorId: this.autores[x].autorId}
          this.articuloservice.postArticuloAutor(this.autoresArticulos[x]).subscribe(x=>{
          });          
        };
      
      this.ngOnInit();
    }
    document.getElementById("ModalClose")?.click();    
    this.listdata=[];
    this.autores=[];
    this.idautores=[];
  }

  Guardarinstruct(){
    //Limpiar Form
    this.form.markAsUntouched();
    this.form.markAsPristine();

    this.mensa = "";
    this.id = undefined;
    this.form.patchValue({
      titulo:"",
      palabrasclave:"",
      correo:"",
      copia:"",
      ubicacioncopia:"",
      tipoautor:"",
      autorId: "",
    })
  }

  mensa: any;
  idautores:any[]=[];
  SeleccionarArticulo(articulo:any){
   
    this.accion = "Editar";
    this.id=articulo.id;
    this.form.patchValue({
      titulo:articulo.titulo,
      palabrasclave:articulo.palabrasClave,
      correo:articulo.correo,
      copia:articulo.copia,
      ubicacioncopia:articulo.ubicacionCopia,
      autorId: articulo.articuloAutors
    })
    this.mensa= "Si desea puede cambiar de autores.."  
    this.idautores = this.form.value.autorId;
     //Seleccionar items Select2 Autores
     var element = document.getElementById('autorId') as HTMLSelectElement;

     for (var i = 0; i < element.options.length; i++) {
       this.idautores.forEach(obj=>
         {               
           if(element.options[i].value==i+": '"+obj.autorId+"'"){
             element.options[i].defaultSelected=true;
             element.options[i].selected=true;
           }
           
         }
         )
     }
     element.dispatchEvent(new Event("change"));
  }

  CambiarEstado(articulo: any, accion: number) {
    this.id = articulo.id;
    if (this.id != undefined) {
      const articulos:any = {
        titulo:articulo.titulo,
        palabrasclave:articulo.palabrasClave,
        correo:articulo.correo,
        copia:articulo.copia,
        ubicacioncopia:articulo.ubicacionCopia,
        estado: accion,
      }
      this.articuloservice
        .putArticulo(this.id, articulos)
        .subscribe((r) => {
          if (articulos.estado == 0) {
            Swal.fire({
              icon: 'error',
              title: 'El articulo ha sido dado de baja con Exito',
            });
          } else {
            Swal.fire({
              icon: 'success',
              title: 'El articulo ha sido activado con Exito',
            });
          }
          this.ListaArticulo();
        });
    }
  }

  async listadoArticulo() {
    await this.articuloservice.getArticulo().subscribe((data) => {     
      this.listaArticulo = data;
      // console.log(data);
      this.pagesizee = this.listaArticulo.length;
    });
    await this.autorservice.getAutorActivo().subscribe((data) => {
      this.listaAutor = data;
     
    });
    await this.articuloservice.getArticuloAutor().subscribe((data) => {
      this.listaArticuloAutor = data;
     
    });
  }
   //REPORTE PDF
   reportePDF(){
    //Encabezado de Tabla
   const encabezado=['ID', 'Titulo', 'Palabras Clave','Correo Contacto', 'Copia','Ubicacion','Autores', 'Estado'];
    this.articuloservice.getArticulo().subscribe(
      (data) => {
      const cuerpo = Object(data).map((obj:any)=>
      [
        //Datos Tabla
        obj.id,
        obj.titulo,
        obj.palabrasClave,
        obj.correo,
        obj.copia,
        obj.ubicacionCopia,
        this.obtenerAutor(obj.articuloAutors),             
        (obj.estado==1)? "ACTIVO" : "INACTIVO"
      ]);
      this.reporteService.reportePDF(encabezado,cuerpo,"REPORTE ARTICULOS");
     
    });
    
  }
  //REPORTE EXCEL
 reporteExcel(){
  var nombreArchivo="reporteArticulo.xlsx"
  var id = document.getElementById('datos');
  this.reporteService.reporteExcel(id,nombreArchivo,8);
 }
  obtenerAutor(autores:any){
    var autor='';
    autores.map((obj:any)=>{
      this.listaAutor.filter(x=>x.id==obj.autorId).map((x:any)=>{
          autor=autor+' '+x.persona.nombre+' '+x.persona.apellido
       });

    })   
  return autor;
  }

}