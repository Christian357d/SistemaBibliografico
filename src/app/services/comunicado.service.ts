import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComunicadoService {

  private API='http://localhost:5109/api/Comunicado';
  constructor(private http:HttpClient) { }

  getComunicado():Observable<any>{
    return this.http.get(this.API);
  }
  postComunicado(Comunicado:any):Observable<any>{
    return this.http.post(this.API, Comunicado);
  }
  putComunicado(id:number,comunicado:any):Observable<any>{
    return this.http.put(this.API+'/'+id ,comunicado)
  }
  getComunicadoActivo():Observable<any>{
    return this.http.get(this.API+'/'+"activos");
  }
}