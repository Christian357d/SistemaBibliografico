import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TemaService } from 'src/app/services/tema.service';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Mensaje } from 'src/app/validar/Mensaje';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {
  listaTema:any[]=[];
  form:FormGroup;
  accion="Agregar";
  id:number|undefined;
  //Mensajes Error
  lista: Mensaje=new Mensaje();
  pageSize = 5;
  page = 1;
  pagesizee : any;
  criterio='nombre';
  search='';
  constructor(
    public modalService:NgbModal,private temaservice: TemaService, private fb:FormBuilder
  ) { 
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(50)]],
      descripcion: ['', [Validators.required, Validators.maxLength(100)]],
    });
  }

  ListaTema(){
    this.temaservice.getTema().subscribe(resp=>{
        this.listaTema=resp;
        this.pagesizee = this.listaTema.length;
    })
  };
  LimpiarSearch() {
    this.search = '';
  }
  ngOnInit(): void {
    this.ListaTema();
  }


  Guardar(){
    const tema:any = {
      Nombre: this.form.get('nombre')?.value,
      Descripcion: this.form.get('descripcion')?.value,
      estado: 1,
    }
    if(this.id == undefined){
      this.temaservice.postTema(tema).subscribe(data => {
        //console.log(tema);
        Swal.fire({
          icon: 'success',
          title: 'Tema Registrado!'
        });
        this.ListaTema();
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
      tema.id=this.id;
      //EDITAR
      this.temaservice.putTema(this.id,tema).subscribe(x=>{
        this.accion="Agregar";
        Swal.fire({
          icon: 'success',
          title: 'Tema Modificado!'
        })
        this.ListaTema();

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

  Guardarinstruct(content:any){
    this.modalService.open(content);
    this.id = undefined;
    this.form.patchValue({
      nombre:"",
      descripcion:"",
    })
  }
  
  SeleccionarTema(content:any,tema:any){
    this.modalService.open(content);
    //console.log(tema)
    this.accion = "Editar";
    this.id=tema.id;
    this.form.patchValue({
      nombre:tema.nombre,
      descripcion:tema.descripcion,
    })
  }

  CambiarEstado(tema: any, accion: number) {
    this.id = tema.id;
    if (this.id != undefined) {
      tema.estado = accion;
      this.temaservice
        .putTema(this.id, tema)
        .subscribe((r) => {
          if (tema.estado == 0) {
            Swal.fire({
              icon: 'error',
              title: 'El tema ha sido desactivado!',
            });
          } else {
            Swal.fire({
              icon: 'success',
              title: 'El tema ha sido activado',
            });
          }
          this.ListaTema();
        });
    }
  }

}
