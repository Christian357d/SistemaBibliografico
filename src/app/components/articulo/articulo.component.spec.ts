import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticuloComponent } from './articulo.component';
import { ArticuloService } from 'src/app/services/articulo.service';
import { AutorService } from 'src/app/services/autor.service';
import { FilteronePipe } from 'src/app/pipes/filterone.pipe';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import {CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA} from '@angular/core';

describe('ArticuloComponent', () => {
  let component: ArticuloComponent;
  let fixture: ComponentFixture<ArticuloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticuloComponent,FilteronePipe ],
      imports: [HttpClientTestingModule], 
      providers: [AutorService,ArticuloService,FormBuilder],
      schemas:[CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //TEST 1 
  it('TEST:1 CREAR COMPONENTE ARTICULO', () => {    
    expect(component).toBeTruthy();
  });
  //TEST 2 
  it('TEST:2 VERIFICAR CONEXION SERVICIO ARTICULO', () => {
    const service: ArticuloService = TestBed.inject(ArticuloService);
        expect(service).toBeTruthy();
  });
  //TEST 3 
  it('TEST:3 VERIFICAR CONEXION SERVICIO AUTOR', () => {
    const service: AutorService = TestBed.inject(AutorService);
        expect(service).toBeTruthy();
  });
   //TEST 4
   it('TEST:4 METODO LISTAR ARTICULO', () => {   
        expect(component.listadoArticulo).toBeTruthy();
  });
  //TEST 5
  it('TEST:5 METODO SELECCIONAR ARTICULO', () => {   
    expect(component.SeleccionarArticulo).toBeTruthy();
  });
  //TEST 5
  it('TEST:5 METODO GUARDAR ARTICULO', () => {   
    expect(component.Guardar).toBeTruthy();
  });
   //TEST 6
   it('TEST:6 METODO CAMBIAR ESTADO ARTICULO', () => {   
    expect(component.CambiarEstado).toBeTruthy();
  });
   
});
