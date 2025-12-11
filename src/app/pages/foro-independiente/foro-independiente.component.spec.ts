import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForoIndependienteComponent } from './foro-independiente.component';

describe('ForoIndependienteComponent', () => {
  let component: ForoIndependienteComponent;
  let fixture: ComponentFixture<ForoIndependienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForoIndependienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForoIndependienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
