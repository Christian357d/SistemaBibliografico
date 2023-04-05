import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ArticuloService } from './articulo.service';

@Injectable({
  providedIn: 'root'
})
export class ActasdecongresoService {

  private API='http://localhost:5109/api/ActaCongreso';
  constructor(private http:HttpClient) { }
  getActaCongreso():Observable<any>{
    return this.http.get(this.API);
  }
  postActaCongreso(Autor:any):Observable<any>{
    return this.http.post(this.API, Autor);
  }
  putActaCongreso(id:number,autor:any):Observable<any>{
    return this.http.put(this.API+'/'+id ,autor)
  }
  
  getActaCongresoActivo():Observable<any>{
    return this.http.get(this.API+'/'+"activos");
  }
}
