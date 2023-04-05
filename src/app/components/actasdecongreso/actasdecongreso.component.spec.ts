import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { ActasdecongresoComponent } from './actasdecongreso.component';
import { FormBuilder } from '@angular/forms';
import {CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA} from '@angular/core';
import { ActasdecongresoService } from 'src/app/services/actasdecongreso.service';
import { ReporteService } from 'src/app/services/reporte.service';
import { FilteronePipe } from 'src/app/pipes/filterone.pipe';
import { ArticuloService } from 'src/app/services/articulo.service';
import { PaisService } from 'src/app/services/pais.service';


fdescribe('ActasdecongresoComponent', () => {
  let component: ActasdecongresoComponent;
  let fixture: ComponentFixture<ActasdecongresoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActasdecongresoComponent, FilteronePipe ],
      imports: [HttpClientTestingModule], 
      providers: [ActasdecongresoService,ReporteService,FormBuilder,ArticuloService, PaisService],
      schemas:[CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActasdecongresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

 //TEST 1 
 it('TEST:1 CREAR COMPONENTE ACTA DE CONGRESO', () => {    
  expect(component).toBeTruthy();
});
//TEST 2 
it('TEST:2 VERIFICAR CONEXION SERVICIO ACTA DE CONGRESO', () => {
  const service: ActasdecongresoService = TestBed.inject(ActasdecongresoService);
      expect(service).toBeTruthy();
});
//TEST 3 
it('TEST:3 VERIFICAR CONEXION SERVICIO REPORTE', () => {
  const service: ReporteService = TestBed.inject(ReporteService);
      expect(service).toBeTruthy();
});
//TEST 4
it('TEST:4 VERIFICAR CONEXION SERVICIO ARTICULOS', () => {
  const service: ArticuloService = TestBed.inject(ArticuloService);
      expect(service).toBeTruthy();
});
 //TEST 5
 it('TEST:5 METODO LISTAR ACTA DE CONGRESO', () => {   
      expect(component.ListaActasCongreso).toBeTruthy();
});
//TEST 6
it('TEST:6 METODO SELECCIONAR ACTA DE CONGRESO', () => {   
  expect(component.SeleccionarActadeCongreso).toBeTruthy();
});
//TEST 7
it('TEST:7 METODO GUARDAR ACTA DE CONGRESO', () => {   
  expect(component.Guardar).toBeTruthy();
});
 //TEST 8
 it('TEST:8 METODO CAMBIAR ESTADO ACTA DE CONGRESO', () => {   
  expect(component.CambiarEstado).toBeTruthy();
});
//TEST 9
it('TEST:9 VERIFICAR CONEXION SERVICIO PAIS', () => {
  const service: PaisService = TestBed.inject(PaisService);
      expect(service).toBeTruthy();
});
 //TEST 10
 it('TEST:10 METODO HABILITAR PAIS', () => {   
  expect(component.habilitarPais).toBeTruthy();
});
 //TEST 11
 it('TEST:11 METODO HABILITAR CIUDAD', () => {   
  expect(component.habilitarCiudad).toBeTruthy();
});
 //TEST 12
 it('TEST:12 METODO LISTAR PAIS', () => {   
  expect(component.listadoPais).toBeTruthy();
});
//TEST 13
it('TEST:13 METODO LISTAR CIUDADES', () => {   
  expect(component.listadoCiudades).toBeTruthy();
});
//TEST 14
it('TEST:14 METODO BUSCAR CIUDADES', () => {   
  expect(component.buscarCiudades).toBeTruthy();
});
});
