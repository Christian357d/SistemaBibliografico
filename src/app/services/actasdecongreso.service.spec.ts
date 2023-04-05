import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule,HttpTestingController} from '@angular/common/http/testing';
import { ActasdecongresoService } from './actasdecongreso.service';

fdescribe('ActasdecongresoService', () => {
  let service: ActasdecongresoService;
  let httpTestingController: HttpTestingController; 
  //Valores de Prueba
  const valoresEsperados=[[
    {
    id: 1,
    nombre: "V Congreso Internacional de Medio Ambiente",
    edicion: 5,
    ciudad: "Mendoza",
    fechaInicio: "2023-04-15T00:00:00",
    fechaFinalizacion: "2023-04-20T00:00:00",
    frecuencia: "Mensual",
    pais: "Argentina",
    anioPrimeraVez: "2022-11-15T00:00:00",
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
    },
    tipoCongresoId: 0,
    tipoCongreso: {
      id: 2,
      tipo: "Internacional",
      estado: 1
    }
    },
    {
    id: 2,
    nombre: "IV Congreso Internacional de Tecnología",
    edicion: 4,
    ciudad: "Berlin",
    fechaInicio: "2023-05-05T00:00:00",
    fechaFinalizacion: "2023-05-10T00:00:00",
    frecuencia: "Anual",
    pais: "Alemania",
    anioPrimeraVez: "2019-05-10T00:00:00",
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
    },
    tipoCongresoId: 0,
    tipoCongreso: {
      id: 2,
      tipo: "Internacional",
      estado: 1
    }
    },
  ]]
   //Guardar Nueva Acta de Congreso
  const nuevaActadeCongreso=[{
    nombre: "X Congreso Internacional de Programacion",
    edicion: 10,
    ciudad: "Mendoza",
    fechaInicio: "2023-05-10T00:00:00",
    fechaFinalizacion: "2023-05-20T00:00:00",
    frecuencia: "Anual",
    pais: "Argentina",
    anioPrimeraVez: "2013-11-15T00:00:00",
    estado: 1,
    articuloId: 6,
    tipoCongresoId: 2,
  }]
//Editar Acta de Congreso Existente
const idActadeCongreso:number=1;
const ActadeCongresoExistente=[{
    id: 1,
    nombre: "V Congreso Internacional de Medio Ambiente",
    edicion: 5,
    ciudad: "Mendoza",
    fechaInicio: "2023-04-15T00:00:00",
    fechaFinalizacion: "2023-04-20T00:00:00",
    frecuencia: "Mensual",
    pais: "Argentina",
    anioPrimeraVez: "2022-11-15T00:00:00",
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
    },
    tipoCongresoId: 0,
    tipoCongreso: {
      id: 2,
      tipo: "Internacional",
      estado: 1
    }
},]
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [HttpClient]
    });
    service = TestBed.inject(ActasdecongresoService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });
  //TEST 1 ACTA DE CONGRESO:
  it('TEST1: CREAR SERVICIO ACTA DE CONGRESO', () => {
    expect(service).toBeTruthy();
  }); 
   //TEST 2 ACTA DE CONGRESO: 
   it('TEST2: GETACTACONGRESO DEBERIA USAR GET PARA TRAER LA LISTA DE ACTAS DE CONGRESO', () => {
    service.getActaCongreso().subscribe();
    const testRequest = httpTestingController.expectOne('http://localhost:5109/api/ActaCongreso');
    expect(testRequest.request.method).toEqual('GET');
  });
  //TEST 3 ACTA DE CONGRESO:
  it('TEST3: METODO GETACTACONGRESO DEBERIA TRAER LISTA ACTA DE CONGRESO', (done) => {   
    let result: any[]=[];
    service.getActaCongreso().subscribe(obj => {
      result = obj;
      done();
    });
    const testRequest = httpTestingController.expectOne({method: "GET",
      url:'http://localhost:5109/api/ActaCongreso'});   

    testRequest.flush([valoresEsperados]);   
    expect(result[0]).toEqual(valoresEsperados);
   });
   //TEST 4 ACTA DE CONGRESO: 
   it('TEST4: METODO POSTACTACONGRESO DEBERIA GUARDAR NUEVO ACTA DE CONGRESO', (done) => {
    service.postActaCongreso(nuevaActadeCongreso).subscribe();
 
  let retestRequestq = httpTestingController.expectOne({ method: "POST", url: 'http://localhost:5109/api/ActaCongreso'});
  expect(retestRequestq.request.body).toEqual(nuevaActadeCongreso);  
  done();
  });
   //TEST 5 ACTA DE CONGRESO: 
   it('TEST5: METODO PUTACTACONGRESO DEBERIA EDITAR UN ACTA DE CONGRESO EXISTENTE', (done) => {
    service.putActaCongreso(idActadeCongreso, ActadeCongresoExistente).subscribe(); 
  let retestRequestq = httpTestingController.expectOne({ method: "PUT", url:  `${'http://localhost:5109/api/ActaCongreso'}/${idActadeCongreso}`});
  expect(retestRequestq.request.body).toEqual(ActadeCongresoExistente); 
  done();
  });
  
   //TEST 6 ACTA DE CONGRESO: 
  it('TEST6: METODO GETACTACONGRESO DEBERIA TRAER LA LISTA DE ACTAS DE CONGRESO ACTIVAS', (done) => {   
    let result: any[]=[];
    service.getActaCongresoActivo().subscribe(obj => {
      result = obj;
      done();
    });
    const testRequest = httpTestingController.expectOne({method: "GET",
      url:'http://localhost:5109/api/ActaCongreso/activos'});   

    testRequest.flush([valoresEsperados]);   
    expect(result[0]).toEqual(valoresEsperados);
   });
});
