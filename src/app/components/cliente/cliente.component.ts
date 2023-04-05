import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  constructor(private loginservice: LoginService) { }
  
  nombreusuario:any;
  ngOnInit(): void {
    this.nombreusuario = window.localStorage.getItem('correo');
  }
  cerrarsesion(){
    this.loginservice.destruirSesion();
  }
}
