import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
import { ComunicadoService } from 'src/app/services/comunicado.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Mensaje } from 'src/app/validar/Mensaje';
import { ReporteService } from 'src/app/services/reporte.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  listaComunicado:any[]=[];
  accion="Agregar";
  id:number|undefined;
  reversedList: Array<any> = [];

  constructor(private loginservice: LoginService, private router:Router, private reporteService:ReporteService, public modalService:NgbModal,private comunicadoservice: ComunicadoService, private fb:FormBuilder
    ) { }
  nombreusuario:any;
  Comunicados:any[] = [];

  ListaComunicado(){
    this.comunicadoservice.getComunicado().subscribe(resp=>{
        this.listaComunicado=resp;
        // console.log(this.listaComunicado);
    })
  };

  collapse = false;
  toggleSidebar() {
    this.collapse = !this.collapse;
  }


  ngOnInit(): void {
    this.nombreusuario = window.localStorage.getItem('correo');
    this.listaComunicado = JSON.parse(localStorage.getItem('datoscomunicado') || "[]");
    this.reversedList = this.listaComunicado.slice().reverse();
  }
  update() {
    this.listaComunicado = JSON.parse(localStorage.getItem('datoscomunicado') || "[]");
    this.reversedList = this.listaComunicado.slice().reverse();
  }

  cerrarsesion(){
    this.loginservice.destruirSesion();
  }
  
}
