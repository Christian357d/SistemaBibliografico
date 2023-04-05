import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
import { RolService} from 'src/app/services/rol.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {Mensaje} from 'src/app/validar/Mensaje'

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.css']
})
export class RolComponent implements OnInit {
  listaRol:any[]=[];
  form:FormGroup;
  accion="Agregar";
  id:number|undefined;
   //Mensajes Error
  lista: Mensaje=new Mensaje();
  pageSize = 5;
  page = 1;
  pagesizee : any;
  search='';
  criterio='nombrerol';
  
  constructor( public modalService:NgbModal,private rolservice: RolService, private fb:FormBuilder) 
  {
    this.form=this.fb.group({
      nombre: ['', [Validators.required,Validators.maxLength(50), Validators.pattern('^[ A-Za-zñÑáéíóúÁÉÍÓÚ ]+$')]],
    });
   }
   ListaRol(){
    this.rolservice.getRol().subscribe(resp=>{
      this.listaRol=resp;
      this.pagesizee = this.listaRol.length;
  })
  }
  LimpiarSearch() {
    this.search = '';
  }
  ngOnInit(): void {
    this.listadoRol(); 

  }

  Guardar(){
    const rol:any = {
      nombre: this.form.get('nombre')?.value,
      estado: 1,
    }
    if(this.id == undefined){
      this.rolservice.postRol(rol).subscribe(data => {
        //console.log(rol);
        Swal.fire({
          icon: 'success',
          title: 'Rol Registrado!'
        });
        this.ListaRol();
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
      rol.id=this.id;
      //EDITAR
      this.rolservice.putRol(this.id,rol).subscribe(x=>{
        this.accion="Agregar";
        Swal.fire({
          icon: 'success',
          title: 'Rol Modificado!'
        })
        this.ListaRol();

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
      nombre: ""
    })
  }
  fecha=Date;
  SeleccionarRol(content:any,rol:any){
    this.modalService.open(content);
    //console.log(rol)
    this.accion = "Editar";
    this.id=rol.id;
    this.form.patchValue({
      nombre:rol.nombre,
    })
  }

  CambiarEstado(rol: any, accion: number) {
    this.id = rol.id;
    if (this.id != undefined) {
      rol.estado = accion;
      this.rolservice
        .putRol(this.id, rol)
        .subscribe((r) => {
          if (rol.estado == 0) {
            Swal.fire({
              icon: 'error',
              title: 'El rol ha sido desactivado!',
            });
          } else {
            Swal.fire({
              icon: 'success',
              title: 'El rol ha sido activado',
            });
          }
          this.ListaRol();
        });
    }
  }

  async listadoRol() {
    await this.rolservice.getRol().subscribe((data) => {
      this.listaRol = data;
      // console.log(data);
      this.pagesizee = this.listaRol.length;
    });
  }

}
