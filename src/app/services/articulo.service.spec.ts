import { TestBed } from '@angular/core/testing';

import { ArticuloService } from './articulo.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule,HttpTestingController} from '@angular/common/http/testing';

fdescribe('ArticuloService', () => {
  let service: ArticuloService;
  let httpTestingController: HttpTestingController;  
  //valores de prueba
  const valoresEsperados:any[]=[[
    {
      id: 1,
      titulo: "asdf",
      palabrasClave: "ASDFEIJF",
      correo: "prueba@gmail.com",
      copia: "No",
      ubicacionCopia: "",
      estado: 1,
      articuloAutors: [
        {
          id: 1,
          articuloId: 1,
          articulo: null,
          autorId: 2,
          autor: null
        }
      ]
    },
    {
      id: 2,
      titulo: "wer",
      palabrasClave: "ASDFEIJF",
      correo: "juan@gmail.com",
      copia: "No",
      ubicacionCopia: "",
      estado: 1,
      articuloAutors: [
        {
          id: 2,
          articuloId: 2,
          articulo: null,
          autorId: 2,
          autor: null
        }
      ]
    },
  ]]

  //Guardar Nuevo Articulo
  const nuevoArticulo:any=[
    {
      titulo: "Prueba",
      palabrasClave: "ASDFEIJF",
      correo: "prueba@gmail.com",
      copia: "No",
      ubicacionCopia: "estante 1",
      estado: 1,
      articuloAutors: [
        {
          id: 1,
          articuloId: 1,
          articulo: null,
          autorId: 2,
          autor: null
        }
      ]
    }
  ]

  //Editar Articulo Existente
  const idArticulo:number=1;
  const articuloExistente:any=[
    {
      id: 1,
      titulo: "prueba21",
      palabrasClave: "esto es una prueba",
      correo: "prueba@gmail.com",
      copia: "No",
      ubicacionCopia: "",
      estado: 1,
      articuloAutors: [
        {
          id: 1,
          articuloId: 1,
          articulo: null,
          autorId: 2,
          autor: null
        }
      ]
    }
  ]


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[HttpClient]
    });
    service = TestBed.inject(ArticuloService);
    httpTestingController=TestBed.inject(HttpTestingController);
  });
  afterEach(()=>{
    httpTestingController.verify();
  })
  //TEST 1 
  it('TEST1: CREAR SERVICIO ARTICULO', () => {
    expect(service).toBeTruthy();
  }); 
  //TEST2: 
  it('TEST2: GETARTICULO DEBERIA USAR GET PARA TRAER LA LISTA DE ARTICULO', () => {
    service.getArticulo().subscribe();
    const testRequest = httpTestingController.expectOne('http://localhost:5109/api/Articulo');
    expect(testRequest.request.method).toEqual('GET');
  });
  //TEST 3 
  it('TEST3: METODO GETARTICULO DEBERIA TRAER LISTA ARTICULO', (done) => {   
    let result: any[]=[];
    service.getArticulo().subscribe(obj => {
      result = obj;
      done();
    });
    const testRequest = httpTestingController.expectOne({method: "GET",
      url:'http://localhost:5109/api/Articulo'});   

    testRequest.flush([valoresEsperados]);   
    expect(result[0]).toEqual(valoresEsperados);
   });
   //TEST4: 
   it('TEST4: METODO POSTARTICULO DEBERIA GUARDAR NUEVO ARTICULO', (done) => {
    service.postArticulo(nuevoArticulo).subscribe();
 
  let retestRequestq = httpTestingController.expectOne({ method: "POST", url: 'http://localhost:5109/api/Articulo'});
  expect(retestRequestq.request.body).toEqual(nuevoArticulo);  
  done();
  });

  //TEST5: 
  it('TEST5: METODO PUTARTICULO DEBERIA EDITAR UN ARTICULO EXISTENTE', (done) => {
    service.putArticulo(idArticulo,articuloExistente).subscribe(); 
  let retestRequestq = httpTestingController.expectOne({ method: "PUT", url:  `${'http://localhost:5109/api/Articulo'}/${idArticulo}`});
  expect(retestRequestq.request.body).toEqual(articuloExistente); 
  done();
  });
  //TEST 6 
  it('TEST6: METODO GETARTICULOACTIVO DEBERIA TRAER LISTA ARTICULOS ACTIVOS', (done) => {   
    let result: any[]=[];
    service.getArticuloActivo().subscribe(obj => {
      result = obj;
      done();
    });
    const testRequest = httpTestingController.expectOne({method: "GET",
      url:'http://localhost:5109/api/Articulo/activos'});   

    testRequest.flush([valoresEsperados]);   
    expect(result[0]).toEqual(valoresEsperados);
   });
});
