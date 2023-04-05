import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipocongresoComponent } from './tipocongreso.component';

describe('TipocongresoComponent', () => {
  let component: TipocongresoComponent;
  let fixture: ComponentFixture<TipocongresoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipocongresoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipocongresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});