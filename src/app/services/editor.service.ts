import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Editor } from '../class/Editor';

@Injectable({
  providedIn: 'root'
})
export class EditorService {
  private API='http://localhost:5109/api/Editor';
  
  constructor(private http:HttpClient) { }
  Editor: Editor=new Editor();

  getEditor():Observable<any>{
    return this.http.get(this.API);
  }

  postEditor(Editor:any):Observable<any>{
    return this.http.post(this.API,Editor);
  }
  putEditor(id:number,editor:any):Observable<any>{
    return this.http.put(this.API+'/'+id,editor);
  }
  deleteEditor(id:number):Observable<any>
  {
    return this.http.delete(this.API+'/'+id)
  }
  getEditorActivo():Observable<any>{
    return this.http.get(this.API+'/'+"activos");
  }

}
