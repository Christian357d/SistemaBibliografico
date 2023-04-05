import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComunicadoComponent } from './comunicado.component';
import { ComunicadoService } from 'src/app/services/comunicado.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FilteronePipe } from 'src/app/pipes/filterone.pipe';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import {CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA} from '@angular/core';

fdescribe('ComunicadoComponent', () => {
  let component: ComunicadoComponent;
  let fixture: ComponentFixture<ComunicadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComunicadoComponent, FilteronePipe ],
      imports: [HttpClientTestingModule], 
      providers: [ComunicadoService,UsuarioService,FormBuilder],
      schemas:[CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComunicadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //TEST 1 
  it('TEST:1 CREAR COMPONENTE COMUNICADO', () => {    
    expect(component).toBeTruthy();
  });
  //TEST 2 
  it('TEST:2 VERIFICAR CONEXION SERVICIO COMUNICADO', () => {
    const service: ComunicadoService = TestBed.inject(ComunicadoService);
        expect(service).toBeTruthy();
  });
  //TEST 3 
  it('TEST:3 VERIFICAR CONEXION SERVICIO USUARIO', () => {
    const service: UsuarioService = TestBed.inject(UsuarioService);
        expect(service).toBeTruthy();
  });
   //TEST 4
   it('TEST:4 METODO LISTAR COMUNICADO', () => {   
        expect(component.listadoComunicado).toBeTruthy();
  });
  //TEST 5
  it('TEST:5 METODO SELECCIONAR COMUNICADO', () => {   
    expect(component.SeleccionarComunicado).toBeTruthy();
  });
  //TEST 6
  it('TEST:6 METODO GUARDAR COMUNICADO', () => {   
    expect(component.Guardar).toBeTruthy();
  });
   //TEST 7
   it('TEST:7 METODO CAMBIAR ESTADO COMUNICADO', () => {   
    expect(component.CambiarEstado).toBeTruthy();
  });
});
