import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Autor } from '../class/Autor';

@Injectable({
  providedIn: 'root'
})
export class AutorService {

  private API='http://localhost:5109/api/Autor';
  constructor(private http:HttpClient) { }
  autor: Autor=new Autor();

  getAutor():Observable<any>{
    return this.http.get(this.API);
  }
  postAutor(Autor:any):Observable<any>{
    return this.http.post(this.API, Autor);
  }
  putAutor(id:number,autor:any):Observable<any>{
    return this.http.put(this.API+'/'+id ,autor)
  }
  getAutorpersona():Observable<any>{
    return this.http.get(this.API+'/'+"autorpersona");
  }

  getAutorActivo():Observable<any>{
    return this.http.get(this.API+'/'+"activos");
  }

  private APIAT='http://localhost:5109/api/AutorTema';

  putAutorTema(id:number,autortema:any):Observable<any>{
    return this.http.put(this.APIAT+'/'+id ,autortema)
  }
  postAutorTema(AutorTema:any):Observable<any>{
    return this.http.post(this.APIAT, AutorTema);
  }
  deleteAutorTema(id:number):Observable<any>{
    return this.http.delete(this.APIAT+'/'+id)
  }
  getAutorTema():Observable<any>{
    return this.http.get(this.APIAT);
  }
}
