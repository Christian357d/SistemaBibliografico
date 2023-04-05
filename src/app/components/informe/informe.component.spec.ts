import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { InformeComponent } from './informe.component';
import { FormBuilder } from '@angular/forms';
import {CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA} from '@angular/core';
import { InformeService } from 'src/app/services/informe.service';
import { ReporteService } from 'src/app/services/reporte.service';
import { FilteronePipe } from 'src/app/pipes/filterone.pipe';
import { ArticuloService } from 'src/app/services/articulo.service';

fdescribe('InformeComponent', () => {
  let component: InformeComponent;
  let fixture: ComponentFixture<InformeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformeComponent, FilteronePipe ],
      imports: [HttpClientTestingModule], 
      providers: [InformeService,ReporteService,FormBuilder,ArticuloService],
      schemas:[CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

 //TEST 1 
 it('TEST:1 CREAR COMPONENTE INFORME TECNICO', () => {    
  expect(component).toBeTruthy();
});
//TEST 2 
it('TEST:2 VERIFICAR CONEXION SERVICIO INFORME TECNICO', () => {
  const service: InformeService = TestBed.inject(InformeService);
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
 it('TEST:5 METODO LISTAR INFORME TECNICO', () => {   
      expect(component.ListaInforme).toBeTruthy();
});
//TEST 6
it('TEST:6 METODO SELECCIONAR INFORME TECNICO', () => {   
  expect(component.SeleccionarInforme).toBeTruthy();
});
//TEST 7
it('TEST:7 METODO GUARDAR INFORME TECNICO', () => {   
  expect(component.Guardar).toBeTruthy();
});
 //TEST 8
 it('TEST:8 METODO CAMBIAR ESTADO INFORME TECNICO', () => {   
  expect(component.CambiarEstado).toBeTruthy();
});
});
