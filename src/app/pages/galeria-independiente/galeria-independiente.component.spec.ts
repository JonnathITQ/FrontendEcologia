import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GaleriaIndependienteComponent } from './galeria-independiente.component';

describe('GaleriaIndependienteComponent', () => {
  let component: GaleriaIndependienteComponent;
  let fixture: ComponentFixture<GaleriaIndependienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GaleriaIndependienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GaleriaIndependienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
