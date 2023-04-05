import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';
LoginService

@Injectable({
  providedIn: 'root'
})
export class ClienteGuard implements CanActivate {
  constructor(private loginservice:LoginService,private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.loginservice.leerUsuario() != "Administrador") {
      return this.router.navigateByUrl('/homecliente');
    }
    return true;
  }
  
}
