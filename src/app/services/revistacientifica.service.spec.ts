import { TestBed } from '@angular/core/testing';

import { RevistacientificaService } from './revistacientifica.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

fdescribe('RevistacientificaService', () => {
  let service: RevistacientificaService;
  let httpTestingController:HttpTestingController;

  //valores de prueba
  const valoresEsperados:any[]=[[
    {
      id: 1,
      nombreRevista: "ASDF",
      anioPublicacion: "2023-03-28T00:00:00",
      frecuencia: "Diaria",
      nroRevista: 5,
      pagInicio: 10,
      pagFinal: 20,
      anio: "2023-03-28T00:00:00",
      estado: 1,
      articuloId: 0,
      articulo: {
        id: 1,
        titulo: "asdf",
        palabrasClave: "ASDFEIJF",
        correo: "prueba@gmail.com",
        copia: "No",
        ubicacionCopia: "",
        estado: 1,
        articuloAutors: null
      },
      editorId: 0,
      editor: {
        id: 1,
        estado: 1,
        cod_Editor: "ASD-568",
        personaId: 5,
        persona: null
      },
      revistaDetalle: [
        {
          id: 1,
          revistaCientificaId: 1,
          revistaCientifica: null,
          temaId: 2,
          tema: null
        }
      ]
    },
    {
      id: 2,
      nombreRevista: "aefef",
      anioPublicacion: "2023-03-28T00:00:00",
      frecuencia: "Mensual",
      nroRevista: 1,
      pagInicio: 20,
      pagFinal: 30,
      anio: "2023-03-29T00:00:00",
      estado: 1,
      articuloId: 0,
      articulo: {
        id: 1,
        titulo: "asdf",
        palabrasClave: "ASDFEIJF",
        correo: "prueba@gmail.com",
        copia: "No",
        ubicacionCopia: "",
        estado: 1,
        articuloAutors: null
      },
      editorId: 0,
      editor: {
        id: 2,
        estado: 1,
        cod_Editor: "QWE-789",
        personaId: 6,
        persona: null
      },
      revistaDetalle: [
        {
          id: 2,
          revistaCientificaId: 2,
          revistaCientifica: null,
          temaId: 2,
          tema: null
        }
      ]
    }
  ]]
  //Guardar Nueva revista cientifica
  const nuevaRevista:any=[
    {
      id: 1,
      nombreRevista: "ASDF",
      anioPublicacion: "2023-03-28T00:00:00",
      frecuencia: "Diaria",
      nroRevista: 5,
      pagInicio: 10,
      pagFinal: 20,
      anio: "2023-03-28T00:00:00",
      estado: 1,
      articuloId: 0,
      articulo: {
        id: 1,
        titulo: "asdf",
        palabrasClave: "ASDFEIJF",
        correo: "prueba@gmail.com",
        copia: "No",
        ubicacionCopia: "",
        estado: 1,
        articuloAutors: null
      },
      editorId: 0,
      editor: {
        id: 1,
        estado: 1,
        cod_Editor: "ASD-568",
        personaId: 5,
        persona: null
      },
      revistaDetalle: [
        {
          id: 1,
          revistaCientificaId: 1,
          revistaCientifica: null,
          temaId: 2,
          tema: null
        }
      ]
    }
  ]

  //Editar Revista Cientifica Existente
  const idRevista:number=1;
  const revistaExiste:any=[
    {
      id: 1,
      nombreRevista: "Cientificos relatan la verdad?",
      anioPublicacion: "2023-03-28T00:00:00",
      frecuencia: "Semanal",
      nroRevista: 5,
      pagInicio: 10,
      pagFinal: 20,
      anio: "2023-03-28T00:00:00",
      estado: 1,
      articuloId: 0,
      articulo: {
        id: 1,
        titulo: "asdf",
        palabrasClave: "ASDFEIJF",
        correo: "prueba@gmail.com",
        copia: "No",
        ubicacionCopia: "",
        estado: 1,
        articuloAutors: null
      },
      editorId: 0,
      editor: {
        id: 1,
        estado: 1,
        cod_Editor: "ASD-568",
        personaId: 5,
        persona: null
      },
      revistaDetalle: [
        {
          id: 1,
          revistaCientificaId: 1,
          revistaCientifica: null,
          temaId: 2,
          tema: null
        }
      ]
    }
  ]
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[HttpClient]
    });
    service = TestBed.inject(RevistacientificaService);
    httpTestingController=TestBed.inject(HttpTestingController);
  });
  afterEach(()=>{
    httpTestingController.verify();
  });
  //TEST 1 
  it('TEST1: CREAR SERVICIO REVISTA CIENTIFICA', () => {
    expect(service).toBeTruthy();
  });
  //TEST2: 
  it('TEST2: GETREVISTACIENTIFICA DEBERIA USAR GET PARA TRAER LA LISTA DE REVISTACIENTIFICA', () => {
    service.getRevistaCientifica().subscribe();
    const testRequest = httpTestingController.expectOne('http://localhost:5109/api/RevistaCientifica');
    expect(testRequest.request.method).toEqual('GET');
  });
  //TEST 3 
  it('TEST3: METODO GETREVISTACIENTIFICA DEBERIA TRAER LISTA REVISTACIENTIFICA', (done) => {   
    let result: any[]=[];
    service.getRevistaCientifica().subscribe(obj => {
      result = obj;
      done();
    });
    const testRequest = httpTestingController.expectOne({method: "GET",
      url:'http://localhost:5109/api/RevistaCientifica'});   

    testRequest.flush([valoresEsperados]);   
    expect(result[0]).toEqual(valoresEsperados);
   });
    //TEST4: 
    it('TEST4: METODO POSTREVISTACIENTIFICA DEBERIA GUARDAR NUEVO REVISTACIENTIFICA', (done) => {
      service.postRevistaCientifica(nuevaRevista).subscribe();
   
    let retestRequestq = httpTestingController.expectOne({ method: "POST", url: 'http://localhost:5109/api/RevistaCientifica'});
    expect(retestRequestq.request.body).toEqual(nuevaRevista);  
    done();
    });
    //TEST5: 
   it('TEST5: METODO PUTREVISTACIENTIFICA DEBERIA EDITAR UN REVISTACIENTIFICA EXISTENTE', (done) => {
    service.putRevistaCientifica(idRevista,revistaExiste).subscribe(); 
  let retestRequestq = httpTestingController.expectOne({ method: "PUT", url:  `${'http://localhost:5109/api/RevistaCientifica'}/${idRevista}`});
  expect(retestRequestq.request.body).toEqual(revistaExiste); 
  done();
  });
      //TEST 6 
  it('TEST6: METODO GETREVISTACIENTIFICAACTIVO DEBERIA TRAER LISTA REVISTACIENTIFICA ACTIVOS', (done) => {   
    let result: any[]=[];
    service.getRevistaCientificaActivo().subscribe(obj => {
      result = obj;
      done();
    });
    const testRequest = httpTestingController.expectOne({method: "GET",
      url:'http://localhost:5109/api/RevistaCientifica/activos'});   

    testRequest.flush([valoresEsperados]);   
    expect(result[0]).toEqual(valoresEsperados);
   });
});
