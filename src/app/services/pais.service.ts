import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaisService {
  private API='https://jacqueg.bsite.net/api/Pais';
  private API2='https://jacqueg.bsite.net/api/Ciudad';
  constructor(private http:HttpClient) { }

  getPais():Observable<any>{
    return this.http.get(this.API);
  }
  getCiudad():Observable<any>{
    return this.http.get(this.API2);
  }
  buscarCiudades(id_country: number) :Observable<any>{
    return this.http.get(this.API2 + '/Pais/' + id_country);
  }
  obtenerPais(id: number) :Observable<any>{
    return this.http.get<any>(this.API + '/' + id);
  }
  obtenerCiudad(id: number) :Observable<any>{
    return this.http.get(this.API2 + '/' + id);
  }
  
}
