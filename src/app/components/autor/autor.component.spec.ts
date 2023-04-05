import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AutorComponent } from './autor.component';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { AutorService } from 'src/app/services/autor.service';
import { TemaService } from 'src/app/services/tema.service';
import { CentrotrabajoService } from 'src/app/services/centrotrabajo.service';
import { FormBuilder } from '@angular/forms';
import {CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA} from '@angular/core';
import { FilteronePipe } from 'src/app/pipes/filterone.pipe';
fdescribe('AutorComponent', () => {
  let component: AutorComponent;
  let fixture: ComponentFixture<AutorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutorComponent,FilteronePipe],
      imports: [HttpClientTestingModule], 
      providers: [AutorService,TemaService,CentrotrabajoService,FormBuilder],
      schemas:[CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
  });
//TEST 1 
  it('TEST:1 CREAR COMPONENTE AUTOR', () => {    
    expect(component).toBeTruthy();
  });
  //TEST 2 
  it('TEST:2 VERIFICAR CONEXION SERVICIO AUTOR', () => {
    const service: AutorService = TestBed.inject(AutorService);
        expect(service).toBeTruthy();
  });
  //TEST 3 
  it('TEST:3 VERIFICAR CONEXION SERVICIO TEMAS', () => {
    const service: TemaService = TestBed.inject(TemaService);
        expect(service).toBeTruthy();
  });
  //TEST 4 
  it('TEST:4 VERIFICAR CONEXION SERVICIO CENTROS DE TRABAJO', () => {
    const service: CentrotrabajoService = TestBed.inject(CentrotrabajoService);
        expect(service).toBeTruthy();
  });
   //TEST 5
   it('TEST:5 METODO LISTAR AUTOR', () => {   
        expect(component.listadoAutor).toBeTruthy();
  });
  //TEST 6
  it('TEST:6 METODO SELECCIONAR AUTOR', () => {   
    expect(component.SeleccionarAutor).toBeTruthy();
  });
  //TEST 7
  it('TEST:7 METODO GUARDAR AUTOR', () => {   
    expect(component.Guardar).toBeTruthy();
  });
   //TEST 8
   it('TEST:8 METODO CAMBIAR ESTADO AUTOR', () => {   
    expect(component.CambiarEstado).toBeTruthy();
  });
   
});
