import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtertwo'
})
export class FiltertwoPipe implements PipeTransform {

  transform(myObject: any[], campo:string, input: any, oobj:any[]) {
    if (!input) return myObject;
    //filtrado multiple de tablas con un llamadao de otro object
    //Filtro Revista
    if(campo==="revarticulo"){
      const result=[];
      for (const revista of myObject) {
        if (revista.articulo.titulo.toLocaleLowerCase().indexOf(input.toLocaleLowerCase())>-1) {
          result.push(revista);
        }
      }
      return result;
    }
    if(campo==="reveditor"){
       const result=[];
       for (const revista of myObject) {
        for(const editor of oobj){
          if (revista.editor.id==editor.id) {
            const name=editor.persona.nombre+' '+editor.persona.apellido
            if (name.toLocaleLowerCase().indexOf(input.toLocaleLowerCase())>-1) {
              result.push(revista);
            }
          }
        }
       }
      return result;
    }
    if(campo==="frecuenciaRevista"){
      const result=[];
      for (const revista of myObject) {
        if (revista.frecuencia.toLocaleLowerCase().indexOf(input.toLocaleLowerCase())>-1) {
          result.push(revista);
        }
      }
      return result;
    }
    
    return myObject.filter(val => this.porFiltrado(val, campo, input));
    
  }

  private porFiltrado(
    myObject: any,
    campo:string,
    search: any
  ){
    const reduced = Object.keys(myObject)
    .reduce((prev, current)=> this.reducirllaves(prev, current, myObject, campo), "")
    .toLocaleLowerCase();
    
    return reduced.indexOf(search.toLocaleLowerCase()) > -1;
  }

  private reducirllaves(
    prev:any,
    current: any,
    myObject:any,
    campo:string
  ): any {
    if (this.esPilar(current,campo)) {
      prev=`${prev}\$${myObject[current]}`;
      // console.log('p');
    }
    return prev;
  }

  private esPilar(key:any, campo:string): boolean {
    // console.log(key.includes(campo));
    return key.includes(campo);
  }
}
