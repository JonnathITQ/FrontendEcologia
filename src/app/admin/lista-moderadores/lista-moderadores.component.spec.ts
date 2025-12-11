import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaModeradoresComponent } from './lista-moderadores.component';

describe('ListaModeradoresComponent', () => {
  let component: ListaModeradoresComponent;
  let fixture: ComponentFixture<ListaModeradoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaModeradoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaModeradoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
