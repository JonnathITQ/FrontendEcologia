import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaGaleriaComponent } from './lista-galeria.component';

describe('ListaGaleriaComponent', () => {
  let component: ListaGaleriaComponent;
  let fixture: ComponentFixture<ListaGaleriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaGaleriaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaGaleriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
