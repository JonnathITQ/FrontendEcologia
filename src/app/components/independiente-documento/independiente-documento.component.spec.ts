import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndependienteDocumentoComponent } from './independiente-documento.component';

describe('IndependienteDocumentoComponent', () => {
  let component: IndependienteDocumentoComponent;
  let fixture: ComponentFixture<IndependienteDocumentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndependienteDocumentoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndependienteDocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
