import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterthree'
})
export class FilterthreePipe implements PipeTransform {
idAutor:number=0;
  transform(myObject: any[], campo:string, input: any, obj:any[]) {
    if (!input) return myObject;
   
    if(campo==="autor"){
       const result=[];
       for (const articulo of myObject) {
        for(const autor of obj){
          articulo.articuloAutors.map((data:any)=>
          this.idAutor=data.autorId)         
          if (this.idAutor==autor.id) {
            const name=autor.persona.nombre+' '+autor.persona.apellido
            if (name.toLocaleLowerCase().indexOf(input.toLocaleLowerCase())>-1) {
              result.push(articulo);
            }
          }
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
