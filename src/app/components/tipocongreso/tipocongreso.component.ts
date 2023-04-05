import { Component, OnInit } from '@angular/core';
import { TipocongresoService } from 'src/app/services/tipocongreso.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {Mensaje} from 'src/app/validar/Mensaje';

@Component({
  selector: 'app-tipocongreso',
  templateUrl: './tipocongreso.component.html',
  styleUrls: ['./tipocongreso.component.css']
})
export class TipocongresoComponent implements OnInit {
  listaTipoCongreso:any[]=[];
  form:FormGroup;
  accion="Agregar";
  id:number|undefined;
  lista: Mensaje=new Mensaje();
  pageSize = 5;
  page = 1;
  pagesizee : any;

  criterio='tipo';
  search='';
  constructor(
    public modalService:NgbModal,private tipocongresoservice: TipocongresoService, private fb:FormBuilder
  ) { 
    this.form = this.fb.group({
      tipo: ['', [Validators.required, Validators.maxLength(50),Validators.pattern('^[ A-Za-zñÑáéíóúÁÉÍÓÚ ]+$')]],
    });
  }

  ListaTipoCongreso(){
    this.tipocongresoservice.getTipoCongreso().subscribe(resp=>{
        // console.log(resp);
        this.listaTipoCongreso=resp;
        this.pagesizee = this.listaTipoCongreso.length;
    })
  };
  LimpiarSearch() {
    this.search = '';
  }
  ngOnInit(): void {
    this.ListaTipoCongreso();
  }


  Guardar(){
    const tipocongreso:any = {
      tipo: this.form.get('tipo')?.value,
      estado: 1,
    }
    if(this.id == undefined){
      this.tipocongresoservice.postTipoCongreso(tipocongreso).subscribe(data => {
        // console.log(tipocongreso);
        Swal.fire({
          icon: 'success',
          title: 'Tipo de Congreso Registrado!'
        });
        this.ListaTipoCongreso();
        this.form.reset();
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
      tipocongreso.id=this.id;
      //EDITAR
      this.tipocongresoservice.putTipoCongreso(this.id,tipocongreso).subscribe(x=>{
        this.accion="Agregar";
        Swal.fire({
          icon: 'success',
          title: 'Tipo de Congreso Modificado!'
          
        })
        this.ListaTipoCongreso();

      },error =>{
        Swal.fire({
          icon: 'error',
          title: 'No registrado',
          text: 'No se pudo editar el tipo de congreso',
          html: error.error.errors[Object.keys(error.error.errors)[0]]
        })
        // console.log(error);
      });
    }
  }

  Guardarinstruct(content:any){
    this.modalService.open(content);
    this.id = undefined;
    this.form.patchValue({
      tipo:"",
    })
  }
  
  SeleccionarTipoCogreso(content:any,tipocongreso:any){
    this.modalService.open(content);
    // console.log(tipocongreso)
    this.accion = "Editar";
    this.id=tipocongreso.id;
    this.form.patchValue({
      tipo:tipocongreso.tipo,
    })
  }

  CambiarEstado(tipocongreso: any, accion: number) {
    this.id = tipocongreso.id;
    if (this.id != undefined) {
      tipocongreso.estado = accion;
      this.tipocongresoservice
        .putTipoCongreso(this.id, tipocongreso)
        .subscribe((r) => {
          if (tipocongreso.estado == 0) {
            Swal.fire({
              icon: 'error',
              title: 'El tipo de congreso ha sido desactivado!',
            });
          } else {
            Swal.fire({
              icon: 'success',
              title: 'El tipo de congreso ha sido activado',
            });
          }
          this.ListaTipoCongreso();
        });
    }
  }

}
