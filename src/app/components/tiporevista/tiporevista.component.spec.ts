import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiporevistaComponent } from './tiporevista.component';

describe('TiporevistaComponent', () => {
  let component: TiporevistaComponent;
  let fixture: ComponentFixture<TiporevistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TiporevistaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TiporevistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
