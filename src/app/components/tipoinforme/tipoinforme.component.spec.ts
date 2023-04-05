import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoinformeComponent } from './tipoinforme.component';

describe('TipoinformeComponent', () => {
  let component: TipoinformeComponent;
  let fixture: ComponentFixture<TipoinformeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoinformeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoinformeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
