import { TestBed } from '@angular/core/testing';
import { AutorService } from './autor.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule,HttpTestingController} from '@angular/common/http/testing';

fdescribe('AutorService', () => {
  let service: AutorService;
  let httpTestingController: HttpTestingController;  
  //Valores de Prueba

  const valoresEsperados:any[]=[[
    {
      id: 1,
      tipoAutor: "Cientifico",
      correo: "sandra@gmail.com",
      estado: 1,
      personaId: 0,
      persona: {
        id: 3,
        nombre: "SANDRA",
        apellido: "CONDE",
        genero: "Femenino",
        fechaNacimiento: "2023-03-01T00:00:00",
        nacionalidad: "CANADIENSE",
        autors: null,
      },
      centroTrabajoId: 0,
      centroTrabajo: {
        id: 1,
        nombre: "HOSPITAL",
        estado: 1,
      },
      autorTemas: [
        {
          id: 1002,
          autorId: 1,
          autor: null,
          temaId: 1,
          tema: null,
        },
        {
          id: 1003,
          autorId: 1,
          autor: null,
          temaId: 3,
          tema: null,
        },
      ],
      articuloAutors: null,
    },
    {
      id: 2,
      tipoAutor: "Investigador",
      correo: "tyler@gmail.com",
      estado: 1,
      personaId: 0,
      persona: {
        id: 4,
        nombre: "TYLER",
        apellido: "SMITH",
        genero: "Masculino",
        fechaNacimiento: "2023-02-28T00:00:00",
        nacionalidad: "CANADIENSE",
        autors: null,
      },
      centroTrabajoId: 0,
      centroTrabajo: {
        id: 1,
        nombre: "HOSPITAL",
        estado: 1,
      },
      autorTemas: [
        {
          id: 2,
          autorId: 2,
          autor: null,
          temaId: 2,
          tema: null,
        },
      ],
      articuloAutors: null,
    },
    {
      id: 3,
      tipoAutor: "Investigador",
      correo: "kar@gmail.com",
      estado: 1,
      personaId: 0,
      persona: {
        id: 5,
        nombre: "KARLA",
        apellido: "ANDERSON",
        genero: "Femenino",
        fechaNacimiento: "2023-03-01T00:00:00",
        nacionalidad: "CANADIENSE",
        autors: null,
      },
      centroTrabajoId: 0,
      centroTrabajo: {
        id: 1,
        nombre: "HOSPITAL",
        estado: 1,
      },
      autorTemas: [
        {
          id: 1004,
          autorId: 3,
          autor: null,
          temaId: 3,
          tema: null,
        },
        {
          id: 1005,
          autorId: 3,
          autor: null,
          temaId: 2,
          tema: null,
        },
      ],
      articuloAutors: null,
    },
  ]]
  //Guardar Nuevo Autor
  const nuevoAutor:any=[{
    tipoautor: "Cientifico",
    correo: "rodrigo@gmail.com",
    estado: 1,
    personaId: 0,
    persona: {
      nombre: "RODRIGO",
      apellido: "PEREZ",
      genero: "Masculino",
      fechaNacimiento: "2023-04-18",
      nacionalidad: "BOLIVIANA",
    },
    centroTrabajoId: "1",
    autorTemas: [
      {
        artorId: 0,
        temaId: 2,
      },
    ],
  }]

   //Editar Autor Existente
   const idAutor:number=1;
   const autorExistente:any=[ {
    id: 1,
    tipoAutor: "Cientifico",
    correo: "sandra@gmail.com",
    estado: 1,
    personaId: 0,
    persona: {
      id: 3,
      nombre: "SANDRA",
      apellido: "FERNANDEZ",
      genero: "Femenino",
      fechaNacimiento: "2023-03-01T00:00:00",
      nacionalidad: "CANADIENSE",
      autors: null,
    },
    centroTrabajoId: 0,
    centroTrabajo: {
      id: 1,
      nombre: "HOSPITAL",
      estado: 1,
    },
    autorTemas: [
      {
        id: 1002,
        autorId: 1,
        autor: null,
        temaId: 1,
        tema: null,
      },
      {
        id: 1003,
        autorId: 1,
        autor: null,
        temaId: 3,
        tema: null,
      },
    ],
    articuloAutors: null,
  }]
  

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [HttpClient]
    });
    service = TestBed.inject(AutorService);
    httpTestingController = TestBed.inject(HttpTestingController);
    
  });
  afterEach(() => {
    httpTestingController.verify();
  });
  //TEST 1 
  it('TEST1: CREAR SERVICIO AUTOR', () => {
    expect(service).toBeTruthy();
  }); 
   //TEST2: 
   it('TEST2: GETAUTOR DEBERIA USAR GET PARA TRAER LA LISTA DE AUTORES', () => {
    service.getAutor().subscribe();
    const testRequest = httpTestingController.expectOne('http://localhost:5109/api/Autor');
    expect(testRequest.request.method).toEqual('GET');
  });
  //TEST 3 
  it('TEST3: METODO GETAUTOR DEBERIA TRAER LISTA AUTORES', (done) => {   
    let result: any[]=[];
    service.getAutor().subscribe(obj => {
      result = obj;
      done();
    });
    const testRequest = httpTestingController.expectOne({method: "GET",
      url:'http://localhost:5109/api/Autor'});   

    testRequest.flush([valoresEsperados]);   
    expect(result[0]).toEqual(valoresEsperados);
   });
   //TEST4: 
   it('TEST4: METODO POSTAUTOR DEBERIA GUARDAR NUEVO AUTOR', (done) => {
    service.postAutor(nuevoAutor).subscribe();
 
  let retestRequestq = httpTestingController.expectOne({ method: "POST", url: 'http://localhost:5109/api/Autor'});
  expect(retestRequestq.request.body).toEqual(nuevoAutor);  
  done();
  });
   //TEST5: 
   it('TEST5: METODO PUTAUTOR DEBERIA EDITAR UN AUTOR EXISTENTE', (done) => {
    service.putAutor(idAutor,autorExistente).subscribe(); 
  let retestRequestq = httpTestingController.expectOne({ method: "PUT", url:  `${'http://localhost:5109/api/Autor'}/${idAutor}`});
  expect(retestRequestq.request.body).toEqual(autorExistente); 
  done();
  });
  
     //TEST 6 
  it('TEST6: METODO GETAUTORACTIVO DEBERIA TRAER LISTA AUTORES ACTIVOS', (done) => {   
    let result: any[]=[];
    service.getAutorActivo().subscribe(obj => {
      result = obj;
      done();
    });
    const testRequest = httpTestingController.expectOne({method: "GET",
      url:'http://localhost:5109/api/Autor/activos'});   

    testRequest.flush([valoresEsperados]);   
    expect(result[0]).toEqual(valoresEsperados);
   });

  
});
