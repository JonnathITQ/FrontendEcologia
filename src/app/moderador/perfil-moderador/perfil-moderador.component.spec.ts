import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilModeradorComponent } from './perfil-moderador.component';

describe('PerfilModeradorComponent', () => {
  let component: PerfilModeradorComponent;
  let fixture: ComponentFixture<PerfilModeradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfilModeradorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfilModeradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
