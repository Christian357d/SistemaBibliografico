import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { UsadminComponent } from './usadmin.component';
import { FormBuilder } from '@angular/forms';
import {CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA} from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { RolService } from 'src/app/services/rol.service';
import { ReporteService } from 'src/app/services/reporte.service';
import { FilteronePipe } from 'src/app/pipes/filterone.pipe';


fdescribe('UsadminComponent', () => {
  let component: UsadminComponent;
  let fixture: ComponentFixture<UsadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsadminComponent ,FilteronePipe ],
      imports: [HttpClientTestingModule], 
      providers: [UsuarioService,RolService,ReporteService,FormBuilder],
      schemas:[CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

   //TEST 1 
 it('TEST:1 CREAR COMPONENTE USADMIN', () => {    
  expect(component).toBeTruthy();
});
 //TEST 2 
 it('TEST:2 VERIFICAR CONEXION SERVICIO USUARIO', () => {
  const service: UsuarioService = TestBed.inject(UsuarioService);
      expect(service).toBeTruthy();
});
//TEST 3 
it('TEST:3 VERIFICAR CONEXION SERVICIO ROL', () => {
  const service: RolService = TestBed.inject(RolService);
      expect(service).toBeTruthy();
});
//TEST 4 
 it('TEST:4 METODO LISTAR USUARIO', () => {   
      expect(component.listadoUsuario).toBeTruthy();
});
//TEST 5
it('TEST:5 METODO SELECCIONAR USUARIO', () => {   
  expect(component.SeleccionarUsuario).toBeTruthy();
});
//TEST 6
it('TEST:6 METODO GUARDAR USUARIO', () => {   
  expect(component.Guardar).toBeTruthy();
});
 //TEST 7
 it('TEST:7 METODO CAMBIAR ESTADO USUARIO', () => {   
  expect(component.CambiarEstado).toBeTruthy();
});
});
