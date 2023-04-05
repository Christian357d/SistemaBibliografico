import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoCongreso } from '../class/TipoCongreso';

@Injectable({
  providedIn: 'root'
})
export class TipocongresoService {

  private API='http://localhost:5109/api/TipoCongreso';
  constructor(private http:HttpClient) { }
  tipocongreso: TipoCongreso=new TipoCongreso();

  getTipoCongreso():Observable<any>{
    return this.http.get(this.API);
  }
  postTipoCongreso(TipoCongreso:any):Observable<any>{
    return this.http.post(this.API, TipoCongreso);
  }
  putTipoCongreso(id:number,tipocongreso:any):Observable<any>{
    return this.http.put(this.API+'/'+id ,tipocongreso)
  }
  getTipoCongresoActivo():Observable<any>{
    return this.http.get(this.API+'/'+"activos");
  }
}
