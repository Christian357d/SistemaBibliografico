import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevistacientificaComponent } from './revistacientifica.component';
import { ArticuloService } from 'src/app/services/articulo.service';
import { EditorService } from 'src/app/services/editor.service';
import { RevistacientificaService } from 'src/app/services/revistacientifica.service';
import { TemaService } from 'src/app/services/tema.service';
import { FilteronePipe } from 'src/app/pipes/filterone.pipe';
import { FiltertwoPipe } from 'src/app/pipes/filtertwo.pipe';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import {CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA} from '@angular/core';


fdescribe('RevistacientificaComponent', () => {
  let component: RevistacientificaComponent;
  let fixture: ComponentFixture<RevistacientificaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevistacientificaComponent, FilteronePipe, FiltertwoPipe ],
      imports: [HttpClientTestingModule], 
      providers: [RevistacientificaService,TemaService,ArticuloService, EditorService,FormBuilder],
      schemas:[CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RevistacientificaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //TEST 1 
  it('TEST:1 CREAR COMPONENTE REVISTA CIENTIFICA', () => {    
    expect(component).toBeTruthy();
  });
  //TEST 2 
  it('TEST:2 VERIFICAR CONEXION SERVICIO REVISTA CIENTIFICA', () => {
    const service: RevistacientificaService = TestBed.inject(RevistacientificaService);
        expect(service).toBeTruthy();
  });
  //TEST 3
  it('TEST:3 VERIFICAR CONEXION SERVICIO ARTICULO', () => {
    const service: ArticuloService = TestBed.inject(ArticuloService);
        expect(service).toBeTruthy();
  });
  //TEST 4
  it('TEST:4 VERIFICAR CONEXION SERVICIO EDITOR', () => {
    const service: EditorService = TestBed.inject(EditorService);
        expect(service).toBeTruthy();
  });
  //TEST 5
  it('TEST:5 VERIFICAR CONEXION SERVICIO TEMAS', () => {
    const service: TemaService = TestBed.inject(TemaService);
        expect(service).toBeTruthy();
  });
   //TEST 6
   it('TEST:6 METODO LISTAR REVISTA CIENTIFICA', () => {   
        expect(component.listadoRevistaCientifica).toBeTruthy();
  });
  //TEST 7
  it('TEST:7 METODO SELECCIONAR REVISTA CIENTIFICA', () => {   
    expect(component.SeleccionarRevistaCientifica).toBeTruthy();
  });
  //TEST 8
  it('TEST:8 METODO GUARDAR REVISTA CIENTIFICA', () => {   
    expect(component.Guardar).toBeTruthy();
  });
   //TEST 9
   it('TEST:9 METODO CAMBIAR ESTADO REVISTA CIENTIFICA', () => {   
    expect(component.CambiarEstado).toBeTruthy();
  });
});
