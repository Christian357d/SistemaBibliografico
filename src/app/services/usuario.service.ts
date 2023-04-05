import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../class/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private API='https://sistemaupds.bsite.net/api/Usuario';
  constructor(private http:HttpClient) { }
  usuario: Usuario=new Usuario();

  getUsuarioestudent():Observable<any>{
    return this.http.get(this.API+'/'+"usestudent");
  }
  getUsuarioadmin():Observable<any>{
    return this.http.get(this.API+'/'+"usadmin");
  }
  getUsuario():Observable<any>{
    return this.http.get(this.API+'/'+"usuariopersona");
  }
  postUsuario(Usuario:any):Observable<any>{
    return this.http.post(this.API, Usuario);
  }
  putUsuario(id:number,usuario:any):Observable<any>{
    return this.http.put(this.API+'/'+id ,usuario)
  }
  getUsuariopersona():Observable<any>{
    return this.http.get(this.API+'/'+"usuariopersona");
  }

  getUsuarioActivo():Observable<any>{
    return this.http.get(this.API+'/'+"activos");
  }

}
