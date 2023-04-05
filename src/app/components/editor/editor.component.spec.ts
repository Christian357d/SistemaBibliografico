import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { EditorComponent } from './editor.component';
import { FormBuilder } from '@angular/forms';
import {CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA} from '@angular/core';
import { EditorService } from 'src/app/services/editor.service';
import { ReporteService } from 'src/app/services/reporte.service';
import { FilteronePipe } from 'src/app/pipes/filterone.pipe';

fdescribe('EditorComponent', () => {
  let component: EditorComponent;
  let fixture: ComponentFixture<EditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditorComponent,FilteronePipe ],
      imports: [HttpClientTestingModule], 
      providers: [EditorService,ReporteService,FormBuilder],
      schemas:[CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

 //TEST 1 
 it('TEST:1 CREAR COMPONENTE EDITOR', () => {    
  expect(component).toBeTruthy();
});
//TEST 2 
it('TEST:2 VERIFICAR CONEXION SERVICIO EDITOR', () => {
  const service: EditorService = TestBed.inject(EditorService);
      expect(service).toBeTruthy();
});
//TEST 3 
it('TEST:3 VERIFICAR CONEXION SERVICIO REPORTE', () => {
  const service: ReporteService = TestBed.inject(ReporteService);
      expect(service).toBeTruthy();
});

 //TEST 4
 it('TEST:4 METODO LISTAR EDITOR', () => {   
      expect(component.ListaEditor).toBeTruthy();
});
//TEST 5
it('TEST:5 METODO SELECCIONAR EDITOR', () => {   
  expect(component.SeleccionarEditor).toBeTruthy();
});
//TEST 6
it('TEST:6 METODO GUARDAR EDITOR', () => {   
  expect(component.Guardar).toBeTruthy();
});
 //TEST 7
 it('TEST:7 METODO CAMBIAR ESTADO EDITOR', () => {   
  expect(component.CambiarEditor).toBeTruthy();
});
});
