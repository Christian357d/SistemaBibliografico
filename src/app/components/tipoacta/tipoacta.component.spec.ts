import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoactaComponent } from './tipoacta.component';

describe('TipoactaComponent', () => {
  let component: TipoactaComponent;
  let fixture: ComponentFixture<TipoactaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoactaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoactaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
