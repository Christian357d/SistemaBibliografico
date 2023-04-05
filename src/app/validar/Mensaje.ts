export class Mensaje {

    public mensajes = {
        
        //REVISTA
        'revista': [
            { type: 'required', message: 'El Nombre de la Revista es requerida.' },
            { type: 'maxlength', message: 'El Nombre de la Revista debe tener menos de 50 caracteres.' },
            ],              
        'anioPub': [
            { type: 'required', message: 'El Año de la Publicacion es requerido.' }
            ],
        'frecuencia': [
            { type: 'required', message: 'La Frecuencia es requerida.' }
            ],
        'numero': [
            { type: 'required', message: 'El Numero de Revista Cientifica es requerido.' },
            { type: 'pattern', message: 'El Numero debe ser mayor a 1.' }
            ],
        'pagInicio': [
            { type: 'required', message: 'La Pagina de Inicio de la Revista Cientifica es requerido.' },
            { type: 'pattern', message: 'La Pagina de Inicio debe ser mayor a 1.' }
            ],
        'pagFin': [
            { type: 'required', message: 'La Pagina de Final de la Revista Cientifica es requerido.' },
            { type: 'pattern', message: 'La Pagina de Final debe ser mayor a 1.' }
            ],
        'anio': [
            { type: 'required', message: 'El Año de Revista Cientifica es requerido.' }
            ],
        'articulo': [
            { type: 'required', message: 'El Articulo es requerido.' }
            ],
        'editor': [
            { type: 'required', message: 'El Editor es requerido.' }
            ],
        'tema': [
            { type: 'required', message: 'Los Temas son requeridos.' }
            ],
            //ARTICULO 
        'titulo': [
            { type: 'required', message: 'El Titulo es requerido.' },
            { type: 'maxlength', message: 'El Titulo debe tener menos de 50 caracteres.' },
            ],
        'palabrasclave': [
            { type: 'required', message: 'Las Palabras Claves son requeridas.' },
            { type: 'maxlength', message: 'Las Palabras Claves deben tener menos de 100 caracteres.' },
            ],
        'correoContacto': [
            { type: 'required', message: 'El Correo de Contacto es requerido' },
            { type: 'maxlength', message: 'El Correo de Contacto debe tener menos de 50 caracteres.' },
            { type: 'email', message: 'Ingresar un Correo valido' }
            ],
        'copia': [
            { type: 'required', message: 'La Copia es requerida.' },
            { type: 'maxlength', message: 'La Copia debe tener menos de 150 caracteres.' },
            ],
        'ubicacion': [
            { type: 'required', message: 'La Ubicacion de la Copia es requerida.' },
            { type: 'maxlength', message: 'La Ubicacion de la Copia debe tener menos de 150 caracteres.' },
            ],
        'autor': [
            { type: 'required', message: 'Los Autores de este articulo son requeridos.' }
            ],
       //ACTA                    
        'acta': [
        { type: 'required', message: 'El Nombre de la Acta es requerida.' },
        { type: 'maxlength', message: 'El Nombre de la Acta debe tener menos de 50 caracteres.' },
        ],
        'edicion': [
            { type: 'required', message: 'La Edicion es requerida.' }
            ],
        'ciudad': [
            { type: 'required', message: 'La Ciudad es requerida.' },
            { type: 'maxlength', message: 'La Ciudad debe tener menos de 50 caracteres.' }
            ],
        'fechaInicio': [
            { type: 'required', message: 'La Fecha de Inicio es requerida.' }
            ],
        'fechaFin': [
            { type: 'required', message: 'La Fecha de Finalizacion es requerida.' }
            ],
        'pais': [
            { type: 'required', message: 'El Pais es requerido.' },
            { type: 'maxlength', message: 'El Pais debe tener menos de 50 caracteres.' }
            ],
        'fechaPrimera': [
            { type: 'required', message: 'La Fecha de Primera Vez es requerida.' }
            ],
        
        'tipoCongreso': [
            { type: 'required', message: 'El Tipo de Congreso es requerido.' }
            ],
    
        //INFORME
        'numeroInf': [
            { type: 'required', message: 'El Numero de Informe es requerido.' }           
            ],
        'centroPub': [
            { type: 'required', message: 'El Centro de Publicacion es requerido.' }           
            ],
        'fechaPub': [
            { type: 'required', message: 'La Fecha de Publicacion es requerida.' }
            ],

        //COMUNICADO
        'titulocom': [
            { type: 'required', message: 'El Titulo es requerido.' },
            { type: 'maxlength', message: 'La Titulo debe tener menos de 50 caracteres.' }
        ],
        'descripcion': [
            { type: 'required', message: 'La Descripcion es requerida.' },
            { type: 'maxlength', message: 'La Descripcion debe tener menos de 1000 caracteres.' }
        ],
        'remitente': [
            { type: 'required', message: 'El nombre del area remitente es requerida.' },
            { type: 'maxlength', message: 'El nombre del remitente debe tener menos de 50 caracteres.' }
        ],
        'fechaCom': [
            { type: 'required', message: 'La Fecha del comunicado es requerida.' }
        ],

        //EDITOR
        'codigoeditor':[
            { type: 'required', message: 'El codigo de editor es requerido.' },
            { type: 'maxlength', message: 'El codigo de editor debe tener menos de 7 caracteres.' },
            { type: 'pattern', message: 'El codigo de editor debe terner el formato: ABC-123.' },
        ],
       
        //Rol
        'rolnom': [
            { type: 'required', message: 'El Nombre del rol es requerido.' },
            { type: 'maxlength', message: 'La Nombre debe tener menos de 25 caracteres.' },
            { type: 'pattern', message: 'El Nombre debe tener solo letras.' }
        ],
        //Tipo de congreso
        'nombreti': [
            { type: 'required', message: 'El Nombre del Tipo de Congreso es requerido.' },
            { type: 'maxlength', message: 'La Tipo de Congreso debe tener menos de 30 caracteres.' },
            { type: 'pattern', message: 'El Nombre debe tener solo letras.' }
        ],
        //User Student
        'nomususes': [
            { type: 'required', message: 'El Correo es requerido.' },
            { type: 'maxlength', message: 'El Correo debe tener menos de 100 caracteres.' },
            { type: 'pattern', message: 'El Correo debe ser tal que: (tj.primernombre.apellidopat.inicialapellidomat@upds.net.bo).' }
        ],
        'pasuses': [
            { type: 'required', message: 'La Contraseña es requerida.' },
            { type: 'maxlength', message: 'La Contraseña debe tener menos de 50 caracteres.' },
            { type: 'minlength', message: 'La Contraseña debe tener como minimo 8 caracteres.' },
            { type: 'pattern', message: 'La contraseña debe contener uno o más caracteres en mayúscula, minisculas, numerico y simbolos.' }
        ],
        //User Administrator
        'nomadmin': [
            { type: 'required', message: 'El Correo es requerido.' },
            { type: 'maxlength', message: 'El Correo debe tener menos de 100 caracteres.' },
            { type: 'pattern', message: 'El Correo debe ser tal que: example@example.com).' }
        ],
        'pasusad': [
            { type: 'required', message: 'La Contraseña es requerida.' },
            { type: 'maxlength', message: 'La Contraseña debe tener menos de 50 caracteres.' },
            { type: 'minlength', message: 'La Contraseña debe tener como minimo 8 caracteres.' },
            { type: 'pattern', message: 'La contraseña debe contener uno o más caracteres en mayúscula, minisculas, numerico y simbolos.' }
        ],

        //AUTOR
        'nombre': [
            { type: 'required', message: 'El Nombre es requerido.' },
            { type: 'maxlength', message: 'El Nombre debe tener menos de 50 caracteres.' },
            { type: 'pattern', message: 'El Nombre debe tener solo letras.' }
          ],
          'apellido': [
            { type: 'required', message: 'El Apellido es requerido.' },
            { type: 'maxlength', message: 'El Apellido debe tener menos de 50 caracteres.' },
            { type: 'pattern', message: 'El Apellido debe tener solo letras.' }
          ],
          'genero': [
              { type: 'required', message: 'El Genero es requerido.' }
            ],
          'fecha': [
          { type: 'required', message: 'La Fecha es requerida.' }
          ],
          'nacionalidad': [
          { type: 'required', message: 'La Nacionalidad es requerida HOLAAA.' },
          { type: 'maxlength', message: 'La Nacionalidad debe tener menos de 50 caracteres.' },
          { type: 'pattern', message: 'La nacionalidad debe tener solo letras.' }
          ],
          'tipoAutor': [
              { type: 'required', message: 'El Tipo Autor es requerido.' }
              ],
          'correo': [
            { type: 'required', message: 'El Correo es requerido' },
            { type: 'maxlength', message: 'El Correo debe tener menos de 50 caracteres.' },
            { type: 'pattern', message: 'Ingresar un Correo valido' }
          ],
          'centro': [
              { type: 'required', message: 'El Centro de Trabajo es requerido.' }
              ],
          'temaAutor': [
              { type: 'required', message: 'El Tema del Autor es requerido.' }
              ],
        //Centro de Trabajo
        'nombrecentrotrabajo': [
            { type: 'required', message: 'El Nombre es requerido.' },
            { type: 'maxlength', message: 'El Nombre debe tener menos de 50 caracteres.' },
            { type: 'pattern', message: 'El Nombre debe tener solo letras.' }
          ],    
        //Temas
        'nombretema': [
            { type: 'required', message: 'El Nombre es requerido.' },
            { type: 'maxlength', message: 'El Nombre debe tener menos de 50 caracteres.' },
            { type: 'pattern', message: 'El Nombre debe tener solo letras.' }
          ],    
        'descripciontema': [
            { type: 'required', message: 'La descripcion es requerida.' },
            { type: 'maxlength', message: 'La descripcion debe tener menos de 50 caracteres.' },
            { type: 'pattern', message: 'La descripcion debe tener solo letras.' }
          ],    
        
      }

 
}