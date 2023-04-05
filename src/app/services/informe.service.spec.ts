import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule,HttpTestingController} from '@angular/common/http/testing';
import { InformeService } from './informe.service';

fdescribe('InformeService', () => {
  let service: InformeService;
  let httpTestingController: HttpTestingController; 
  //Valores de Prueba
  const valoresEsperados=[[
    {
      id: 1,
      numero: 10,
      centrodepublicacion: "UMSA Tecnology",
      fechaPublicacion: "2020-05-20T00:00:00",
      estado: 1,
      articuloId: 0,
      articulo: {
        id: 4,
        titulo: "El futuro de la IA",
        palabrasClave: "Hacia inteligencias artificiales realmente inteligentes",
        correo: "IArtificial@gmail.com",
        copia: "Si",
        ubicacionCopia: "Laboratorio",
        estado: 1,
        articuloAutors: null
      }
    },
    {
      id: 2,
      numero: 12,
      centrodepublicacion: "UPDS Tarija",
      fechaPublicacion: "2023-03-20T00:00:00",
      estado: 1,
      articuloId: 0,
      articulo: {
        id: 5,
        titulo: "Programación Modular",
        palabrasClave: "La programación modular es aquella que usa el concepto de dividir un problema",
        correo: "programodular@gmail.com",
        copia: "Si",
        ubicacionCopia: "Despacho",
        estado: 1,
        articuloAutors: null
      }
    },
  ]]
   //Guardar Nuevo Informe Tecnico
  const nuveoInformeTecnico=[{
      numero: 15,
      centrodepublicacion: "Oxford",
      fechaPublicacion: "2023-04-20T00:00:00",
      estado: 1,
      articuloId: 6,
  }]
//Editar Informe Tecnico Existente
const idInformeTecnico:number=1;
const informeTecnicoExistente=[{
  id: 1,
  numero: 10,
  centrodepublicacion: "UMSA Tecnology",
  fechaPublicacion: "2020-05-20T00:00:00",
  estado: 1,
  articuloId: 0,
  articulo: {
    id: 4,
    titulo: "El futuro de la IA",
    palabrasClave: "Hacia inteligencias artificiales realmente inteligentes",
    correo: "IArtificial@gmail.com",
    copia: "Si",
    ubicacionCopia: "Laboratorio",
    estado: 1,
    articuloAutors: null  
  }
},]
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [HttpClient]
    });
    service = TestBed.inject(InformeService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });
  //TEST 1 INFORME TECNICO:
  it('TEST1: CREAR SERVICIO INFORME TECNICO', () => {
    expect(service).toBeTruthy();
  }); 
   //TEST 2 INFORME TECNICO: 
   it('TEST2: GETINFORME DEBERIA USAR GET PARA TRAER LA LISTA DE INFORMES TECNICOS', () => {
    service.getInforme().subscribe();
    const testRequest = httpTestingController.expectOne('http://localhost:5109/api/Informe');
    expect(testRequest.request.method).toEqual('GET');
  });
  //TEST 3 INFORME TECNICO:
  it('TEST3: METODO GETINFORME DEBERIA TRAER LISTA INFORMES TECNICOS', (done) => {   
    let result: any[]=[];
    service.getInforme().subscribe(obj => {
      result = obj;
      done();
    });
    const testRequest = httpTestingController.expectOne({method: "GET",
      url:'http://localhost:5109/api/Informe'});   

    testRequest.flush([valoresEsperados]);   
    expect(result[0]).toEqual(valoresEsperados);
   });
   //TEST 4 INFORME TECNICO: 
   it('TEST4: METODO POSTINFORME DEBERIA GUARDAR NUEVO INFORME TECNICO', (done) => {
    service.postInforme(nuveoInformeTecnico).subscribe();
 
  let retestRequestq = httpTestingController.expectOne({ method: "POST", url: 'http://localhost:5109/api/Informe'});
  expect(retestRequestq.request.body).toEqual(nuveoInformeTecnico);  
  done();
  });
   //TEST 5 INFORME TECNICO: 
   it('TEST5: METODO PUTINFORME DEBERIA EDITAR UN INFORME TECNICO EXISTENTE', (done) => {
    service.putInforme(idInformeTecnico, informeTecnicoExistente).subscribe(); 
  let retestRequestq = httpTestingController.expectOne({ method: "PUT", url:  `${'http://localhost:5109/api/Informe'}/${idInformeTecnico}`});
  expect(retestRequestq.request.body).toEqual(informeTecnicoExistente); 
  done();
  });
  
   //TEST 6 INFORME TECNICO: 
  it('TEST6: METODO GETINFORMEACTIVO DEBERIA TRAER LA LISTA DE INFORMES TECNICOS ACTIVOS', (done) => {   
    let result: any[]=[];
    service.getInformeActivos().subscribe(obj => {
      result = obj;
      done();
    });
    const testRequest = httpTestingController.expectOne({method: "GET",
      url:'http://localhost:5109/api/Informe/activos'});   

    testRequest.flush([valoresEsperados]);   
    expect(result[0]).toEqual(valoresEsperados);
   });
});
