import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CentroTrabajo } from '../class/Centrotrabajo';

@Injectable({
  providedIn: 'root'
})
export class CentrotrabajoService {
  private API='http://localhost:5109/api/CentroTrabajo';
  constructor(private http:HttpClient) { }
  CentroTrabajo: CentroTrabajo=new CentroTrabajo();

  getCentroTrabajo():Observable<any>{
    return this.http.get(this.API);
  }
  postCentroTrabjo(CentroTrabajo:any):Observable<any>{
    return this.http.post(this.API, CentroTrabajo);
  }
  putCentroTrabajo(id:number,centrotrabajo:any):Observable<any>{
    return this.http.put(this.API+'/'+id ,centrotrabajo)
  }
  getCentroTrabajoActivos():Observable<any>{
    return this.http.get(this.API+'/'+"activos");
  }
}