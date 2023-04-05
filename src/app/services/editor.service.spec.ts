import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule,HttpTestingController} from '@angular/common/http/testing';
import { EditorService } from './editor.service';

fdescribe('EditorService', () => {
  let service: EditorService;
  let httpTestingController: HttpTestingController; 
  //Valores de Prueba
  const valoresEsperados=[[
    {
      id: 1,
      estado: 1,
      cod_Editor: "QWE-334",
      personaId: 0,
      persona: {
        id: 5,
        nombre: "TYLER",
        apellido: "ANDERSON",
        genero: "Masculino",
        fechaNacimiento: "2023-03-27T00:00:00",
        nacionalidad: "CANADIENSE",
        autors: null,
      },
    },
    {
      id: 2,
      estado: 1,
      cod_Editor: "ASD-092",
      personaId: 0,
      persona: {
        id: 6,
        nombre: "MARIA",
        apellido: "SMITH",
        genero: "Femenino",
        fechaNacimiento: "2023-03-28T00:00:00",
        nacionalidad: "COLOMBIANA",
        autors: null,
      },
    },
  ]]
   //Guardar Nuevo Editor
  const nuevoEditor=[{
    estado: 1,
    cod_editor: "DFG-789",
    personaId: 0,
    persona: {
      nombre: "KARLA",
      apellido: "CASTELLANOS",
      genero: "Femenino",
      fechaNacimiento: "2023-03-29",
      nacionalidad: "COLOMBIANA",
    },
  }]
//Editar Editor Existente
const idEditor:number=1;
const editorExistente=[{
  id: 1,
  estado: 0,
  cod_Editor: "QWE-334",
  personaId: 0,
  persona: {
    id: 5,
    nombre: "TYLER",
    apellido: "ANDERSON",
    genero: "Masculino",
    fechaNacimiento: "2023-03-27T00:00:00",
    nacionalidad: "CANADIENSE",
    autors: null,
  }
},]
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [HttpClient]
    });
    service = TestBed.inject(EditorService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });
  //TEST 1 
  it('TEST1: CREAR SERVICIO EDITOR', () => {
    expect(service).toBeTruthy();
  }); 
   //TEST2: 
   it('TEST2: GETEDITOR DEBERIA USAR GET PARA TRAER LA LISTA DE AUTORES', () => {
    service.getEditor().subscribe();
    const testRequest = httpTestingController.expectOne('http://localhost:5109/api/Editor');
    expect(testRequest.request.method).toEqual('GET');
  });
  //TEST 3 
  it('TEST3: METODO GETEDITOR DEBERIA TRAER LISTA EDITORES', (done) => {   
    let result: any[]=[];
    service.getEditor().subscribe(obj => {
      result = obj;
      done();
    });
    const testRequest = httpTestingController.expectOne({method: "GET",
      url:'http://localhost:5109/api/Editor'});   

    testRequest.flush([valoresEsperados]);   
    expect(result[0]).toEqual(valoresEsperados);
   });
   //TEST4: 
   it('TEST4: METODO POSTEDITOR DEBERIA GUARDAR NUEVO EDITOR', (done) => {
    service.postEditor(nuevoEditor).subscribe();
 
  let retestRequestq = httpTestingController.expectOne({ method: "POST", url: 'http://localhost:5109/api/Editor'});
  expect(retestRequestq.request.body).toEqual(nuevoEditor);  
  done();
  });
   //TEST5: 
   it('TEST5: METODO PUTEDITOR DEBERIA EDITAR UN EDITOR EXISTENTE', (done) => {
    service.putEditor(idEditor,editorExistente).subscribe(); 
  let retestRequestq = httpTestingController.expectOne({ method: "PUT", url:  `${'http://localhost:5109/api/Editor'}/${idEditor}`});
  expect(retestRequestq.request.body).toEqual(editorExistente); 
  done();
  });
  
     //TEST 6 
  it('TEST6: METODO GETEDITORACTIVO DEBERIA TRAER LISTA EDITORES ACTIVOS', (done) => {   
    let result: any[]=[];
    service.getEditorActivo().subscribe(obj => {
      result = obj;
      done();
    });
    const testRequest = httpTestingController.expectOne({method: "GET",
      url:'http://localhost:5109/api/Editor/activos'});   

    testRequest.flush([valoresEsperados]);   
    expect(result[0]).toEqual(valoresEsperados);
   });
});
