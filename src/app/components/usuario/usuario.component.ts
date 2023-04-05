import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { RolService } from 'src/app/services/rol.service';
import { formatDate } from "@angular/common";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as CryptoJS from 'crypto-js';



declare var $: any;
@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  // enctxt:any;
  // encpass:any;
  // listaUsuario:any[]=[];
  // form:FormGroup;
  // accion="Agregar";
  // id:number|undefined;
  // listaRol: any[] = [];
  // rol: any[]=[];
  // idcont=0;

  constructor(
    public modalService:NgbModal,private usuarioservice: UsuarioService, private fb:FormBuilder, private rolservice: RolService
  ) { 
    // this.form = this.fb.group({
    //   personaId: [''],
    //   nombre: ['', [Validators.required, Validators.maxLength(50), Validators.pattern('^[ A-Za-zñÑáéíóúÁÉÍÓÚ ]+$')]],
    //   apellido: ['', [Validators.required, Validators.maxLength(50), Validators.pattern('^[ A-Za-zñÑáéíóúÁÉÍÓÚ ]+$')]],
    //   genero: ['', [Validators.required, Validators.maxLength(50)]],
    //   fechanacimiento: ['', [Validators.required]],
    //   nacionalidad: ['', [Validators.required, Validators.maxLength(50)]],
    //   nombreUsuario: ['', [Validators.required, Validators.maxLength(50), Validators.pattern('^[A-Za-zñÑáéíóúÁÉÍÓÚ ]+$')]],
    //   password: ['', [Validators.required, Validators.maxLength(50)]],
    //   fechaRegistro: ['', [Validators.required]],
    //   RolId: ['', [Validators.required]],
    // });

    
    
  }

  // passencrip:any;
  // convenc(encrip:string){
  //   if (encrip==='1') {
  //     this.passencrip=CryptoJS.AES.encrypt(this.form.get('nombreUsuario')?.value.trim(),this.form.get('password')?.value.trim()).toString();
  //   }
  // }
  // hide=true;

  // idper = 0;
  // idrol:any[]=[];
  // ListaUsuario(){
  //   this.usuarioservice.getUsuario().subscribe(resp=>{
  //     this.listaUsuario=resp;
  // })
  // }

  ngOnInit(): void {
    //  this.listadoUsuario();
   }

  // Guardar(){
  //   const usuario:any = {
  //     nombreUsuario: this.form.get('nombreUsuario')?.value,
  //     password: this.passencrip,
  //     fechaRegistro: this.form.get('fechaRegistro')?.value,
  //     estado: 1,
  //     personaId: 0,
  //     persona:{
  //       nombre: this.form.get('nombre')?.value,
  //       apellido: this.form.get('apellido')?.value,
  //       genero: this.form.get('genero')?.value,
  //       fechaNacimiento: this.form.get('fechanacimiento')?.value,
  //       nacionalidad: this.form.get('nacionalidad')?.value,
  //     },
  //     RolId: this.form.get('RolId')?.value  
  //     }
    
  //   if(this.id == undefined){
  //     this.usuarioservice.postUsuario(usuario).subscribe(data => {
  
  //       Swal.fire({
  //         icon: 'success',
  //         title: 'Usuario creado con Exito'
  //       });
  //       this.listadoUsuario();
  //       this.form.reset();
  //     },error =>{
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'Error en el Formulario',
  //         html: error.error.errors[Object.keys(error.error.errors)[0]]
  //       })
  //     });
  //   }
  //   else{
  //     const usuarioedi:any = {
  //       nombreUsuario: this.form.get('nombreUsuario')?.value,
  //     password: this.form.get('password')?.value,
  //     fechaRegistro: this.form.get('fechaRegistro')?.value,
  //     estado: 1,
  //     personaId: this.idper,
  //     persona:{
  //       nombre: this.form.get('nombre')?.value,
  //       apellido: this.form.get('apellido')?.value,
  //       genero: this.form.get('genero')?.value,
  //       fechaNacimiento: this.form.get('fechanacimiento')?.value,
  //       nacionalidad: this.form.get('nacionalidad')?.value
  //     },
  //     RolId: this.form.get('RolId')?.value  
  //     }
  //     usuarioedi.id=this.id;
  //     this.usuarioservice.putUsuario(this.id,usuarioedi).subscribe(x=>{
  //       this.accion="Agregar";
  //       Swal.fire({
  //         icon: 'success',
  //         title: 'Usuario Modificado con Exito'
  //       })
  //       this.ListaUsuario();
  //     },error =>{
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'Error Modificar',
  //         html: error.error.errors[Object.keys(error.error.errors)[0]]
                
  //       })
  //       console.log(error);
  //     });
  //     this.ListaUsuario();
  //   }
  // }

  // Guardarinstruct(content:any){
  //   this.modalService.open(content);
  //   this.id = undefined;
  //   this.form.patchValue({
  //     nombre:"",
  //     apellido:"",
  //     fechanacimiento:"",
  //     nacionalidad:"",
  //     genero:"",
  //     nombreUsuario:"",
  //     password:"",
  //     fechaRegistro:"",
  //     RolId: "",
  //   })
  // }
  // fecha=Date;
  // SeleccionarUsuario(content:any,usuario:any){
  //   this.modalService.open(content);
  //   const format = 'yyyy-MM-dd';
  //   const locale = 'en-US';
  //   this.accion = "Editar";
  //   this.id=usuario.id;
  //   const formattedDate = formatDate(usuario.persona.fechaNacimiento, format, locale);
  //   const ormatedDate = formatDate(usuario.fechaRegistro, format, locale);
  //   this.form.patchValue({
  //     personaId:usuario.persona.id,
  //     nombre:usuario.persona.nombre,
  //     apellido:usuario.persona.apellido,
  //     genero:usuario.persona.genero,
  //     fechanacimiento:formattedDate,
  //     nacionalidad:usuario.persona.nacionalidad,
  //     nombreUsuario:usuario.nombreUsuario,
  //     password:usuario.password,
  //     fechaRegistro:ormatedDate,
  //     RolId: usuario.rol.id
  //   })
  //   this.idper = this.form.value.personaId;
  // }

  // CambiarEstado(usuario: any, accion: number) {
  //   this.id = usuario.id;
  //   if (this.id != undefined) {
  //     const usuarios:any = {
  //       nombreUsuario: usuario.nombreUsuario,
  //       password: usuario.password,
  //       fechaRegistro: usuario.fechaRegistro,
  //       estado: accion,
  //       personaId: usuario.persona.id,
  //       persona:{
  //         nombre: usuario.persona.nombre,
  //         apellido: usuario.persona.apellido,
  //         genero: usuario.persona.genero,
  //         fechaNacimiento: usuario.persona.fechaNacimiento,
  //         nacionalidad: usuario.persona.nacionalidad,
  //       },
  //       RolId: usuario.rol.id,
        
  //     }
  //     console.log();
  //     this.usuarioservice
  //       .putUsuario(this.id, usuarios)
  //       .subscribe((r) => {
  //         if (usuarios.estado == 0) {
  //           Swal.fire({
  //             icon: 'error',
  //             title: 'El usuario ha sido dado de baja con Exito',
  //           });
  //         } else {
  //           Swal.fire({
  //             icon: 'success',
  //             title: 'El usuario ha sido activado con Exito',
  //           });
  //         }
  //         this.ListaUsuario();
  //       });
  //   }
  // }

  // async listadoUsuario() {
  //   await this.usuarioservice.getUsuario().subscribe((data) => {
  //     this.listaUsuario = data;
      
  //   });
    
  //   await this.rolservice.getRolActivos().subscribe((data) => {
  //     this.listaRol = data;
   
  //   });
  // }
}
