import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private loginservice:LoginService, private router: Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.loginservice.leerLogin() == "true") {
      if (this.loginservice.leerUsuario()== "Administrador") {
        return this.router.navigateByUrl('/homeadmin');
      }
      else if(this.loginservice.leerUsuario()== "Estudiante")
      return this.router.navigateByUrl('/homecliente');
    }
    return true;
  }
  
}
