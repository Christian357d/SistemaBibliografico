import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EditorService } from 'src/app/services/editor.service';
import Swal from 'sweetalert2';
import { formatDate } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Mensaje } from 'src/app/validar/Mensaje';
import { ReporteService } from 'src/app/services/reporte.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  listaEditor:any[]=[];
  form:FormGroup;
  accion="Agregar";
  id:number|undefined;
  lista: Mensaje=new Mensaje();
  pageSize = 5;
  page = 1;
  pagesizee : any;
  criterio="nombreeditor";
  search='';
  criterio2="nacioeditor";
  search2='';
  alertaFecha="no";
  hoy = new Date();

  constructor(private reporteService:ReporteService,
    public modalService:NgbModal,private editorservice: EditorService, private fb:FormBuilder
  ) { 
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(50),Validators.pattern('^[A-Za-zñÑáéíóúÁÉÍÓÚ ]+$')]],
      apellido: ['', [Validators.required, Validators.maxLength(50),Validators.pattern('^[A-Za-zñÑáéíóúÁÉÍÓÚ ]+$')]],
      genero: ['', [Validators.required, Validators.maxLength(50)]],
      fechanacimiento: ['', [Validators.required]],
      nacionalidad: ['', [Validators.required, Validators.maxLength(50),Validators.pattern('^[A-Za-zñÑáéíóúÁÉÍÓÚ ]+$')]],
      cod_editor: ['', [Validators.required,Validators.maxLength(7), Validators.pattern('[A-Z]{3}[-][0-9]{3}')]],
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
  ListaEditor(){
    this.editorservice.getEditor().subscribe(resp=>{
        // console.log(resp);
        this.listaEditor=resp;
        this.pagesizee = this.listaEditor.length;
    })
  };
  LimpiarSearch() {
    this.search = '';
    this.search2='';
  }
  ngOnInit(): void {
    this.ListaEditor();
  }

  Guardarinstruct(content:any){
    //Limpiar Form
    this.form.markAsUntouched();
    this.form.markAsPristine();
    this.modalService.open(content);
    this.id = undefined;
    this.form.patchValue({
      nombre:"",
      apellido:"",
      fechanacimiento:"",
      nacionalidad:"",
      genero:"",
      cod_editor:"",
    })
  }

  Guardar(){
    
    const editor :any = {
      estado: 1,
      cod_editor: this.form.get('cod_editor')?.value,
      personaId: 0,
      persona:{
        nombre: this.form.get('nombre')?.value,
        apellido: this.form.get('apellido')?.value,
        genero: this.form.get('genero')?.value,
        fechaNacimiento: this.form.get('fechanacimiento')?.value,
        nacionalidad: this.form.get('nacionalidad')?.value,
      },
    }
    
    //console.log(editor);
    if(this.id == undefined){
      this.editorservice.postEditor(editor).subscribe(data => {
        //console.log(editor);
        Swal.fire({
          icon: 'success',
          title: 'Editor creado con Exito'
        });
        this.ListaEditor();
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
      editor.id=this.id;
      //EDITAR
      this.editorservice.putEditor(this.id,editor).subscribe(x=>{
        this.accion="Agregar";
        Swal.fire({
          icon: 'success',
          title: 'Editor Modificado con Exito'
        })
        this.ListaEditor();

      },error =>{
        Swal.fire({
          icon: 'error',
          title: 'Error al modificar...',
          html: error.error.errors[Object.keys(error.error.errors)[0]]
        })
        //console.log(error);
      });
    }
  }
  SeleccionarEditor(content:any,editor:any){
    this.modalService.open(content);
    const format = 'yyyy-MM-dd';
    const locale = 'en-US';
    this.accion = "Editar";
    this.id=editor.id;
    const formattedDate = formatDate(editor.persona.fechaNacimiento, format, locale);
    this.form.patchValue({
      personaId:editor.persona.id,
      nombre:editor.persona.nombre,
      apellido:editor.persona.apellido,
      genero:editor.persona.genero,
      fechanacimiento:formattedDate,
      nacionalidad:editor.persona.nacionalidad,
      cod_editor:editor.cod_Editor,
    })
  }

  CambiarEditor(editor: any, accion: number) {
if(accion==0){
  Swal.fire({
    title: '¿Esta Seguro?',
    text: "Que quiere Eliminar a este Editor!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, Eliminarlo!'
  }).then((result) => {
    if (result.isConfirmed) {
      this.id = editor.id;
      if (this.id != undefined) {
        editor.estado = accion;
        this.editorservice
          .putEditor(this.id, editor)
          .subscribe((r) => {
            Swal.fire(
              'Eliminado!',
              'El registro de Editor fue Eliminado Exitosamente.',
              'success'
            )
            this.ListaEditor();
          });
      }     
    }
  })
}
else{
  Swal.fire({
    title: '¿Esta Seguro?',
    text: "Que quiere Activar a este Editor!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, Activarlo!'
  }).then((result) => {
    if (result.isConfirmed) {
      this.id = editor.id;
      if (this.id != undefined) {
        editor.estado = accion;
        this.editorservice
          .putEditor(this.id, editor)
          .subscribe((r) => {
            Swal.fire(
              'Activado!',
              'El registro de Editor fue Activado Exitosamente.',
              'success'
            )
            this.ListaEditor();
          });
      }
     
    }
  })

}
  
  }
  //REPORTE PDF
  reportePDF(){
    const format = 'dd-MM-yyyy';
    const locale = 'en-US';
    //Encabezado de Tabla
    const encabezado=['ID', 'Nombre', 'Apellido', 'Genero', 'Fecha de Nacimiento', 'Nacionalidad', 'Codigo de Editor', 'Estado'];
    this.editorservice.getEditor().subscribe(
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
        obj.cod_Editor,
        (obj.estado==1)? "ACTIVO" : "INACTIVO",
      ]);
      this.reporteService.reportePDF(encabezado,cuerpo,"REPORTE EDITOR");
     
    });
    
  }
  //REPORTE EXCEL
 reporteExcel(){
  var nombreArchivo="reporteEditor.xlsx"
  var id = document.getElementById('datos');
  this.reporteService.reporteExcel(id,nombreArchivo,6);
 }
}
