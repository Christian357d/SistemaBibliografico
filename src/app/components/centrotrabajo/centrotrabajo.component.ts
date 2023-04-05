import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CentrotrabajoService } from 'src/app/services/centrotrabajo.service';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Mensaje } from 'src/app/validar/Mensaje';
import { ReporteService } from 'src/app/services/reporte.service';

@Component({
  selector: 'app-centrotrabajo',
  templateUrl: './centrotrabajo.component.html',
  styleUrls: ['./centrotrabajo.component.css']
})
export class CentrotrabajoComponent implements OnInit {
  listaCentroTrabajo:any[]=[];
  form:FormGroup;
  accion="Agregar";
  id:number|undefined;
  pageSize = 5;
  page = 1;
  pagesizee : any;
  criterio='nombre';
  search='';


  //Mensajes Error
  lista: Mensaje=new Mensaje();
  constructor(private reporteService:ReporteService,
    public modalService:NgbModal,private centrotrabajoservice: CentrotrabajoService, private fb:FormBuilder
  ) { 
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(50)]],
    });
  }

  ListaCentroTrabajo(){
    this.centrotrabajoservice.getCentroTrabajo().subscribe(resp=>{
        //console.log(resp);
        this.listaCentroTrabajo=resp;
        this.pagesizee = this.listaCentroTrabajo.length;
    })
  };
  LimpiarSearch() {
    this.search = '';
  }
  ngOnInit(): void {
    this.ListaCentroTrabajo();
  }

  
  Guardar(){
    const centrotrabajo:any = {
      nombre: this.form.get('nombre')?.value,
      estado: 1,
    }
    if(this.id == undefined){
      this.centrotrabajoservice.postCentroTrabjo(centrotrabajo).subscribe(data => {
        //console.log(centrotrabajo);
        Swal.fire({
          icon: 'success',
          title: 'Centro de trabajo Registrado!'
        });
        this.ListaCentroTrabajo();
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
      centrotrabajo.id=this.id;
      //EDITAR
      this.centrotrabajoservice.putCentroTrabajo(this.id,centrotrabajo).subscribe(x=>{
        this.accion="Agregar";
        Swal.fire({
          icon: 'success',
          title: 'Centro de trabajo Modificado!'
        })
        this.ListaCentroTrabajo();

      },error =>{
        Swal.fire({
          icon: 'error',
          title: 'Error al Modificar',
          html: error.error.errors[Object.keys(error.error.errors)[0]]

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
      nombre:"",
    })
  }
  
  SeleccionarCentroTrabjo(content:any,centrotrabajo:any){
    this.modalService.open(content);
    //console.log(centrotrabajo)
    this.accion = "Editar";
    this.id=centrotrabajo.id;
    this.form.patchValue({
      nombre:centrotrabajo.nombre,
    })
  }

  CambiarEstado(centrotrabajo: any, accion: number) {
    this.id = centrotrabajo.id;
    if (this.id != undefined) {
      centrotrabajo.estado = accion;
      this.centrotrabajoservice
        .putCentroTrabajo(this.id, centrotrabajo)
        .subscribe((r) => {
          if (centrotrabajo.estado == 0) {
            Swal.fire({
              icon: 'error',
              title: 'El centrotrabajo ha sido desactivado!',
            });
          } else {
            Swal.fire({
              icon: 'success',
              title: 'El centrotrabajo ha sido activado',
            });
          }
          this.ListaCentroTrabajo();
        });
    }
  }
  
}
