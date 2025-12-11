import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndependienteGaleriaComponent } from './independiente-galeria.component';

describe('IndependienteGaleriaComponent', () => {
  let component: IndependienteGaleriaComponent;
  let fixture: ComponentFixture<IndependienteGaleriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndependienteGaleriaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndependienteGaleriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
