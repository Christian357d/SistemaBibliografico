import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterone'
})
export class FilteronePipe implements PipeTransform {

  transform(myObject: any[], campo:string, input: any) {
    if (!input) return myObject;
    //tabla con multiples tablas sin un llamado de otro object 
    //tabla con multiples tablas
    //Filtro estudiante y administrador
    if(campo==="users"){
      const result=[];
      for (const usuario of myObject) {
        if (usuario.persona.genero.toLocaleLowerCase().indexOf(input.toLocaleLowerCase())>-1) {
          result.push(usuario);
          
        }
        
      }
      return result;
    }
    if(campo==="nombreus"){
      const result=[];
      for (const usuario of myObject) {
        const name=usuario.persona.nombre+' '+usuario.persona.apellido
        if (name.toLocaleLowerCase().indexOf(input.toLocaleLowerCase())>-1) {
          result.push(usuario);
          
        }
        
      }
      return result;
    }
    
    if(campo==="nacionalidadus"){
      const result=[];
      for (const usuario of myObject) {
        if (usuario.persona.nacionalidad.toLocaleLowerCase().indexOf(input.toLocaleLowerCase())>-1) {
          result.push(usuario);
          
        }
        
      }
      return result;
    }
    if(campo==="correous"){
      const result=[];
      for (const usuario of myObject) {
        if (usuario.nombreUsuario.toLocaleLowerCase().indexOf(input.toLocaleLowerCase())>-1) {
          result.push(usuario);
          
        }
        
      }
      return result;
    }
    //filtrado Editor
    if(campo==="nombreeditor"){
      const result=[];
      for (const usuario of myObject) {
        const name=usuario.persona.nombre+' '+usuario.persona.apellido
        if (name.toLocaleLowerCase().indexOf(input.toLocaleLowerCase())>-1) {
          result.push(usuario);
          
        }
        
      }
      return result;
    }
    if(campo==="codeditor"){
      const result=[];
      for (const usuario of myObject) {
        if (usuario.cod_Editor.toLocaleLowerCase().indexOf(input.toLocaleLowerCase())>-1) {
          result.push(usuario);
          
        }
        
      }
      return result;
    }
    if(campo==="nacioeditor"){
      const result=[];
      for (const usuario of myObject) {
        if (usuario.persona.nacionalidad.toLocaleLowerCase().indexOf(input.toLocaleLowerCase())>-1) {
          result.push(usuario);
          
        }
        
      }
      return result;
    }
    
    //Buscador de Autor
    if(campo==="nombreautor"){
      const result=[];
      for (const autor of myObject) {
        if (autor.persona.nombre.toLocaleLowerCase().indexOf(input.toLocaleLowerCase())>-1) {
          result.push(autor);
          
        }
        
      }
      
      return result;
    }
    if(campo==="apellidoautor"){
      const result=[];
      for (const autor of myObject) {
        if (autor.persona.apellido.toLocaleLowerCase().indexOf(input.toLocaleLowerCase())>-1) {
          result.push(autor);
          
        }
        
      }
      
      return result;
    }
    if(campo==="correoautor"){
      const result=[];
      for (const autor of myObject) {
        if (autor.correo.toLocaleLowerCase().indexOf(input.toLocaleLowerCase())>-1) {
          result.push(autor);
          
        }
        
      }
      
      return result;
    }
    //Filtrado Autores
    if(campo==="autortipo"){
      const result=[];
      for (const autor of myObject) {
        if (autor.tipoAutor.toLocaleLowerCase().indexOf(input.toLocaleLowerCase())>-1) {
          result.push(autor);
          
        }
        
      }
      return result;
    }
    if(campo==="autorcentro"){
      const result=[];
      for (const autor of myObject) {
        if (autor.centroTrabajo.nombre.toLocaleLowerCase().indexOf(input.toLocaleLowerCase())>-1) {
          result.push(autor);
          
        }
        
      }
      
      return result;
    }
    //Buscador de Rol
    if(campo==="nombrerol"){
      const result=[];
      for (const rol of myObject) {
        if (rol.nombre.toLocaleLowerCase().indexOf(input.toLocaleLowerCase())>-1) {
          result.push(rol);
          
        }
        
      }
      
      return result;
    }


    //Comunicado
    if(campo==="areacomuni"){
      const result=[];
      for (const comunicado of myObject) {
        if (comunicado.remitente.toLocaleLowerCase().indexOf(input.toLocaleLowerCase())>-1) {
          result.push(comunicado);
          
        }
        
      }
      
      return result;
    }
    if(campo==="titulocomuni"){
      const result=[];
      for (const comunicado of myObject) {
        if (comunicado.titulo.toLocaleLowerCase().indexOf(input.toLocaleLowerCase())>-1) {
          result.push(comunicado);
          
        }
        
      }
      
      return result;
    }
    if(campo==="descomuni"){
      const result=[];
      for (const comunicado of myObject) {
        if (comunicado.descripcion.toLocaleLowerCase().indexOf(input.toLocaleLowerCase())>-1) {
          result.push(comunicado);
          
        }
        
      }
      
      return result;
    }
    //Filtro de Articulo en la tabla informe tecnico
    if(campo==="infarticulo"){
      const result=[];
      for (const informe of myObject) {
        if (informe.articulo.titulo.toLocaleLowerCase().indexOf(input.toLocaleLowerCase())>-1) {
          result.push(informe);
          
        }
        
      }
      
      return result;
    }
    //Filtro de Articulo en la tabla Actas de congreso
    if(campo==="actaarticulo"){
      const result=[];
      for (const acta of myObject) {
        if (acta.articulo.titulo.toLocaleLowerCase().indexOf(input.toLocaleLowerCase())>-1) {
          result.push(acta);
          
        }
      }
      return result;
    }
    if(campo==="tipocongresoactas"){
      const result=[];
      for (const acta of myObject) {
        if (acta.tipoCongreso.tipo.toLocaleLowerCase().indexOf(input.toLocaleLowerCase())>-1) {
          result.push(acta);
        }
      }
      return result;
    }
    //tabla individual
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
