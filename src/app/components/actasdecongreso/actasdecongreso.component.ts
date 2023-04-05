import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActasdecongresoService } from 'src/app/services/actasdecongreso.service';
import { ArticuloService } from 'src/app/services/articulo.service';
import { TipocongresoService } from 'src/app/services/tipocongreso.service';
import { formatDate } from "@angular/common";
import { Articulo } from 'src/app/class/Articulo';
import { Mensaje } from 'src/app/validar/Mensaje';
import { ReporteService } from 'src/app/services/reporte.service';
import { PaisService } from 'src/app/services/pais.service';
declare var $: any;

@Component({
  selector: 'app-actasdecongreso',
  templateUrl: './actasdecongreso.component.html',
  styleUrls: ['./actasdecongreso.component.css']
})
export class ActasdecongresoComponent implements OnInit {

  listaActasCongreso:any[]=[];
  form:FormGroup;
  accion="Agregar";
  id:number|undefined;
  listaArticulo: any[] = [];
  listaTipoCongreso: any[] = [];
  idcont = 0;

  //Mensajes Error
  lista: Mensaje=new Mensaje();
  pageSize = 5;
  page = 1;
  pagesizee : any;
  today = new Date();
  //API Paises
  listaPais:any[]=[];
  listaCiudad:any[]=[];
  listaCiudades:any[]=[];
  pais:number=0
  criterio='nombre';
  search='';
  criterio2='actaarticulo';
  search2='';
  criterio3='tipocongresoactas';
  search3='';

 
  
  constructor( private paisservice: PaisService,private reporteService:ReporteService,private actasdecongresoservice: ActasdecongresoService, private fb:FormBuilder, private articuloservice: ArticuloService, private tipocongresoservice: TipocongresoService
) { 
  this.form = this.fb.group({

    nombre: ['', [Validators.required, Validators.maxLength(50)]],
    edicion: ['', [Validators.required, Validators.maxLength(25)]],
    ciudad: ['', [Validators.required, Validators.maxLength(50)]],
    fechaInicio: ['', [Validators.required]],
    fechaFinalizacion: ['', [Validators.required]],
    frecuencia: ['', [Validators.required]],
    pais: ['', [Validators.required]],
    nacional: [{value:null,disabled: true}],
    anioPrimeraVez: ['', [Validators.required]],
    articuloid: ['', [Validators.required]],
    tipocongresoid: ['', [Validators.required]],
  });
 }
 ListaActasCongreso(){
   this.actasdecongresoservice.getActaCongreso().subscribe(resp=>{
       this.listaActasCongreso=resp;
       this.pagesizee = this.listaActasCongreso.length;
   })
 };
 ngOnInit(): void {
  this.listadoActasCongreso();
  this.listadoPais();
  this.listadoCiudades();
  document.getElementById("inter")?.setAttribute('style', 'display:none');
  document.getElementById("nacional")?.setAttribute('style', 'display:block');
}
LimpiarSearch() {
  this.search = '';
  this.search2 = ''; 
  this.search3 = '';  
  var element = document.getElementById("opActa") as HTMLSelectElement;
  element.selectedIndex = 0;
}
Guardar(){
 
  var pais='';
  this.listaPais.filter(x=>x.id==this.form.get('pais')?.value).map((obj:any)=>pais=obj.name)
  var ciudad='';
  this.listaCiudades.filter(x=>x.id== this.form.get('ciudad')?.value).map((obj:any)=>ciudad=obj.name)
  const autor:any = {
    nombre: this.form.get('nombre')?.value,
    edicion: this.form.get('edicion')?.value,
    ciudad: ciudad,
    fechaInicio: this.form.get('fechaInicio')?.value,
    fechaFinalizacion: this.form.get('fechaFinalizacion')?.value,
    frecuencia: this.form.get('frecuencia')?.value,
    pais:pais,
    anioPrimeraVez: this.form.get('anioPrimeraVez')?.value,
    estado: 1,
    articuloId: this.form.get('articuloid')?.value,
    tipoCongresoId: this.form.get('tipocongresoid')?.value,

  }
  
  if(this.id == undefined){
    this.actasdecongresoservice.postActaCongreso(autor).subscribe(data => {

      Swal.fire({
        icon: 'success',
        title: 'Acta de congreso creado con Exito'
      });
      this.listadoActasCongreso();
      this.form.reset();
    },error =>{
      Swal.fire({
        icon: 'error',
        title: 'Error en el Formulario',
        html: error.error.errors[Object.keys(error.error.errors)[0]]
      })
    });
  }
  else{
    const actadecongresoedi:any = {
      nombre: this.form.get('nombre')?.value,
      edicion: this.form.get('edicion')?.value,
      ciudad: ciudad,
      fechaInicio: this.form.get('fechaInicio')?.value,
      fechaFinalizacion: this.form.get('fechaFinalizacion')?.value,
      frecuencia: this.form.get('frecuencia')?.value,
      pais:pais,
      anioPrimeraVez: this.form.get('anioPrimeraVez')?.value,
      estado: 1,
      articuloId: this.form.get('articuloid')?.value,
      tipoCongresoId: this.form.get('tipocongresoid')?.value,
    }
    actadecongresoedi.id=this.id;
    this.actasdecongresoservice.putActaCongreso(this.id,actadecongresoedi).subscribe(x=>{
      this.accion="Agregar";
      Swal.fire({
        icon: 'success',
        title: 'Acta de congreso Modificada con Exito'
      })
      this.listadoActasCongreso();

    },error =>{
      Swal.fire({
        icon: 'error',
        title: 'Error Modificar',
        html: error.error.errors[Object.keys(error.error.errors)[0]] 
      })
      // console.log(error);
    });
    this.listadoActasCongreso();
  }
  document.getElementById("ModalClose")?.click();
  //Limpiar Form
  this.form.markAsUntouched();
  this.form.markAsPristine();
}

Guardarinstruct(){

  //Limpiar Form
  this.form.markAsUntouched();
  this.form.markAsPristine();

  this.id = undefined;
  this.form.patchValue({
    nombre: "",
    edicion: "",
    ciudad: "",
    fechaInicio: "",
    fechaFinalizacion: "",
    frecuencia: "",
    pais: "",
    anioPrimeraVez: "",
    estado: "",
    articuloid: "",
    tipocongresoid: "",
  })
}

fecha= Date;
SeleccionarActadeCongreso(actadecongreso:any){

  const format = 'yyyy-MM-dd';
  const locale = 'en-US';
  this.accion = "Editar";
  this.id=actadecongreso.id;
  const formattedDate1 = formatDate(actadecongreso.fechaInicio, format, locale);
  const formattedDate2 = formatDate(actadecongreso.fechaFinalizacion, format, locale);
  const formattedDate3 = formatDate(actadecongreso.anioPrimeraVez, format, locale);
//api paises
var pais;
  this.listaPais.filter(x=>x.name==actadecongreso.pais).map((obj:any)=>pais=obj.id)
  var ciudad;
  this.listaCiudades.filter(x=>x.name== actadecongreso.ciudad).map((obj:any)=>ciudad=obj.id)

  this.buscarCiudades(Number(pais));
  this.form.controls['ciudad'].enable();
  this.form.get('pais')?.setValue(pais);
  this.form.patchValue({

    nombre: actadecongreso.nombre,
      edicion: actadecongreso.edicion,
      ciudad: ciudad,
      fechaInicio: formattedDate1,
      fechaFinalizacion: formattedDate2,
      frecuencia: actadecongreso.frecuencia,    
      nacional:actadecongreso.pais,
      anioPrimeraVez: formattedDate3,
      articuloid: actadecongreso.articulo.id,
      tipocongresoid: actadecongreso.tipoCongreso.id,
  })

}
CambiarEstado(actadecongreso: any, accion: number) {
  this.id = actadecongreso.id;
  if (this.id != undefined) {
    const actas:any = {
      
      nombre: actadecongreso.nombre,
      edicion: actadecongreso.edicion,
      ciudad: actadecongreso.ciudad,
      fechaInicio: actadecongreso.fechaInicio,
      fechaFinalizacion: actadecongreso.fechaFinalizacion,
      frecuencia: actadecongreso.frecuencia,
      pais: actadecongreso.pais,
      anioPrimeraVez: actadecongreso.anioPrimeraVez,
      estado: accion,
      articuloid: actadecongreso.articulo.id,
      tipocongresoid: actadecongreso.tipoCongreso.id,
      
    }
    // console.log();
    let valorestado = "";
      if(accion == 0){valorestado = "Desactivar"}else{valorestado ="Activar"}
      let valorestado2 = "";
      if(accion == 0){valorestado2 = "Desactivada"}else{valorestado2 ="Activada"}
      Swal.fire({  
        title: 'Estas seguro de '+ valorestado +' el Acta de Congreso?',
        icon: 'warning',  
        showCancelButton: true,  
        confirmButtonText: 'Si',  
        cancelButtonText: 'No'  
      }).then((result) => {  
        if (result.value) {
          let value = this.id;
          this.actasdecongresoservice.putActaCongreso(value!, actas).subscribe((r) => {
            if (actadecongreso.estado == 0) {
              Swal.fire({
                icon: 'success',
                title: 'El Acta de Congreso ha sido '+valorestado2+'!',
              });
              
            } else {
              Swal.fire({
                icon: 'error',
                title: 'El Acta de Congreso ha sido '+valorestado2+'!',
              });
            }  
          this.ListaActasCongreso();
        });  
        } else if (result.dismiss === Swal.DismissReason.cancel) {  
          Swal.fire(  
            'Cancelado',  
            'El Acta de Congreso no fue '+valorestado2+'.',  
            'error'  
          )  
        }  
      })  
    }
}

async listadoActasCongreso() {
  await this.actasdecongresoservice.getActaCongreso().subscribe((data) => {
    this.listaActasCongreso = data;
    // console.log(data);
    this.pagesizee = this.listaActasCongreso.length;
   
  });
  this.articuloservice.getArticuloActivo().subscribe((data) => {
    this.listaArticulo = data;
    // console.log("Los articulos activos son"+data);
   
  });
  await this.tipocongresoservice.getTipoCongresoActivo().subscribe((data) => {
    this.listaTipoCongreso = data;
   
  });
}

  //REPORTE PDF
  reportePDF(){
    //Encabezado de Tabla
    const encabezado=['ID', 'Nombre', 'Edicion','Ciudad','Frecunencia','Pais','Articulo','Tipo Congreso'];
    this.actasdecongresoservice.getActaCongreso().subscribe(
      (data) => {
      const cuerpo = Object(data).map((obj:any)=>
      [
        //Datos Tabla
        obj.id,
        obj.nombre,
        obj.edicion,
        obj.ciudad,
        obj.frecuencia,
        obj.pais,
        obj.articulo.titulo,
        obj.tipoCongreso.tipo
        
      ]);
      this.reporteService.reportePDF(encabezado,cuerpo,"REPORTE ACTA DE CONGRESO");
     
    });
    
  }
  //REPORTE EXCEL
 reporteExcel(){
  var nombreArchivo="reporteInforme.xlsx"
  var id = document.getElementById('datos');
  this.reporteService.reporteExcel(id,nombreArchivo,12);
 }

 
 //Metodo Verificar Tipo Congreso
 habilitarPais(tipo:any){
  tipo as HTMLSelectElement
  var lista=tipo.selectedOptions;
 
  for (var i = 0; i < lista.length; i++) {
    if((lista[i].label).toLowerCase()== "internacional"){
   
    document.getElementById("inter")?.setAttribute('style', 'display:block');
    document.getElementById("nacional")?.setAttribute('style', 'display:none');
    this.form.controls['ciudad'].reset();
    this.form.controls['ciudad'].disable();

    }else{
      var element = document.getElementById("bol") as HTMLInputElement;
      element.value="Bolivia";
      document.getElementById("inter")?.setAttribute('style', 'display:none');
      document.getElementById("nacional")?.setAttribute('style', 'display:block');
      this.form.get('pais')?.setValue("123");
      this.buscarCiudades(123);
      this.form.controls['ciudad'].enable();   
    }
  }
}
//Metodos para API Paises
habilitarCiudad(){
  var element = document.getElementById("pais") as HTMLSelectElement;
  var lista=element.selectedOptions;
  for (var i = 0; i < lista.length; i++) {
    this.form.get('pais')?.setValue(lista[i].value);
    this.pais=Number(lista[i].value);

  }
  this.buscarCiudades(this.pais);
  this.form.controls['ciudad'].enable();

}


async listadoPais() {
  await this.paisservice.getPais().subscribe((data) => {
    this.listaPais = data;
  });
}
async listadoCiudades() {
  await this.paisservice.getCiudad().subscribe((data) => {
    this.listaCiudades = data;
  });
}

async buscarCiudades(id_country:number) {

  await this.paisservice.buscarCiudades(id_country).subscribe((data) => {
    this.listaCiudad = data;

  });
}
  
}
