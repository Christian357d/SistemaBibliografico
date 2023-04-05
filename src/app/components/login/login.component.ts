import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  nombre: any;
  password: any;
  encpass:any;
  valuerror = 0;
  constructor(public loginservice: LoginService) {}
  ngOnInit(): void {}
  getLogs() {
    if(this.nombre == undefined || this.password==undefined){
        this.valuerror = 1;
    }else{this.valuerror = 0;}
    this.loginservice.startLogin(this.nombre, this.password);
  }
}