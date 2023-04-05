import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Revista } from '../class/Revista';

@Injectable({
  providedIn: 'root'
})
export class RevistacientificaService {

  private API='http://localhost:5109/api/RevistaCientifica';

  constructor(private http:HttpClient) {}
  Revista: Revista =new Revista();  
  getRevistaCientifica():Observable<any>{
    return this.http.get(this.API);
  }
  postRevistaCientifica(Revista:any):Observable<any>{
    return this.http.post(this.API, Revista);
  }
  putRevistaCientifica(id:number,Revista:any):Observable<any>{
    return this.http.put(this.API+'/'+id ,Revista)
  }
  
  getRevistaCientificaActivo():Observable<any>{
    return this.http.get(this.API+'/'+"activos");
  }

  private APIAT='http://localhost:5109/api/RevistaDetalle';

  putRevistaDetalle(id:number,RevistaDetalle:any):Observable<any>{
    return this.http.put(this.APIAT+'/'+id ,RevistaDetalle)
  }
  postRevistaDetalle(RevistaDetalle:any):Observable<any>{
    return this.http.post(this.APIAT, RevistaDetalle);
  }
  deleteRevistaDetalle(id:number):Observable<any>{
    return this.http.delete(this.APIAT+'/'+id)
  }
  getRevistaDetalle():Observable<any>{
    return this.http.get(this.APIAT);
  }
}
