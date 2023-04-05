import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tema } from '../class/Tema';

@Injectable({
  providedIn: 'root'
})
export class TemaService {

  private API='http://localhost:5109/api/Tema';
  constructor(private http:HttpClient) { }
  Tema: Tema =new Tema();  

  getTemaActivos():Observable<any>{
    return this.http.get(this.API+'/'+"activos");
  }
  getTema():Observable<any>{
    return this.http.get(this.API);
  }

  postTema(Tema:any):Observable<any>{
    return this.http.post(this.API,Tema);
  }
  putTema(id:number,tema:any):Observable<any>{
    return this.http.put(this.API+'/'+id,tema);
  }
  deleteTema(id:number):Observable<any>
  {
    return this.http.delete(this.API+'/'+id)
  }
}
