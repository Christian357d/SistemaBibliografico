import { TestBed } from '@angular/core/testing';

import { ComunicadoService } from './comunicado.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

fdescribe('ComunicadoService', () => {
  let service: ComunicadoService;
  let httpTestingController:HttpTestingController;

  //valores de prueba

  const valoresEsperados:any[]=[[
    {
      id: 5,
      titulo: "PRUEBA",
      descripcion: "Esto es una prueba",
      remitente: "asdf",
      fechaPublicacion: "2023-03-28T00:00:00",
      estado: 1,
      usuarioId: 0,
      usuario: {
        id: 2,
        nombreUsuario: "juan@gmail.com",
        password: "U2FsdGVkX1/wmmuU9Lcnn34xBndgNu5hzhUWfvTjKQI=",
        fechaRegistro: "2023-04-03T04:18:29.342",
        estado: 1,
        personaId: 2,
        persona: null,
        rolId: 1,
        rol: null
      }
    },
    {
      id: 6,
      titulo: "PRUEBA",
      descripcion: "Esto es una prueba",
      remitente: "Técnico",
      fechaPublicacion: "2023-03-28T00:00:00",
      estado: 1,
      usuarioId: 0,
      usuario: {
        id: 2,
        nombreUsuario: "juan@gmail.com",
        password: "U2FsdGVkX1/wmmuU9Lcnn34xBndgNu5hzhUWfvTjKQI=",
        fechaRegistro: "2023-04-03T04:18:29.342",
        estado: 1,
        personaId: 2,
        persona: null,
        rolId: 1,
        rol: null
      }
    },
    {
      id: 7,
      titulo: "xmxcv",
      descripcion: "qwerwer",
      remitente: "Soporte Técnico",
      fechaPublicacion: "2023-03-28T00:00:00",
      estado: 1,
      usuarioId: 0,
      usuario: {
        id: 2,
        nombreUsuario: "juan@gmail.com",
        password: "U2FsdGVkX1/wmmuU9Lcnn34xBndgNu5hzhUWfvTjKQI=",
        fechaRegistro: "2023-04-03T04:18:29.342",
        estado: 1,
        personaId: 2,
        persona: null,
        rolId: 1,
        rol: null
      }
    },
    {
      id: 8,
      titulo: "sdf",
      descripcion: "Esto es una prueba",
      remitente: "Soporte Técnico",
      fechaPublicacion: "2023-03-28T00:00:00",
      estado: 1,
      usuarioId: 0,
      usuario: {
        id: 2,
        nombreUsuario: "juan@gmail.com",
        password: "U2FsdGVkX1/wmmuU9Lcnn34xBndgNu5hzhUWfvTjKQI=",
        fechaRegistro: "2023-04-03T04:18:29.342",
        estado: 1,
        personaId: 2,
        persona: null,
        rolId: 1,
        rol: null
      }
    }
  ]]
  //Guardar Nuevo Comunicado
  const nuevoComunicado:any=[
    {
      id: 8,
      titulo: "prueba35",
      descripcion: "Esto es una prueba",
      remitente: "Soporte Técnico",
      fechaPublicacion: "2023-03-28T00:00:00",
      estado: 1,
      usuarioId: 0,
      usuario: {
        id: 2,
        nombreUsuario: "juanmanuel@gmail.com",
        password: "U2FsdGVkX1/wmmuU9Lcnn34xBndgNu5hzhUWfvTjKQI=",
        fechaRegistro: "2023-04-03T04:18:29.342",
        estado: 1,
        personaId: 2,
        persona: null,
        rolId: 1,
        rol: null
      }
    }
  ]
  //Editar Comunicado Existente
  const idComunicado:number=5;
  const comunicadoExistente:any=[
    {
      id: 5,
      titulo: "PRUEBA de juan",
      descripcion: "Esto es una prueba by juan",
      remitente: "SOPORTE TECNICO",
      fechaPublicacion: "2023-03-28T00:00:00",
      estado: 1,
      usuarioId: 0,
      usuario: {
        id: 2,
        nombreUsuario: "juan@gmail.com",
        password: "U2FsdGVkX1/wmmuU9Lcnn34xBndgNu5hzhUWfvTjKQI=",
        fechaRegistro: "2023-04-03T04:18:29.342",
        estado: 1,
        personaId: 2,
        persona: null,
        rolId: 1,
        rol: null
      }
    }
  ]
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [HttpClient]
    });
    service = TestBed.inject(ComunicadoService);
    httpTestingController=TestBed.inject(HttpTestingController);
  });
  afterEach(()=>{
    httpTestingController.verify();
  })
  //TEST 1 
  it('TEST1: CREAR SERVICIO COMUNICADO', () => {
    expect(service).toBeTruthy();
  });
  //TEST2: 
  it('TEST2: GETCOMUNICADO DEBERIA USAR GET PARA TRAER LA LISTA DE COMUNICADOS', () => {
    service.getComunicado().subscribe();
    const testRequest = httpTestingController.expectOne('http://localhost:5109/api/Comunicado');
    expect(testRequest.request.method).toEqual('GET');
  });
  //TEST 3 
  it('TEST3: METODO GETCOMUNICADO DEBERIA TRAER LISTA COMUNICADOS', (done) => {   
    let result: any[]=[];
    service.getComunicado().subscribe(obj => {
      result = obj;
      done();
    });
    const testRequest = httpTestingController.expectOne({method: "GET",
      url:'http://localhost:5109/api/Comunicado'});   

    testRequest.flush([valoresEsperados]);   
    expect(result[0]).toEqual(valoresEsperados);
   });
   //TEST4: 
   it('TEST4: METODO POSTCOMUNICADO DEBERIA GUARDAR NUEVO COMUNICADO', (done) => {
    service.postComunicado(nuevoComunicado).subscribe();
 
  let retestRequestq = httpTestingController.expectOne({ method: "POST", url: 'http://localhost:5109/api/Comunicado'});
  expect(retestRequestq.request.body).toEqual(nuevoComunicado);  
  done();
  });
  //TEST5: 
  it('TEST5: METODO PUTCOMUNICADO DEBERIA EDITAR UN COMUNICADO EXISTENTE', (done) => {
    service.putComunicado(idComunicado,comunicadoExistente).subscribe(); 
  let retestRequestq = httpTestingController.expectOne({ method: "PUT", url:  `${'http://localhost:5109/api/Comunicado'}/${idComunicado}`});
  expect(retestRequestq.request.body).toEqual(comunicadoExistente); 
  done();
  });
 //TEST 6 
 it('TEST6: METODO GETCOMUNICADORACTIVO DEBERIA TRAER LISTA COMUNICADOS ACTIVOS', (done) => {   
  let result: any[]=[];
  service.getComunicadoActivo().subscribe(obj => {
    result = obj;
    done();
  });
  const testRequest = httpTestingController.expectOne({method: "GET",
    url:'http://localhost:5109/api/Comunicado/activos'});   

  testRequest.flush([valoresEsperados]);   
  expect(result[0]).toEqual(valoresEsperados);
 });
});
