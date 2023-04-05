import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Articulo } from '../class/Articulo';

@Injectable({
  providedIn: 'root'
})
export class ArticuloService {

  private API='http://localhost:5109/api/Articulo';
  constructor(private http:HttpClient) { }
  articulo: Articulo=new Articulo();

  getArticulo():Observable<any>{
    return this.http.get(this.API);
  }
  postArticulo(Articulo:any):Observable<any>{
    return this.http.post(this.API, Articulo);
  }
  putArticulo(id:number,articulo:any):Observable<any>{
    return this.http.put(this.API+'/'+id ,articulo)
  }
  getArticuloActivo():Observable<any>{
    return this.http.get(this.API+'/'+"activos");
  }

  private APIAT='http://localhost:5109/api/ArticuloAutor';

  putArticuloAutor(id:number,ArticuloAutor:any):Observable<any>{
    return this.http.put(this.APIAT+'/'+id ,ArticuloAutor)
  }
  postArticuloAutor(ArticuloAutor:any):Observable<any>{
    return this.http.post(this.APIAT, ArticuloAutor);
  }
  deleteArticuloAutor(id:number):Observable<any>{
    return this.http.delete(this.APIAT+'/'+id)
  }
  getArticuloAutor():Observable<any>{
    return this.http.get(this.APIAT);
  }
}
