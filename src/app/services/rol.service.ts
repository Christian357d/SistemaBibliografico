import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rol } from '../class/Rol';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  private API='http://localhost:5109/api/Rol';
  constructor(private http:HttpClient) { }
  Rol: Rol =new Rol();  

  getRolActivos():Observable<any>{
    return this.http.get(this.API+'/'+"activos");
  }
  getRol():Observable<any>{
    return this.http.get(this.API);
  }

  postRol(Rol:any):Observable<any>{
    return this.http.post(this.API,Rol);
  }
  putRol(id:number,rol:any):Observable<any>{
    return this.http.put(this.API+'/'+id,rol);
  }
  deleteRol(id:number):Observable<any>
  {
    return this.http.delete(this.API+'/'+id)
  }
}
