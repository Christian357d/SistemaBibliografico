import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Informe } from '../class/Informe';

@Injectable({
  providedIn: 'root'
})
export class InformeService {

  private API='http://localhost:5109/api/Informe';
  constructor(private http:HttpClient) { }
  Informe: Informe=new Informe();

  getInforme():Observable<any>{
    return this.http.get(this.API);
  }

  postInforme(Informe:any):Observable<any>{
    return this.http.post(this.API,Informe);
  }
  putInforme(id:number,informe:any):Observable<any>{
    return this.http.put(this.API+'/'+id,informe);
  }
  deleteInforme(id:number):Observable<any>
  {
    return this.http.delete(this.API+'/'+id)
  }
  getInformeActivos():Observable<any>{
    return this.http.get(this.API+'/'+"activos");
  }
}
