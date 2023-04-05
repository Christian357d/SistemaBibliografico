import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { RolService } from 'src/app/services/rol.service';
import { formatDate } from "@angular/common";

import * as CryptoJS from 'crypto-js';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Mensaje } from 'src/app/validar/Mensaje';
import { ReporteService } from 'src/app/services/reporte.service';

@Component({
  selector: 'app-usadmin',
  templateUrl: './usadmin.component.html',
  styleUrls: ['./usadmin.component.css']
})
export class UsadminComponent implements OnInit {
  enctxt:any;
  encpass:any;
  listaUsuario:any[]=[];
  form:FormGroup;
  accion="Agregar";
  id:number|undefined;
  listaRol: any[] = [];
  idcont=0;
  Rol=1;
  pageSize = 5;
  page = 1;
  pagesizee : any;
  lista: Mensaje=new Mensaje();


  criterio='nombreus';
  search='';
  criterio2='users';
  search2='';
  alertaFecha="no";
  hoy = new Date();
  constructor(private reporteService:ReporteService,
    public modalService:NgbModal,private usuarioservice: UsuarioService, private fb:FormBuilder, private rolservice: RolService
    ) {
      this.form = this.fb.group({
        personaId: [''],
        nombre: ['', [Validators.required, Validators.maxLength(50), Validators.pattern('^[ A-Za-zñÑáéíóúÁÉÍÓÚ ]+$')]],
        apellido: ['', [Validators.required, Validators.maxLength(50), Validators.pattern('^[ A-Za-zñÑáéíóúÁÉÍÓÚ ]+$')]],
        genero: ['', [Validators.required, Validators.maxLength(50)]],
        fechanacimiento: ['', [Validators.required]],
        nacionalidad: ['', [Validators.required, Validators.maxLength(50),Validators.pattern('^[A-Za-zñÑáéíóúÁÉÍÓÚ ]+$')]],
        nombreUsuario: ['', [Validators.required, Validators.maxLength(50), Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
        password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(200),  Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$')]],
        fechaRegistro: '',
        estado:'',
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
  hide=true;

  idper = 0;
  idrol:any[]=[];
  ListaUsuario(){
    this.usuarioservice.getUsuarioadmin().subscribe(resp=>{
      this.listaUsuario=resp;
      this.pagesizee = this.listaUsuario.length;
  })
  }
LimpiarSearch() {
    this.search = '';
    this.search2='';
  }
  ngOnInit(): void {
    this.listadoUsuario();
  }
  


  Guardar(){
    const tiempo=new Date();
    const usuario:any = {
      nombreUsuario: this.form.get('nombreUsuario')?.value,
      password: this.reporteService.convenc(this.form.get('nombreUsuario')?.value, this.form.get('password')?.value),
      fechaRegistro: tiempo,
      estado: 1,
      personaId: 0,
      persona:{
        nombre: this.form.get('nombre')?.value,
        apellido: this.form.get('apellido')?.value,
        genero: this.form.get('genero')?.value,
        fechaNacimiento: this.form.get('fechanacimiento')?.value,
        nacionalidad: this.form.get('nacionalidad')?.value,
      },
      RolId: this.Rol
      }
    
    if(this.id == undefined){
      this.usuarioservice.postUsuario(usuario).subscribe(data => {
  
        Swal.fire({
          icon: 'success',
          title: 'Usuario creado con Exito'
        });
        this.listadoUsuario();
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
      const usuarioedi:any = {
        nombreUsuario: this.form.get('nombreUsuario')?.value,
      password: this.reporteService.convenc(this.form.get('nombreUsuario')?.value, this.form.get('password')?.value),
      fechaRegistro: this.form.get('fechaRegistro')?.value,
      estado:this.form.get('estado')?.value,
      personaId: this.idper,
      persona:{
        nombre: this.form.get('nombre')?.value,
        apellido: this.form.get('apellido')?.value,
        genero: this.form.get('genero')?.value,
        fechaNacimiento: this.form.get('fechanacimiento')?.value,
        nacionalidad: this.form.get('nacionalidad')?.value
      },
      RolId: this.Rol 
      }
      usuarioedi.id=this.id;
      this.usuarioservice.putUsuario(this.id,usuarioedi).subscribe(x=>{
        this.accion="Agregar";
        Swal.fire({
          icon: 'success',
          title: 'Usuario Modificado con Exito'
        })
        this.ListaUsuario();
      },error =>{
        Swal.fire({
          icon: 'error',
          title: 'Error Modificar',
          html: error.error.errors[Object.keys(error.error.errors)[0]]
                
        })
        //console.log(error);
      });
      
      this.ListaUsuario();
    }
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
      nombreUsuario:"",
      password:"",
      fechaRegistro:""
    })
  }
  fecha=Date;
  SeleccionarUsuario(content:any,usuario:any){
    this.modalService.open(content);
    const format = 'yyyy-MM-dd';
    const locale = 'en-US';
    this.accion = "Editar";
    this.id=usuario.id;
    const formattedDate = formatDate(usuario.persona.fechaNacimiento, format, locale);
    const tiempo=new Date();   
    this.form.patchValue({
      personaId:usuario.persona.id,
      nombre:usuario.persona.nombre,
      apellido:usuario.persona.apellido,
      genero:usuario.persona.genero,
      fechanacimiento:formattedDate,
      nacionalidad:usuario.persona.nacionalidad,
      nombreUsuario:usuario.nombreUsuario,
      estado:usuario.estado,
      password:usuario.password,
      fechaRegistro:usuario.fechaRegistro,
      RolId: usuario.rol.id
    })
    this.idper = this.form.value.personaId;
  }

  CambiarEstado(usuario: any, accion: number) {
    if(accion==0){
      Swal.fire({
        title: '¿Esta Seguro?',
        text: "Que quiere Eliminar a este Administrador!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Eliminarlo!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.id = usuario.id;
        if (this.id != undefined) {
          const usuarios:any = {
            nombreUsuario: usuario.nombreUsuario,
            password: usuario.password,
            fechaRegistro: usuario.fechaRegistro,
            estado: accion,
            personaId: usuario.persona.id,
            persona:{
              nombre: usuario.persona.nombre,
              apellido: usuario.persona.apellido,
              genero: usuario.persona.genero,
              fechaNacimiento: usuario.persona.fechaNacimiento,
              nacionalidad: usuario.persona.nacionalidad,
            },
            RolId: usuario.rol.id,
            
          }
          //console.log();
          this.usuarioservice
            .putUsuario(this.id, usuarios)
            .subscribe((r) => {
              Swal.fire(
                'Eliminado!',
                'El registro de Administrador fue Eliminado Exitosamente.',
                'success'
              )
              this.ListaUsuario();
            });
        }
        }
      })
    }
    else{
      Swal.fire({
        title: '¿Esta Seguro?',
        text: "Que quiere Activar a este Administrador!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Activarlo!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.id = usuario.id;
          if (this.id != undefined) {
            const usuarios:any = {
              nombreUsuario: usuario.nombreUsuario,
              password: usuario.password,
              fechaRegistro: usuario.fechaRegistro,
              estado: accion,
              personaId: usuario.persona.id,
              persona:{
                nombre: usuario.persona.nombre,
                apellido: usuario.persona.apellido,
                genero: usuario.persona.genero,
                fechaNacimiento: usuario.persona.fechaNacimiento,
                nacionalidad: usuario.persona.nacionalidad,
              },
              RolId: usuario.rol.id,
              
            }
            //console.log();
            this.usuarioservice
              .putUsuario(this.id, usuarios)
              .subscribe((r) => {
                Swal.fire(
                  'Activado!',
                  'El registro de Administrador fue Activado Exitosamente.',
                  'success'
                )
                this.ListaUsuario();
              });
          }
         
        }
      })
    
    }
   
  }

  async listadoUsuario() {
    await this.usuarioservice.getUsuarioadmin().subscribe((data) => {
      this.listaUsuario = data;
      this.pagesizee = this.listaUsuario.length;
    });
    
    await this.rolservice.getRolActivos().subscribe((data) => {
      this.listaRol = data;
   
    });
  }
  //REPORTE PDF
  reportePDF(){
    //Encabezado de Tabla
    const encabezado=['ID', 'Nombre', 'Apellido','Genero', 'Fecha de Nacimiento', 'Nacionalidad', 'Nombre de Usuario', 'Fecha de Registro', 'Estado'];
    this.usuarioservice.getUsuarioadmin().subscribe(
      (data) => {
      const cuerpo = Object(data).map((obj:any)=>
      [
        //Datos Tabla
        obj.id,
        obj.persona.nombre,
        obj.persona.apellido,
        obj.persona.genero,
        obj.persona.fechaNacimiento,
        obj.persona.nacionalidad,
        obj.nombreUsuario,
        obj.fechaRegistro,
        (obj.estado==1)? "ACTIVO" : "INACTIVO"
      ]);
      this.reporteService.reportePDF(encabezado,cuerpo,"REPORTE USUARIOS ADMINISTRADORES");
     
    });
    
  }
  //REPORTE EXCEL
 reporteExcel(){
  var nombreArchivo="reporteUsuariosAdmin.xlsx"
  var id = document.getElementById('datos');
  this.reporteService.reporteExcel(id,nombreArchivo,12);
 }
}
