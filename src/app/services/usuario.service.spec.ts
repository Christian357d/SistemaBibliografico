import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule,HttpTestingController} from '@angular/common/http/testing';
import { UsuarioService } from './usuario.service';

fdescribe('UsuarioService', () => {
  let service: UsuarioService;
  let httpTestingController: HttpTestingController;

  //Valores de Prueba Usuario Administrador
  const valoresAdm=[[
    {
      id: 2,
      nombreUsuario: "adm",
      password: "U2FsdGVkX18LNSqJPgNz0qksHtSsqyZMVn3mnyUxyUw=",
      fechaRegistro: "2023-04-01T23:49:29.564",
      estado: 1,
      personaId: 0,
      persona: {
        id: 2,
        nombre: "MARIA",
        apellido: "CASTILLOS",
        genero: "Femenino",
        fechaNacimiento: "2023-03-27T00:00:00",
        nacionalidad: "CANADIENSE",
        autors: null,
      },
      rolId: 0,
      rol: {
        id: 1,
        nombre: "Administrador",
        estado: 1,
      },
    },
    {
      id: 5,
      nombreUsuario: "jose",
      password: "U2FsdGVkX1+xcVg2s8JjEsLfQ2rvX2uQlRaMLCeefF0=",
      fechaRegistro: "2023-04-02T00:05:07.156",
      estado: 1,
      personaId: 0,
      persona: {
        id: 9,
        nombre: "JOSE",
        apellido: "PAEZ",
        genero: "Masculino",
        fechaNacimiento: "2023-03-27T00:00:00",
        nacionalidad: "CANADIENSE",
        autors: null,
      },
      rolId: 0,
      rol: {
        id: 1,
        nombre: "Administrador",
        estado: 1,
      },
    },
  ]]
  //Valores de Prueba Usuario Estudiante
  const valoresEst=[[
    {
      id: 3,
      nombreUsuario: "est",
      password: "U2FsdGVkX1/A2jF0wECLA7N8atX8Ax317uVDmDBzvFo=",
      fechaRegistro: "2023-04-01T23:50:14.493",
      estado: 1,
      personaId: 0,
      persona: {
        id: 3,
        nombre: "SANDRA",
        apellido: "CONDE",
        genero: "Femenino",
        fechaNacimiento: "2023-04-04T00:00:00",
        nacionalidad: "CANADIENSE",
        autors: null,
      },
      rolId: 0,
      rol: {
        id: 2,
        nombre: "Lector",
        estado: 1,
      },
    },
    {
      id: 4,
      nombreUsuario: "ped",
      password: "U2FsdGVkX1+WXZR+jBUx1P7SKsxqctVdfE0l6/g1Ugo=",
      fechaRegistro: "2023-04-02T00:04:23.676",
      estado: 1,
      personaId: 0,
      persona: {
        id: 8,
        nombre: "PEDRO",
        apellido: "ANDERSON",
        genero: "Masculino",
        fechaNacimiento: "2023-03-28T00:00:00",
        nacionalidad: "BOLIVIANO",
        autors: null,
      },
      rolId: 0,
      rol: {
        id: 2,
        nombre: "Lector",
        estado: 1,
      },
    },
  ]]
  
  //Guardar Nuevo Usuario Estudiante
  const nuevoEst=[{
    nombreUsuario: "tj.daniel.fernandez.s@upds.net.bo",
    password: "U2FsdGVkX1+WXZR+jBUx1P7SKsxqctVdfE0l6/g1Ugo=",
    fechaRegistro: "2023-04-02T18:03:01.900Z",
    estado: 1,
    personaId: 0,
    persona: {
      nombre: "DANIEL",
      apellido: "FERNANDEZ",
      genero: "Masculino",
      fechaNacimiento: "2023-03-28",
      nacionalidad: "COLOMBIANA",
    },
    RolId: 2,
  }]
//Editar Administrador Existente
const idAdm:number=2;
const admExistente=[{
  id: 2,
  nombreUsuario: "adm",
  password: "U2FsdGVkX18LNSqJPgNz0qksHtSsqyZMVn3mnyUxyUw=",
  fechaRegistro: "2023-04-01T23:49:29.564",
  estado: 1,
  personaId: 0,
  persona: {
    id: 2,
    nombre: "MARIA",
    apellido: "CASTILLOS",
    genero: "Femenino",
    fechaNacimiento: "2023-03-27T00:00:00",
    nacionalidad: "COLOMBIANA",
    autors: null,
  },
  rolId: 0,
  rol: {
    id: 1,
    nombre: "Administrador",
    estado: 1,
  },
}]

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [HttpClient]
    });
    service = TestBed.inject(UsuarioService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });
  //TEST 1 
  it('TEST1: CREAR SERVICIO USUARIO', () => {
    expect(service).toBeTruthy();
  }); 
   //TEST2: 
   it('TEST2: GETUUSUARIO DEBERIA USAR GET PARA TRAER LA LISTA DE USUARIOS', () => {
    service.getUsuario().subscribe();
    const testRequest = httpTestingController.expectOne('http://localhost:5109/api/Usuario/usuariopersona');
    expect(testRequest.request.method).toEqual('GET');
  });
  //TEST 3 
  it('TEST3: METODO GETUSUARIOADM DEBERIA TRAER LISTA USUARIOS ADMINISTRADORES', (done) => {   
    let result: any[]=[];
    service.getUsuarioadmin().subscribe(obj => {
      result = obj;
      done();
    });
    const testRequest = httpTestingController.expectOne({method: "GET",
      url:'http://localhost:5109/api/Usuario/usadmin'});   

    testRequest.flush([valoresAdm]);   
    expect(result[0]).toEqual(valoresAdm);
   });
   //TEST 4 
  it('TEST4: METODO GETUSUARIOESTUDENT DEBERIA TRAER LISTA USUARIOS ESTUDIANTES', (done) => {   
    let result: any[]=[];
    service.getUsuarioestudent().subscribe(obj => {
      result = obj;
      done();
    });
    const testRequest = httpTestingController.expectOne({method: "GET",
      url:'http://localhost:5109/api/Usuario/usestudent'});   

    testRequest.flush([valoresEst]);   
    expect(result[0]).toEqual(valoresEst);
   });
   //TEST5: 
   it('TEST5: METODO POSTUSUARIO DEBERIA GUARDAR UN NUEVO USUARIO', (done) => {
    service.postUsuario(nuevoEst).subscribe();
 
  let retestRequestq = httpTestingController.expectOne({ method: "POST", url: 'http://localhost:5109/api/Usuario'});
  expect(retestRequestq.request.body).toEqual(nuevoEst);  
  done();
  });
   //TEST6: 
   it('TEST6: METODO PUTuSURIO DEBERIA EDITAR UN USUARIO EXISTENTE', (done) => {
    service.putUsuario(idAdm,admExistente).subscribe(); 
  let retestRequestq = httpTestingController.expectOne({ method: "PUT", url:  `${'http://localhost:5109/api/Usuario'}/${idAdm}`});
  expect(retestRequestq.request.body).toEqual(admExistente); 
  done();
  });
  
     //TEST 6 
  it('TEST6: METODO GETUSUARIOACTIVO DEBERIA TRAER LISTA USUARIOS ACTIVOS', (done) => {   
    let result: any[]=[];
    service.getUsuarioActivo().subscribe(obj => {
      result = obj;
      done();
    });
    const testRequest = httpTestingController.expectOne({method: "GET",
      url:'http://localhost:5109/api/Usuario/activos'});   

    testRequest.flush([valoresAdm]);   
    expect(result[0]).toEqual(valoresAdm);
   });
});
